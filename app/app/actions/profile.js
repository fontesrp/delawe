import * as types from "./types";
import { breakupAddress } from "../lib/util";

export const updateProfile = function (userProps) {

    return function (dispatch, getState) {

        const props = { ...userProps };

        if (props.hasOwnProperty("address")) {
            Object.assign(props, breakupAddress(props.address));
            delete pros.address;
        }

        dispatch({
            type: types.UPDATE_PROFILE,
            props
        });
    };
};
