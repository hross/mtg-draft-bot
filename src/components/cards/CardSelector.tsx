import * as React from 'react';

import { CardDetail } from '../../model/CardDetail';
import { CardList } from './CardList';

import { MenuItem, Select } from '@material-ui/core';

interface ICardSelectorProps {
    cardSets: CardDetail[][];
    getTextForOption: (option: number) => string;
    onPick: (card: CardDetail) => void;
}

interface ICardSelectorState {
    option: number;
}

export class CardSelector extends React.Component<ICardSelectorProps, ICardSelectorState> {
    constructor(props: ICardSelectorProps) {
        super(props);

        this.state = { option: 0 };
    }

    public render() {
        const { cardSets, onPick, getTextForOption } = this.props;
        const { option } = this.state;

        const menuItems = cardSets.map((cs, idx) => <MenuItem key={idx} value={idx}>{getTextForOption(idx)}</MenuItem>);

        return (
            <div>
                <Select
                    value={option}
                    onChange={this.onChange}
                >
                    {menuItems}
                </Select>
                <CardList cards={cardSets[option]} onPick={onPick} />
            </div>
        );
    }

    private onChange = (event: any) => {
        this.setState({
            option: event.target.value
        });
    }
}