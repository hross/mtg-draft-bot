import { CardRank } from './CardRank';

export class SetRank {
    public code: string;
    public ranks: CardRank[];

    private cachedRanks: { [category: string]: number; };

    constructor(code: string, rankBlob: any) {
        this.code = code;
        this.ranks = [];
        for (const item of rankBlob) {
            this.ranks.push(new CardRank(item));
        }

        this.cachedRanks = {};
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
}
