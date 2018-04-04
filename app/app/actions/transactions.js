import * as types from "./types";
import Api from "../lib/api";

export const fetchTransactions = function () {

    return function (dispatch, getState) {

        const { session } = getState();

        Api
            .get("/transactions", session)
            .then(function (props) {

                if (props.errors !== undefined) {
                    return;
                }

                dispatch({
                    type: types.UPDATE_TRANSACTIONS,
                    props
                });
            });
    };
};
