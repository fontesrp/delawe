import * as types from "./types";
import Api from "../lib/api";

export const login = function (params) {

    return function (dispatch, getState) {

        return Api
            .post("/tokens", params)
            .then(function (res) {

                const type = (res.errors !== undefined)
                    ? types.LOGIN_ERROR
                    : types.LOGIN;

                const props = {
                    ...params,
                    ...res
                };

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
