import * as types from "./types";

export const updateCreditCard = function (cardProps) {

    return function (dispatch, getState) {

        dispatch({
            type: types.UPDATE_CREDIT_CARD,
            props: cardProps
        });
    };
};

export const addCredit = function (cardProps) {

    return function (dispatch, getState) {

        // TODO: Make POST request
        // TODO: Update state with server response

        const { wallet } = getState();

        const balance = wallet.balance + Number(wallet.creditCard.credits);

        dispatch({
            type: types.UPDATE_BALANCE,
            balance
        });
    };
};

export const clearCard = function () {

    return function (dispatch, getState) {

        dispatch({
            type: types.CLEAR_CREDIT_CARD
        });
    };
};
