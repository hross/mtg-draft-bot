export class CardRank {
    public rank: number;
    public name: string;

    constructor(rankBlob: any) {
        this.rank = rankBlob.ELO;
        this.name = rankBlob.CardName;
    }
}