import * as types from "./types";
import Order from "../lib/order";

export const fetchOrders = function () {

    return function (dispatch, getState) {

        const { session } = getState();

        Order
            .index(session)
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

const newOrder = function (params) {

    return Order
        .create({
            order: params.form,
            courierId: params.courier.id,
            session: params.session
        })
        .then(function (props) {
            params.dispatch({
                type: types.ORDER_SAVED,
                props
            });
        });
};

const updateOrder = function (params) {

    console.log("updateOrder");
    console.log(params);

    const {
        order,
        action,
        session,
        dispatch,
        courierId = null,
        form = null
    } = params;

    const patchParams = {
        id: order.id,
        action,
        session
    };

    if (form && (order.value !== form.value || order.address !== form.address)) {
        patchParams.order = { ...form };
    }

    if (courierId) {
        patchParams.courierId = courierId;
    }

    return Order
        .update(patchParams)
        .then(function (props) {
            dispatch({
                type: types.ORDER_SAVED,
                props
            });
        });
};

export const newPickup = function (params) {

    return function (dispatch, getState) {

        console.log("newPickup");
        console.log(params);

        const { session } = getState();
        const { order, form, courier } = params;

        let promise = null;
        let updateParams = {
            order: order,
            action: "",
            form,
            session,
            dispatch
        };

        if (order.id === undefined) {
            promise = newOrder.bind(null, {
                ...params,
                session,
                dispatch
            });
        } else if (order.courier_id !== courier.id) {

            if (courier.id === undefined && order.courier_id !== null) {
                updateParams.action = "unassign";
            } else if (courier.id !== undefined && order.courier_id === null) {
                updateParams.action = "assign";
                updateParams.courierId = courier.id;
            } else if (courier.id !== undefined && order.courier_id !== null) {
                updateParams.action = "reassign";
                updateParams.courierId = courier.id;
            }

            promise = updateOrder.bind(null, updateParams);
        }

        if (promise) {
            promise().then(() => fetchOrders()(dispatch, getState));
        }
    };
};

export const cancelOrder = function (order) {

    return function (dispatch, getState) {

        const { session } = getState();

        updateOrder({
            order,
            action: "cancel",
            session,
            dispatch
        }).then(() => fetchOrders()(dispatch, getState));
    };
};
