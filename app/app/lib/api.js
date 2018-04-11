class Api {

    static headers(jwt) {
        return {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": jwt
        };
    }

    static get(route, session = {}) {
        return this.xhr(route, null, session, "GET");
    }

    static patch(route, params, session = {}) {
        return this.xhr(route, params, session, "PATCH");
    }

    static post(route, params, session = {}) {
        return this.xhr(route, params, session, "POST");
    }

    static delete(route, params, session = {}) {
        return this.xhr(route, params, session, "DELETE");
    }

    static async xhr(route, params, session, verb) {

        const host = "http://delawe.rfapps.co";
        const url = `${host}${route}`;

        const options = {
            headers: Api.headers(session.jwt),
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
