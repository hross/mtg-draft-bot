import { CardDetail } from './CardDetail';

export class Player {
    public id: number;
    public name: string;
    public isHuman: boolean;
    public deck: CardDetail[];

    constructor(id: number, name: string) {
        this.isHuman = false;
        this.deck = [];
        this.id = id;
        this.name = name;
    }

    // pick a card from the pack and return the rest
    public pickCard(pack: CardDetail[]): CardDetail[] {
        if (pack.length === 0) {
            return pack;
        }

        pack.sort((c1, c2) => c2.rank - c1.rank);

        // TODO: implement some kind of logic for on/off color picks
        // right now we will just be random :)
        const pickIndex = 0; // generate(0, pack.lenght-1);

        this.deck.push(pack[pickIndex]);
        pack.splice(pickIndex, 1);
        return pack;
    }
}