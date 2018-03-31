import * as types from "../actions/types";
import createReducer from "../lib/createReducer";

const initialState = [];

const ordersReducer = createReducer(initialState, {

    [types.UPDATE_ORDERS](state, action) {
        return action.props;
    }
});

export default ordersReducer;
