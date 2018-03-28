import * as types from "./types";

export const login = function (params) {

    return function (dispatch, getState) {

        // TODO: Get access token

        const props = params;

        dispatch({
            type: types.LOGIN,
            props
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
