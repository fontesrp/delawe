import * as types from "../actions/types";
import createReducer from "../lib/createReducer";
import { prettyNumber } from "../lib/util";

const initialState = [];

const notificationsReducer = createReducer(initialState, {

    [types.INSERT_ORDER](state, action) {

        const { order } = action.props;

        const notication = {
            type: "order_new",
            order
        };

        return state.concat([notication]);
    },

    [types.UPDATE_ORDER](state, action) {

        const notication = {
            type: "order_update",
            ...action.props
        };

        return state.concat([notication]);
    },

    [types.CLEAR_NOTIFICATIONS](state, action) {
        return initialState;
    },

    [types.LOGOUT](state, action) {
        return initialState;
    }
});

export default notificationsReducer;
