import { DraftState } from './DraftState';
import { Pack } from './Pack';
import { Player } from './Player';
import { SetDetail } from './SetDetail';

export class Draft {
    private static NumPlayers: number = 8;
    private static PacksPerPlayer: number = 3;

    public draftState: DraftState;
    public setDetail: SetDetail;
    public players: Player[];

    constructor(setDetail: SetDetail) {
        // create some bots
        this.players = [];
        for (let i: number = 0; i < Draft.NumPlayers; i++) {
            this.players.push(new Player(i, 'Player ' + i.toString()));
        }

        // establish the set we are drafting from
        if (setDetail) {
            this.setDetail = setDetail;
        }

        // create the right number of booster packs
        const packs: Pack[] = [];
        for (let i: number = 0; i < Draft.NumPlayers * Draft.PacksPerPlayer; i++) {
            packs.push(this.setDetail.createPack());
        }

        // set up the draft state
        this.draftState = new DraftState(this.players.length, packs);
    }

    // let nonhuman players pick from this round
    public pickNonHumans(): void {
        for (let i: number = 0; i < this.players.length; i++) {
            if (!this.players[i].isHuman) {
                this.players[i].pickCard(this.draftState.packForPlayer(i).cards);
            }
        }
    }

    // TODO: add a way to let humans pick stuff

    // move to the next pick in the draft
    public nextPick(): void {
        this.draftState.nextPick();
    }

    // this only works if we are fully automated
    public go(): void {
        while (!this.draftState.isFinished()) {
            this.pickNonHumans();
            this.nextPick();
        }
    }
}