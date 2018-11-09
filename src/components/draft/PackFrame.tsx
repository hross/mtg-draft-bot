import * as React from 'react';

import {CardDetail } from '../../model/CardDetail';
import { Pack } from '../../model/Pack';
import { CardList } from '../cards/CardList';

interface IPackFrameProps {
    index: number;
    pack: Pack;
}

export class PackFrame extends React.Component<IPackFrameProps> {
    constructor(props: IPackFrameProps) {
        super(props);
    }

    public render() {
        const { index, pack } = this.props;
        return (
            <div>
                <h4 className='pack'>Pack {index}</h4>
                <CardList cards={pack.cards} onPick={this.onPick} />
            </div>
        );
    }

    private onPick(card: CardDetail): void {
        // do nothing
    }
}