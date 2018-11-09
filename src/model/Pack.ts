import { CardDetail } from "./CardDetail";

export class Pack {
    public cards: CardDetail[];

    constructor(cards: CardDetail[]) {
        this.cards = cards;
    }
}