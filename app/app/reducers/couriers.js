import * as types from "../actions/types";
import createReducer from "../lib/createReducer";

const initialState = [];

const couriersReducer = createReducer(initialState, {

    [types.UPDATE_COURIERS](state, action) {
        return action.props;
    },

    [types.INSERT_COURIER](state, action) {
        return state.concat([action.props.courier]);
    },

    [types.UPDATE_COURIER](state, action) {

        const { props } = action;

        const newState = state.slice();
        newState[props.idx] = props.courier;

        return newState;
    }
});

export default couriersReducer;
