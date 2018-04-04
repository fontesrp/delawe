import * as types from "./types";
import { joinAddress } from "../lib/util";
import Api from "../lib/api";

export const fetchUserData = function () {

    return function (dispatch, getState) {

        const { session } = getState();

        Api
            .get(`/users/${session.id}`, session)
            .then(function (props) {

                if (props.errors !== undefined) {
                    return;
                }

                dispatch({
                    type: types.UPDATE_USER,
                    props
                });
            });
    };
};

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

export const updateLocation = function (params) {

    return function (dispatch, getState) {

        const props = {
            currentLocation: {
                latitude: null,
                longitude: null
            }
        };

        if (params.enableLocation !== undefined) {
            props.enableLocation = params.enableLocation;
        } else {
            Object.assign(props.currentLocation, params.currentLocation);
        }

        dispatch({
            type: types.UPDATE_LOCATION,
            props
        });
    };
};

export const setTracking = function (enable) {

    if (enable) {
        navigator.geolocation.requestAuthorization();
    }

    return updateLocation({ enableLocation: enable });
};
