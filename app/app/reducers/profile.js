import createReducer from "../lib/createReducer";
import * as types from "../actions/types";
import { patchOldState } from "../lib/util";

const initialState = {
    name: "",
    image: "",
    contact: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    province: ""
};

const userReducer = createReducer(initialState, {

    [types.UPDATE_PROFILE](state, action) {

        return patchOldState(state, action);
    },

    [types.LOGOUT](state, action) {
        return initialState;
    }
});

export default userReducer;
