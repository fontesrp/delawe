import * as types from "../actions/types";
import createReducer from "../lib/createReducer";

const initialState = [];

const couriersReducer = createReducer(initialState, {

    [types.UPDATE_COURIERS](state, action) {
        return action.props;
    }
});

export default couriersReducer;
