function httpGet(url, method, body) {

    return new Promise(function (resolve, reject) {

        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);

        xhr.onload = function () {
            if (this.status == 200 || this.status == 201 || this.status == 204) {
                resolve(this.response);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };

        xhr.onerror = function () {
            reject(new Error("Network Error"));
        };


        if (typeof body != 'undefined') {
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(JSON.stringify(body));
        } else {
            xhr.send();
        }

    });

}
module.exports = {'httpGet': httpGet};
