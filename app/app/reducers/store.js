import * as types from "../actions/types";
import createReducer from "../lib/createReducer";

const initialState = {};

const couriersReducer = createReducer(initialState, {

    [types.UPDATE_STORE](state, action) {
        return action.props;
    },

    [types.LOGOUT](state, action) {
        return initialState;
    }
});

export default couriersReducer;
