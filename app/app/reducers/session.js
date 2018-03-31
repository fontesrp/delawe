import createReducer from "../lib/createReducer";
import * as types from "../actions/types";

const initialState = {
    jwt: "",
    errors: [],
    id: 0,
    first_name: "",
    last_name: "",
    email: ""
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
    }
});

export default sessionReducer;
