import * as types from "./types";
import Api from "../lib/api";

export const fetchCouriers = function () {

    return function (dispatch, getState) {

        const { session } = getState();

        Api
            .get("/teams", session)
            .then(function (props) {

                if (props.errors !== undefined) {
                    return;
                }

                dispatch({
                    type: types.UPDATE_COURIERS,
                    props
                });
            });
    };
};
