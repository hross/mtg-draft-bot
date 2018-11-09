import { Pack } from './Pack';
import { SetDetail } from './SetDetail';

export class DraftState {
    public packNumber: number;
    public pickNumber: number;
    public cardsInPack: number;

    public numPlayers: number;
    public packsPerPlayer: number;

    public packs: Pack[];

    // start with number of players and all packs for the given draft
    constructor(numPlayers: number, packsPerPlayer: number, setDetail: SetDetail) {
        this.packs = [];
        this.numPlayers = numPlayers;

        this.pickNumber = 0;
        this.packNumber = 0;

        // create the right number of booster packs
        for (let i: number = 0; i < numPlayers * packsPerPlayer; i++) {
            this.packs.push(setDetail.createPack());
            this.cardsInPack = this.packs[0].cards.length;
        }
    }

    // which pack should I pick from, given a player index?
    public packForPlayer(playerIndex: number): Pack {
        const packOffset = this.numPlayers * this.packNumber;
        const packIndex = (playerIndex + this.pickNumber) % this.numPlayers;

        if (packIndex + packOffset >= this.packs.length) {
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