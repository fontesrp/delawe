import * as types from "./types";

export const goToHome = function () {
    return function (dispatch, getState) {
        dispatch({ type: types.ROUTE_HOME });
    };
};

export const goToProfile = function () {
    return function (dispatch, getState) {
        dispatch({ type: types.ROUTE_PROFILE });
    };
};

export const goToMyWallet = function () {
    return function (dispatch, getState) {
        dispatch({ type: types.ROUTE_MY_WALLET });
    };
};

export const goToOrderHistory = function () {
    return function (dispatch, getState) {
        dispatch({ type: types.ROUTE_ORDER_HISTORY });
    };
};

export const goToSettings = function () {
    return function (dispatch, getState) {
        dispatch({ type: types.ROUTE_SETTINGS });
    };
};

export const openDrawer = function () {
    return function (dispatch, getState) {
        dispatch({ type: types.ROUTE_DRAWER_OPEN });
    };
};

export const closeDrawer = function () {
    return function (dispatch, getState) {
        dispatch({ type: types.ROUTE_DRAWER_CLOSE });
    };
};
