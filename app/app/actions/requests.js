import * as types from "./types";

export const clearRequests = function () {

    return function (dispatch, getState) {

        dispatch({
            type: types.CLEAR_REQUESTS
        });
    };
};

const findOld = function (nail, haystack, name) {

    const props = {
        idx: -1,
        [name]: {}
    };

    props[name] = haystack.find(function (item, idx) {

        if (item.id === nail.id) {
            props.idx = idx;
            return true;
        }

        return false;
    });

    return props;
};

const sendNew = function (name, old, data, dispatch, insert, update) {

    const props = findOld(data, old, name);

    let type;

    if (props.idx === -1) {
        props[name] = data;
        type = insert;
    } else {
        type = update;
    }

    dispatch({
        type,
        props
    });
};

export const receiveCourier = function (data) {

    return function (dispatch, getState) {

        const { couriers } = getState();

        sendNew("courier", couriers, data, dispatch, types.INSERT_COURIER, types.UPDATE_COURIER);
    };
};

export const receiveOrder = function (data) {

    return function (dispatch, getState) {

        const { orders } = getState();

        sendNew("order", orders, data, dispatch, types.INSERT_ORDER, types.UPDATE_ORDER);
    };
};

export const receiveTransaction = function (data) {

    return function (dispatch, getState) {

        const { transactions } = getState();

        sendNew("transaction", transactions, data, dispatch, types.INSERT_TRANSACTION, types.UPDATE_TRANSACTION);
    };
};

export const receiveUser = function (data) {

    return function (dispatch, getState) {

        const { wallet } = getState();

        if (wallet.balance !== data.balance) {
            dispatch({
                type: types.UPDATE_BALANCE,
                balance: data.balance
            });
        }
    };
};
