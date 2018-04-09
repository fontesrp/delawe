import * as types from "./types";

export const clearRequests = function () {

    return function (dispatch, getState) {

        dispatch({
            type: types.CLEAR_REQUESTS
        });
    };
};
