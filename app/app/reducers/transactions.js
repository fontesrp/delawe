import * as types from "../actions/types";
import createReducer from "../lib/createReducer";

const initialState = [];

const transactionsReducer = createReducer(initialState, {

    [types.UPDATE_TRANSACTIONS](state, action) {
        return action.props;
    },

    [types.INSERT_TRANSACTION](state, action) {
        return state.concat([action.props.transaction]);
    },

    [types.UPDATE_TRANSACTION](state, action) {

        const { props } = action;

        const newState = state.slice();
        newState[props.idx] = props.transaction;

        return newState;
    },

    [types.LOGOUT](state, action) {
        return initialState;
    }
});

export default transactionsReducer;
