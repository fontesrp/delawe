import jwtDecode from "jwt-decode";

import * as types from "./types";
import Api from "../lib/api";

export const login = function (params) {

    return function (dispatch, getState) {

        return Api
            .post("/tokens", params)
            .then(function (res) {

                const props = { ...res };

                let type;

                if (res.errors === undefined) {
                    type = types.LOGIN;
                    Object.assign(props, jwtDecode(res.jwt));
                } else {
                    type = types.LOGIN_ERROR;
                }

                dispatch({
                    type,
                    props
                });
            });
    };
};

export const logout = function () {
    return function (dispatch, getState) {
        dispatch({
            type: types.LOGOUT
        });
    };
};
