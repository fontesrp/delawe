class Api {

    static headers() {
        return {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "dataType": "json"
        };
    }

    static get(route) {
        return this.xhr(route, null, "GET");
    }

    static put(route, params) {
        return this.xhr(route, params, "PUT");
    }

    static post(route, params) {
        return this.xhr(route, params, "POST");
    }

    static delete(route, params) {
        return this.xhr(route, params, "DELETE");
    }

    static xhr(route, params, verb) {

        const host = "http://localhost:3000";
        const url = `${host}${route}`;

        const options = {
            headers: Api.headers(),
            method: verb
        };

        if (params) {
            options.body = JSON.stringify(params);
        }

        return fetch(url, options)
            .then(res => res.json())
            .catch(function () {
                return { error: "request error" };
            });
    }
}

export default Api;
