class Api {

    static setAuth(jwt) {
        this.auth = jwt;
    }

    static headers() {
        return {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": this.auth
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

    static async xhr(route, params, verb) {

        const host = "http://localhost:3000";
        const url = `${host}${route}`;

        const options = {
            headers: Api.headers(),
            method: verb
        };

        if (params) {
            options.body = JSON.stringify(params);
        }

        let response;
        let json;

        try {
            response = await fetch(url, options);
            json = await response.json();
        } catch (e) {
            json = { errors: ["request error"] };
        }

        return json;
    }
}

export default Api;
