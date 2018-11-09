import * as React from 'react';

import { Button, Paper } from '@material-ui/core';

import { Draft } from '../model/Draft';
import { SetDetail } from '../model/SetDetail';
import { CardDataSource } from '../sources/CardSource';

import { CardSelector } from './cards/CardSelector';
import { DraftDisplay } from './DraftDisplay';

interface IDraftProps {
    code: string;
    display: DraftDisplay;
}

interface IDraftState {
    draft: Draft | null;
    isLoading: boolean;
    isComplete: boolean;
    menuOpen: boolean;
}

export class DraftFrame extends React.Component<IDraftProps, IDraftState> {
    private source: CardDataSource;

    constructor(props: any) {
        super(props);

        this.source = new CardDataSource();

        this.state = {
            draft: null,
            isLoading: true,
            isComplete: false,
            menuOpen: false
        };
    }

    public componentDidMount(): void {
        // start querying for set data
        if (this.props.code) {
            this.findSetData();
        }
    }

    public render() {
        const { display } = this.props;
        const { isLoading } = this.state;

        if (isLoading) {
            return (<div>Wait...</div>);
        }

        let canvas = null;

        switch (display) {
            case DraftDisplay.Packs:
                canvas = (
                    <div className='draftCanvas'>
                        <h3>Packs</h3>
                        <CardSelector
                            onPick={this.onPick}
                            cardSets={this.state.draft!.draftState.packs.map((p) => p.cards)}
                            getTextForOption={this.getTextForPack}
                        />
                    </div>
                );
                break;
            default:
                canvas = (
                    <div className='draftCanvas'>
                        <h3>Results</h3>
                        <CardSelector
                            onPick={this.onPick}
                            cardSets={this.state.draft!.players.map((p) => p.deck)}
                            getTextForOption={this.getTextForPlayer}
                        />
                    </div>
                );
                break;
        }

        return (
            <div>
                <Paper>
                    <Button variant='outlined' onClick={this.doDraft}>
                        Start
                    </Button>

                    {canvas}
                </Paper>
            </div>);
    }

    private findSetData = () => {
        const promises: [Promise<any>, Promise<any>] = [
            this.source.fetchSetDetail(this.props.code),
            this.source.fetchSetRankings(this.props.code)
        ];

        Promise.all(promises)
            .then((results) => {
                const setDetail = new SetDetail(this.props.code, results[0], results[1]);
                // set up a new draft with this set info
                this.setState({
                    draft: new Draft(setDetail),
                    isLoading: false
                });
            });
    }

    private doDraft = (): void => {
        this.state.draft!.go();
        this.setState({
            isComplete: true
        });
    }

    private getTextForPack = (index: number): string => {
        return 'Pack #' + (index + 1);
    }

    private getTextForPlayer = (index: number): string => {
        return 'Player #' + (index + 1);
    }

    private onPick = (): void => {
        // do nothing
    }
}