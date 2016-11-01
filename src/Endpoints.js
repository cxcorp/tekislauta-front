const dealWithFetchPromise = (promise, resolve, reject) => {
    promise
    .then(response => {
        if (response.status === 401) {
            alert("Invalid authorization!");
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
}

class Endpoint {
    constructor(path) {
        this.path = path;
    }

    getData(queryString) {
        return new Promise((resolve, reject) => {
            const promise = fetch(this.path + (queryString ? queryString : ""));
            dealWithFetchPromise(promise, resolve, reject);
        }); 
    }

    postData(dataObject, auth) {
        return new Promise((resolve, reject) => {
            var fetchProps = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(dataObject)
            };

            if (auth && auth.username && auth.password) {
                fetchProps.headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password);
            }

            const promise = fetch(this.path, fetchProps);
            dealWithFetchPromise(promise, resolve, reject);
        }); 
    }
}

export default {
    Board: (board) => new Endpoint('/api/api/boards/' + board),
    Boards: () => new Endpoint('/api/api/boards/'),
    Threads: (board) => new Endpoint('/api/api/boards/' + board + '/posts/'),
    Replies: (board, topic) => new Endpoint('/api/api/boards/' + board + '/posts/topics/' + topic)
};