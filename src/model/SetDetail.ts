import { CardDetail } from "./CardDetail";
import { Pack } from "./Pack";

export class SetDetail {
    public code: string;
    public packContents: string | string[][];
    public cards: CardDetail[];

    // mapping of cards by category
    private idByCategory: { [category: string]: number[]; } = { };

    constructor(code: string, setBlob: any) {
        this.packContents = [];
        for (const item of setBlob.booster) {
            this.packContents.push(item);
        }

        // init
        this.cards = [];
        this.idByCategory = { };
        this.idByCategory.land = [];

        for (let i = 0; i < setBlob.cards.length; i++) {
            // create the card
            const cardDetail = new CardDetail(setBlob.cards[i]);
            this.cards.push(cardDetail);

            // push the index of the card into the hash by category
            if (!this.idByCategory[cardDetail.rarity.toLowerCase()]) {
                this.idByCategory[cardDetail.rarity.toLowerCase()] = [];
            }
            this.idByCategory[cardDetail.rarity.toLowerCase()].push(i);

            // special case, this card is a land
            if (cardDetail.types.indexOf('Land') > -1) {
                this.idByCategory.land.push(i);
            }
        }
    }

    public createPack(): Pack {
        const cards: CardDetail[] = [];

        // super naive implementation: randomly pick cards until we
        // get one that matches the class of the slot in the booster we want
        // (this is not efficient and we should really bucket the card types before doing this)
        for (const nextCardType of this.packContents) {
            if (nextCardType === 'marketing') {
                // no op on marketing cards for draft
            } else if (!Array.isArray(nextCardType)) {
                // pick a random number in the category and get the card
                const idx = Math.floor((Math.random() * (this.idByCategory[nextCardType].length - 1) + 1));
                cards.push(this.cards[idx]);
            } else {
                // pick one random card of each card type
                const randomCards: CardDetail[] = [];

                if (nextCardType.indexOf('rare') > -1 && nextCardType.indexOf('mythic rare') > -1) {
                    // we know rare/mythic is 1/8 so let's make that happen
                    randomCards.push(this.cards[Math.floor((Math.random() * (this.idByCategory.rare.length - 1) + 1))]);
                    randomCards.push(this.cards[Math.floor((Math.random() * (this.idByCategory.rare.length - 1) + 1))]);
                    randomCards.push(this.cards[Math.floor((Math.random() * (this.idByCategory.rare.length - 1) + 1))]);
                    randomCards.push(this.cards[Math.floor((Math.random() * (this.idByCategory.rare.length - 1) + 1))]);
                    randomCards.push(this.cards[Math.floor((Math.random() * (this.idByCategory.rare.length - 1) + 1))]);
                    randomCards.push(this.cards[Math.floor((Math.random() * (this.idByCategory.rare.length - 1) + 1))]);
                    randomCards.push(this.cards[Math.floor((Math.random() * (this.idByCategory.rare.length - 1) + 1))]);
                    randomCards.push(this.cards[Math.floor((Math.random() * (this.idByCategory['mythic rare'].length - 1) + 1))]);
                } else {
                    for (const cardType of nextCardType) {
                        const idx = Math.floor((Math.random() * (this.idByCategory[cardType].length - 1) + 1));
                        randomCards.push(this.cards[idx]);
                    }
                }

                // pick one random card of the ones we found
                // TODO: prevent dupes
                const ridx = Math.floor((Math.random() * (randomCards.length - 1) + 1));
                cards.push(this.cards[ridx]);
            }
        }

        return new Pack(cards);
    }
}