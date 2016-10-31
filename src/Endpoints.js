const dealWithFetchPromise = (promise, resolve, reject) => {
    promise
    .then(response => {
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
}

class Endpoint {
    constructor(path) {
        this.path = path;
    }

    getData() {
        return new Promise((resolve, reject) => {
            const promise = fetch(this.path);
            dealWithFetchPromise(promise, resolve, reject);
        }); 
    }

    postData(dataObject) {
        return new Promise((resolve, reject) => {
            const promise = fetch(this.path, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(dataObject)
            });
            dealWithFetchPromise(promise, resolve, reject);
        }); 
    }
}

export default {
    Board: (board) => new Endpoint('/api/boards/' + board),
    Boards: () => new Endpoint('/api/boards/'),
    Threads: (board) => new Endpoint('/api/boards/' + board + '/posts/'),
    Replies: (board, topic) => new Endpoint('/api/boards/' + board + '/posts/topics/' + topic)
};