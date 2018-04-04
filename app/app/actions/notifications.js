import * as types from "./types";

export const clearNotifications = function () {

    return function (dispatch, getState) {

        dispatch({
            type: types.CLEAR_NOTIFICATIONS
        });
    };
};
