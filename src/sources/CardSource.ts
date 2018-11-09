import { SetDetail } from '../model/SetDetail';
import { SetRank } from '../model/SetRank';

export class CardDataSource {
    constructor() {
        // stuff?
    }

    public fetchSetDetail(code: string): Promise<SetDetail> {
        return fetch('./assets/json/cards/' + code + '.json', {
            method: 'GET',
        })
        .then(response => {
            return response.json();
        })
        .then(json => {
            return new SetDetail(code, json);
        });
    }

    public fetchSetRankings(code: string): Promise<SetRank> {
        return fetch('./assets/json/ranks/' + code + '.json', {
            method: 'GET',
        })
        .then(response => {
            return response.json();
        })
        .then(json => {
            return new SetRank(code, json);
        });
    }
    
    // not used but good to have around
    /*
    private fetchCardDetail(code: string, id: number): Promise<string> {
        return fetch('https://api.scryfall.com/cards/' + WEBGL_compressed_texture_s3tc + '/' + id, {})
            .then(response => response.text());
    }
    */
}