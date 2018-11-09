export class CardRank {
    public rank: number;
    public name: string;

    constructor(rankBlob: any) {
        this.rank = parseInt(rankBlob.ELO, 10);
        this.name = rankBlob.CardName;
    }
}