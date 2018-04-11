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
    },

    [types.LOGOUT](state, action) {
        return initialState;
    },

    [types.UPDATE_COURIER_LOC](state, action) {

        const { props } = action;
        const newState = state.slice();

        newState[props.idx] = {
            ...newState[props.idx],
            latitude: props.latitude,
            longitude: props.longitude
        };

        return newState;
    }
});

export default couriersReducer;
