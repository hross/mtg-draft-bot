import * as React from 'react';

import { CardDetail } from '../../model/CardDetail';
import { CardFrame } from './CardFrame';

interface ICardListProps {
    cards: CardDetail[];
    onPick: (card: CardDetail) => void;
}

export class CardList extends React.Component<ICardListProps> {
    constructor(props: ICardListProps) {
        super(props);
    }

    public render() {
        const { cards, onPick } = this.props;

        const cardList = cards.map(
                (c: CardDetail, idx: number) =>
                    <CardFrame key={idx} card={c} onPick={onPick} />);

        return (
            <div className='cards'>{cardList}</div>
        );
    }
}