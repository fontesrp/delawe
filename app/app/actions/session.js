import jwtDecode from "jwt-decode";

import * as types from "./types";
import Api from "../lib/api";

export const login = function (params) {

    return function (dispatch, getState) {

        let session;
        let userProps;

        return Api
            .post("/tokens", params)
            .then(function (res) {

                const props = { ...res };

                let type;

                if (res.errors === undefined) {
                    type = types.LOGIN;
                    Object.assign(props, jwtDecode(res.jwt));
                } else {
                    type = types.LOGIN_ERROR;
                }

                dispatch({
                    type,
                    props
                });

                if (type !== types.LOGIN) {
                    throw "Login error";
                }

                session = props;
            })
            .then(() => Api.get(`/users/${session.id}`, session))
            .then(function (user) {

                userProps = user;

                dispatch({
                    type: types.UPDATE_USER,
                    props: user
                });
            })
            .then(() => Api.get("/orders", session))
            .then(function (orders) {
                dispatch({
                    type: types.UPDATE_ORDERS,
                    props: orders
                });
            })
            .then(() => Api.get("/teams", session))
            .then(function (props) {

                const type = (userProps.user_type === 'store')
                    ? types.UPDATE_COURIERS
                    : types.UPDATE_STORE;

                dispatch({
                    type,
                    props
                });
            })
            .catch(console.log);
    };
};

export const logout = function () {
    return function (dispatch, getState) {
        dispatch({
            type: types.LOGOUT
        });
    };
};
