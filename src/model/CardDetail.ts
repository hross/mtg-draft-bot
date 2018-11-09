export class CardDetail {
    public id: string;
    public name: string;
    public cmc: number;
    public rarity: string;
    public types: string[];
    public subTypes: string[];
    public colorIdentity: string[];
    public imageUrl: string;
    public setCode: string;
    public rank: number;
    public manaCost: string;

    public whiteCost: number;
    public blueCost: number;
    public blackCost: number;
    public redCost: number;
    public greenCost: number;

    constructor(cardBlob: any, setCode: string, rankOf: (name: string) => number) {
        this.setCode = setCode;
        this.name = cardBlob.name;
        this.id = cardBlob.number;
        this.cmc = cardBlob.cmc;
        this.types = cardBlob.types;
        this.subTypes = cardBlob.subtypes;
        this.rarity = cardBlob.rarity;
        this.colorIdentity = cardBlob.colorIdentity;
        if (!this.colorIdentity) { this.colorIdentity = []; }
        this.rank = rankOf(this.name);
        this.manaCost = cardBlob.manaCost;

        const imageNumber = cardBlob.number.endsWith('a') || cardBlob.number.endsWith('b') ? cardBlob.number.substring(0, cardBlob.number.length - 2) : cardBlob.number;

        this.imageUrl = 'https://api.scryfall.com/cards/' + this.setCode.toLowerCase() + '/' + imageNumber + '?format=image&image_version=small';

        this.whiteCost = this.cost('W');
        this.blueCost = this.cost('U');
        this.blackCost = this.cost('B');
        this.redCost = this.cost ('R');
        this.greenCost = this.cost ('G');
    }

    public cost(color: string): number {
        if (!this.manaCost) { return 0; }

        const regex = new RegExp('{' + color + '}');
        const matches = this.manaCost.match(regex);

        return matches ? matches.length : 0;
    }
}