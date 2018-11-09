import { generate } from './Random';

import { CardDetail } from './CardDetail';
import { CardRank } from './CardRank';
import { Pack } from './Pack';

export class SetDetail {
    public code: string;
    public packContents: string | string[][];
    public cards: CardDetail[];

    public ranks: CardRank[];
    private cachedRanks: { [category: string]: number; };

    // mapping of cards by category
    private idByCategory: { [category: string]: number[]; } = { };

    constructor(code: string, setBlob: any, rankBlob: any) {
        this.code = code;

        this.packContents = [];
        for (const item of setBlob.booster) {
            this.packContents.push(item);
        }

        this.ranks = [];
        for (const item of rankBlob) {
            this.ranks.push(new CardRank(item));
        }

        this.cachedRanks = {};

        // init
        this.cards = [];
        this.idByCategory = { };
        this.idByCategory.land = [];

        for (let i = 0; i < setBlob.cards.length; i++) {
            // create the card
            const cardDetail = new CardDetail(setBlob.cards[i], code, (name: string) => this.rankOf(name));
            this.cards.push(cardDetail);

            // special case, this card is a land
            if (cardDetail.types.indexOf('Land') > -1) {
                this.idByCategory.land.push(i);
            } else {
                // NOTE: we don't put lands in rarity categories so they won't get put into packs
                // (this may be incorrect for some sets)
                // push the index of the card into the hash by category
                if (!this.idByCategory[cardDetail.rarity.toLowerCase()]) {
                    this.idByCategory[cardDetail.rarity.toLowerCase()] = [];
                }
                this.idByCategory[cardDetail.rarity.toLowerCase()].push(i);
            }
        }
    }

    public createPack(): Pack {
        const cards: CardDetail[] = [];

        for (const nextCardType of this.packContents) {
            const card = this.pickACard(this.code, nextCardType);
            if (card) { cards.push(card); }
        }

        return new Pack(cards);
    }

    public rankOf(cardName: string) {
        if (this.cachedRanks[cardName]) {
            return this.cachedRanks[cardName];
        }

        const rank = this.ranks.find((c) => c.name.toLowerCase() === cardName.toLowerCase());

        if (rank) {
            this.cachedRanks[cardName] = rank.rank;
            return rank.rank;
        }

        // no rank found
        console.error('No rank found for: ' + cardName);
        return 0;
    }

    private pickACard(code: string, cardType: string | string[]): CardDetail | null {
        if (cardType === 'marketing') {
            // no op on marketing cards for draft
            return null;
        }

        // if this is just a single card type, this is easy
        if (!Array.isArray(cardType)) {
            if (!this.idByCategory[cardType]) {
                return null; // card type not found
            }

            // make sure GRN land is a gate
            if (cardType.toLowerCase() === 'land' && code.toUpperCase() === 'GRN') {
                let gateCard: CardDetail | null = null;
                while (!gateCard || !gateCard.subTypes || gateCard.subTypes.indexOf('Gate') === -1) {
                    const gateIdx = generate(0, this.idByCategory[cardType].length - 1);
                    gateCard = this.cards[this.idByCategory[cardType][gateIdx]];
                }
                return gateCard;
            }

            // pick a random number in the category and get the card
            const idx = generate(0, this.idByCategory[cardType].length - 1);
            return this.cards[this.idByCategory[cardType][idx]];
        }

        // most complex: could be one of a set of different cards
        // pick one random card of each card type
        const randomCards: number[] = [];

        if (cardType.indexOf('rare') > -1 && cardType.indexOf('mythic rare') > -1) {
            // we know rare/mythic is 1/8 so let's make that happen
            randomCards.push(this.idByCategory.rare[generate(0, this.idByCategory.rare.length - 1)]);
            randomCards.push(this.idByCategory.rare[generate(0, this.idByCategory.rare.length - 1)]);
            randomCards.push(this.idByCategory.rare[generate(0, this.idByCategory.rare.length - 1)]);
            randomCards.push(this.idByCategory.rare[generate(0, this.idByCategory.rare.length - 1)]);
            randomCards.push(this.idByCategory.rare[generate(0, this.idByCategory.rare.length - 1)]);
            randomCards.push(this.idByCategory.rare[generate(0, this.idByCategory.rare.length - 1)]);
            randomCards.push(this.idByCategory.rare[generate(0, this.idByCategory.rare.length - 1)]);
            randomCards.push(this.idByCategory['mythic rare'][generate(0, this.idByCategory['mythic rare'].length - 1)]);
        } else {
            // some other case of multiple types (no known formula)
            for (const ct of cardType) {
                const idx = generate(0, this.idByCategory[ct].length - 1);
                randomCards.push(this.idByCategory[ct][idx]);
            }
        }

        // pick one random card of the ones we found
        const ridx = generate(0, randomCards.length - 1);
        return this.cards[randomCards[ridx]];
    }
}