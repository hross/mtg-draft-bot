import * as React from 'react';

import { CardDetail } from "../../model/CardDetail";

interface ICardProps {
    card: CardDetail;
    onPick: (card: CardDetail) => void;
}

export class CardFrame extends React.Component<ICardProps> {
    constructor(props: ICardProps) {
        super(props);
    }

    public render() {
        const { card } = this.props;
        return (
            <div className="card">{card.name} - {card.rarity}</div>
        );
    }
}