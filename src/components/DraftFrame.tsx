import * as React from 'react';

import Button from '@material-ui/core/Button';

import { Draft } from 'src/model/Draft';
import { CardDataSource } from 'src/sources/CardSource';

import { PlayerFrame } from 'src/components/players/PlayerFrame';
import { SetDetail } from 'src/model/SetDetail';
import { SetRank } from 'src/model/SetRank';

interface IDraftProps {
    code: string;
}

interface IDraftState {
    draft: Draft | null;
    isLoading: boolean;
    isComplete: boolean;
}

export class DraftFrame extends React.Component<IDraftProps, IDraftState> {
    private source: CardDataSource;

    constructor(props: any) {
        super(props);

        this.source = new CardDataSource();
    
        this.state = {
            draft: null,
            isLoading: true,
            isComplete: false
        };
    }

    public componentDidMount(): void {
        // start querying for set data
        if (this.props.code) {
            this.findSetData();
        }
    }

    public render() {
        const { draft, isLoading } = this.state;

        if (isLoading) {
            return (<div>Wait...</div>);
        }

        const playerFrames = draft!.players.map((player, idx) => {
            return <PlayerFrame key={idx} player={player} />;
        });

        return (
            <div>
                <Button variant="outlined" onClick={this.doDraft}>
                    Start
                </Button>

                <h3>Results</h3>
                { playerFrames }
            </div>);
  }

  private findSetData = () => {
    const promises : [Promise<SetDetail>, Promise<SetRank>] = [
        this.source.fetchSetDetail(this.props.code),
        this.source.fetchSetRankings(this.props.code)
    ];

    Promise.all(promises)
        .then(results => {
            // set up a new draft with this set info
            this.setState({
                draft: new Draft(results[0], results[1]),
                isLoading: false
            });
        });
  };

  private doDraft = () => {
    this.state.draft!.go();
    this.setState({
        isComplete: true 
    });
  }
}