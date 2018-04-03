import * as types from "../actions/types";
import createReducer from "../lib/createReducer";

const initialState = [];

const ordersReducer = createReducer(initialState, {

    [types.UPDATE_ORDERS](state, action) {
        return action.props;
    },

    [types.INSERT_ORDER](state, action) {
        return state.concat([action.props.order]);
    },

    [types.UPDATE_ORDER](state, action) {

        const { props } = action;

        const newState = state.slice();
        newState[props.idx] = { ...props.order };

        return newState;
    }
});

export default ordersReducer;
