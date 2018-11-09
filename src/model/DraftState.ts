import { Pack } from "./Pack";

export class DraftState {
    public packNumber: number;
    public pickNumber: number;
    public cardsInPack: number;

    public numPlayers: number;

    public packs: Pack[];

    // start with number of players and all packs for the given draft
    constructor(numPlayers: number, packs: Pack[]) {
        this.packs = packs;
        this.numPlayers = numPlayers;
        this.cardsInPack = packs[0].cards.length;

        this.pickNumber = 0;
        this.packNumber = 0;
    }

    // which pack should I pick from, given a player index?
    public packForPlayer(playerIndex: number): Pack {
        const packOffset = this.numPlayers * this.packNumber;
        const packIndex = (playerIndex + this.pickNumber) % this.numPlayers;

        if ( packIndex + packOffset >= this.packs.length) {
            return new Pack([]); // nothing to pick
        }

        // return pack at the right spot for this player
        return this.packs[packIndex + packOffset];
    }

    // advance to the next pick in the draft
    public nextPick(): void {
        this.pickNumber++;

        if (this.pickNumber >= this.cardsInPack) {
            this.pickNumber = 0;
            this.packNumber++;
        }
    }

    // is the draft over?
    public isFinished() {
        return this.packNumber * this.numPlayers >= this.packs.length;
    }
}