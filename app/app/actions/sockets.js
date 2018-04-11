import * as types from "./types";

const findOld = function (nail, haystack) {

    let index = -1;

    haystack.find(function (item, idx) {

        if (item.id === nail.id) {
            index = idx;
            return true;
        }

        return false;
    });

    return index;
};

const sendNew = function (name, old, data, dispatch, insert, update) {

    const props = {
        idx: findOld(data, old),
        [name]: { ...data }
    };

    if (name === "order" && props[name].action) {
        props.action = props[name].action.replace("!", "");
        delete props[name].action;
        props.prevAasmState = props[name].prev_aasm_state;
        delete props[name].prev_aasm_state;
    }

    const type = (props.idx === -1)
        ? insert
        : update;

    dispatch({
        type,
        props
    });
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

const updateBalance = function (dispatch, prevWallet, newWallet) {

    if (prevWallet.balance !== newWallet.balance) {
        dispatch({
            type: types.UPDATE_BALANCE,
            balance: newWallet.balance
        });
    }
};

const updateCourierLoc = function (dispatch, couriers, data) {

    const idx = findOld(data, couriers);

    console.log("updateCourierLoc");
    console.log("idx", idx);

    if (idx !== -1) {

        const props = {
            idx,
            ...data
        };

        dispatch({
            type: types.UPDATE_COURIER_LOC,
            props
        });
    }
};

export const receiveUser = function (data) {

    return function (dispatch, getState) {

        console.log("receiveUser");
        console.log("data", data);

        const state = getState();

        if (data.id === state.user.id) {
            updateBalance(dispatch, state.wallet, data);
        } else {
            updateCourierLoc(dispatch, state.couriers, data);
        }
    };
};
