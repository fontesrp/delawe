import createReducer from "../lib/createReducer";
import * as types from "../actions/types";

const initialState = {
    email: "",
    jwt: "",
    errors: []
};

const sessionReducer = createReducer(initialState, {

    [types.LOGIN](state, action) {

        const { props } = action;

        return {
            ...initialState,
            email: props.email,
            jwt: props.jwt
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
    }
});

export default sessionReducer;
