import * as types from "./types";
import Api from "../lib/api";

export const fetchOrders = function () {

    return function (dispatch, getState) {

        const { session } = getState();

        Api
            .get("/orders", session)
            .then(function (props) {

                if (props.errors !== undefined) {
                    return;
                }

                dispatch({
                    type: types.UPDATE_ORDERS,
                    props
                });
            });
    };
};

export const newPickup = function (params) {

    return function (dispatch, getState) {
        console.log("newPickup", params);
    };
};
