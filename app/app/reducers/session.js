import createReducer from "../lib/createReducer";
import * as types from "../actions/types";

const initialState = {
    jwt: "",
    error: {}
};

const sessionReducer = createReducer(initialState, {

    [types.LOGIN](state, action) {
        console.log("Login!");
    },

    [types.LOGOUT](state, action) {
        return initialState;
    }
});

export default sessionReducer;
