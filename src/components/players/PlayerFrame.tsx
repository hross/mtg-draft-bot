import * as React from 'react';

import {CardDetail } from "../../model/CardDetail";
import { Player } from "../../model/Player";

import { CardList } from "../cards/CardList";

interface IPlayerFrameProps {
    player: Player;
}

export class PlayerFrame extends React.Component<IPlayerFrameProps> {
    constructor(props: IPlayerFrameProps) {
        super(props);
    }

    public render() {
        const { player } = this.props;
        return (
            <div>
                <h4 className="player">{player.name}</h4>
                <CardList cards={player.deck} onPick={this.onPick} />
            </div>
        );
    }

    private onPick(card: CardDetail): void { 
        // do nothing 
    }
}