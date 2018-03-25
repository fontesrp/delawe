import * as types from "./types";
import { joinAddress } from "../lib/util";

export const updateUser = function (userProps) {

    return function (dispatch, getState) {

        const props = {
            name: userProps.name,
            image: userProps.image.replace("data:image/png;base64,", ""),
            address: joinAddress(userProps)
        };

        // TODO: Make PATCH request
        // TODO: Update state with server response

        dispatch({
            type: types.UPDATE_USER,
            props
        });
    };
};
