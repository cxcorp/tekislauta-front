class Endpoint {
    constructor(path) {
        this.path = path;
    }

    getData() {
        return new Promise((resolve, reject) => {
            fetch(this.path)
            .then(response => {
                if (!response.ok) {
                    reject(`Response from server was not okay (${response.status} - ${response.statusText})!`);
                    return;
                }
                response
                .json()
                .then(data => {
                    if (data.status === 'Success') {
                        resolve(data.data);
                        return;
                    }
                    reject(`Server responded with an error: "${data.data}"`);
                });
            })
            .catch(err => reject(err));
        }); 
    }
}

export default {
    Board: (abbreviation) => new Endpoint('/api/boards/' + abbreviation),
    Boards: () => new Endpoint('/api/boards/')
};