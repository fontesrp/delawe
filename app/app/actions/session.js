import { Timers } from "react-native";
import jwtDecode from "jwt-decode";

import * as types from "./types";
import Api from "../lib/api";

const fetchAll = function (dispatch, session) {

    let userProps;

    return Api
        .get(`/users/${session.id}`, session)
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
        .then(() => Api.get("/transactions", session))
        .then(function (transactions) {
            dispatch({
                type: types.UPDATE_TRANSACTIONS,
                props: transactions
            });
        });
};

const clearOldSync = function (session) {

    const { sync = {} } = session;
    const keys = Object.keys(sync);

    if (keys.length > 0) {
        keys.forEach(key => clearInterval(sync[key]));
    }
};

const createSync = function (session, dispatch) {
    return {
        fetchAll: setInterval(fetchAll.bind(null, dispatch, session), 1500)
    };
};

export const login = function (params) {

    return function (dispatch, getState) {

        return Api
            .post("/tokens", params)
            .then(function (res) {

                const props = { ...res };

                let type;

                if (res.errors === undefined) {

                    type = types.LOGIN;

                    Object.assign(props, jwtDecode(res.jwt));

                    // props.sync = createSync(props, dispatch);
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

                return props;
            })
            .then(fetchAll.bind(null, dispatch))
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

export const registerSync = function () {

    return function (dispatch, getState) {

        const { session } = getState();

        clearOldSync(session);

        dispatch({
            type: types.SET_SYNC,
            props: createSync(session, dispatch)
        });
    };
};

export const clearSync = function (cb) {

    return function (dispatch, getState) {

        const { session } = getState();

        clearOldSync(session);

        dispatch({
            type: types.CLEAR_SYNC
        });

        if (typeof cb === "function") {
            cb();
        }
    };
};
