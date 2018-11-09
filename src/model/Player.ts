import { CardDetail } from "./CardDetail";
import { SetRank } from "./SetRank";

export class Player {
    public id: number;
    public name: string;
    public isHuman: boolean;
    public deck: CardDetail[];

    private setRank: SetRank;

    constructor(id: number, name: string, setRank: SetRank) {
        this.isHuman = false;
        this.deck = [];
        this.id = id;
        this.name = name;

        this.setRank = setRank;
    }

    // pick a card from the pack and return the rest
    public pickCard(pack: CardDetail[]): CardDetail[] {
        if (pack.length === 0) {
            return pack;
        }

        pack.sort((c1, c2) => this.setRank.rankOf(c2.name) - this.setRank.rankOf(c1.name));

        // TODO: implement some kind of logic for on/off color picks
        // right now we will just be random :)
        const pickIndex = 0; // Math.floor(Math.random() * (pack.length - 1));

        this.deck.push(pack[pickIndex]);
        pack.splice(pickIndex, 1);
        return pack;
    }
}