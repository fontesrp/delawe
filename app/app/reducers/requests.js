import * as types from "../actions/types";
import createReducer from "../lib/createReducer";

const initialState = {};

const animationsReducer = createReducer(initialState, {

    [types.ORDER_SAVED](state, action) {
        return {
            ...state,
            orderSaved: action.props
        };
    },

    [types.CLEAR_REQUESTS](state, action) {
        return initialState;
    },

    [types.LOGOUT](state, action) {
        return initialState;
    }
});

export default animationsReducer;
