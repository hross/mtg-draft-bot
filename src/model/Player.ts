import { CardDetail } from './CardDetail';
import { ColorRank } from './ColorRank';
import { DraftState } from './DraftState';

export class Player {
    public id: number;
    public name: string;
    public isHuman: boolean;
    public deck: CardDetail[];

    private draftState: DraftState;
    private colorRank: ColorRank[];

    constructor(id: number, name: string, draftState: DraftState) {
        this.isHuman = false;
        this.deck = [];
        this.id = id;
        this.name = name;
        this.draftState = draftState;

        this.colorRank = [];
        this.colorRank.push(new ColorRank('W'));
        this.colorRank.push(new ColorRank('U'));
        this.colorRank.push(new ColorRank('B'));
        this.colorRank.push(new ColorRank('R'));
        this.colorRank.push(new ColorRank('G'));
    }

    // pick a card from the pack and return the rest
    public pickCard(pack: CardDetail[]): CardDetail[] {
        if (pack.length === 0) {
            return pack;
        }

        // calcualte color bias in the pack
        const totalCardsToPick = (this.draftState.cardsInPack * this.draftState.packs.length) / this.draftState.numPlayers;
        const primaryBias = (this.draftState.pickNumber * (this.draftState.packNumber + 1)) / totalCardsToPick;
        const secondaryBias = primaryBias / 2; // this is just a guess

        // sort by card quality
        pack.sort((c1, c2) => (
            this.bias(c2.rank, c2.colorIdentity, primaryBias, secondaryBias) -
            this.bias(c1.rank, c1.colorIdentity, primaryBias, secondaryBias)));

        // add to color ranking when we pick
        const card = pack[0];

        // update color identity counts for our deck
        for (const ident of card.colorIdentity) {
            const rank = this.colorRank.find((cr) => cr.symbol === ident);
            if (rank) {
                rank.count += 1;
            }
        }
        this.colorRank.sort((c1, c2) => (c2.count - c1.count));

        this.deck.push(card);
        pack.splice(0, 1);
        return pack;
    }

    public bias(rank: number, colorIdentity: string[], primaryBias: number, secondaryBias: number): number {
        if (colorIdentity.indexOf(this.colorRank[0].symbol)) {
            return rank + primaryBias;
        }

        if (colorIdentity.indexOf(this.colorRank[1].symbol)) {
            return rank + secondaryBias;
        }

        return rank;
    }
}