import createReducer from "../lib/createReducer";
import * as types from "../actions/types";

const initialState = {
    jwt: "",
    errors: [],
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    sync: {}
};

const sessionReducer = createReducer(initialState, {

    [types.LOGIN](state, action) {

        const { props } = action;

        return {
            ...initialState,
            ...props
        };
    },

    [types.LOGOUT](state, action) {
        return {
            ...initialState,
            email: state.email
        };
    },

    [types.LOGIN_ERROR](state, action) {
        return {
            ...state,
            errors: action.props.errors
        };
    },

    [types.SET_SYNC](state, action) {
        return {
            ...state,
            sync: {
                ...state.sync,
                ...action.props
            }
        };
    },

    [types.CLEAR_SYNC](state, action) {
        return {
            ...state,
            sync: initialState.sync
        };
    }
});

export default sessionReducer;
