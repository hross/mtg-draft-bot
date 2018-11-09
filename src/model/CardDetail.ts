export class CardDetail {
    public id: number;
    public name: string;
    public cmc: number;
    public rarity: string;
    public types: string[];
    public colorIdentity: string[];

    constructor(cardBlob: any) {
        this.name = cardBlob.name;
        this.id = cardBlob.number;
        this.cmc = cardBlob.cmc;
        this.types = cardBlob.types;
        this.rarity = cardBlob.rarity;
        this.colorIdentity = cardBlob.colorIdentity;
    }
}