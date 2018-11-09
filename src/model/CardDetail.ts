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

    constructor(cardBlob: any, setCode: string) {
        this.setCode = setCode;
        this.name = cardBlob.name;
        this.id = cardBlob.number;
        this.cmc = cardBlob.cmc;
        this.types = cardBlob.types;
        this.subTypes = cardBlob.subtypes;
        this.rarity = cardBlob.rarity;
        this.colorIdentity = cardBlob.colorIdentity;

        const imageNumber = cardBlob.number.endsWith('a') || cardBlob.number.endsWith('b') ? cardBlob.number.substring(0, cardBlob.number.length - 2) : cardBlob.number;

        this.imageUrl = 'https://api.scryfall.com/cards/' + this.setCode.toLowerCase() + '/' + imageNumber + '?format=image&image_version=small';
    }
}