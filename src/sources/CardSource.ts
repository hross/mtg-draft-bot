export class CardDataSource {
    constructor() {
        // stuff?
    }

    public fetchSetDetail(code: string): Promise<any> {
        return fetch('./assets/json/cards/' + code + '.json', {
            method: 'GET',
        })
        .then((response) => {
            return response.json();
        });
    }

    public fetchSetRankings(code: string): Promise<any> {
        return fetch('./assets/json/ranks/' + code + '.json', {
            method: 'GET',
        })
        .then((response) => {
            return response.json();
        });
    }

    // not used but good to have around
    /*
    private fetchCardDetail(code: string, id: number): Promise<string> {
        return fetch('https://api.scryfall.com/cards/' + code + '/' + id, {})
            .then(response => response.text());
    }
    */
}