import createReducer from "../lib/createReducer";
import * as types from "../actions/types";
import { patchOldState, fullName } from "../lib/util";

const initialState = {
    // From API
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    user_type: "",
    address: "",
    latitude: 0.0,
    longitude: 0.0,
    business_name: "",
    phone: "",
    balance: 0.0,
    image: "https://www.48hourslogo.com/48hourslogo_data/2016/09/21/54195_1474457526.jpg",
    created_at: "",
    updated_at: "",
    // For app
    name: "",
    enableLocation: true,
    currentLocation: {
        latitude: null,
        longitude: null
    }
};

const userReducer = createReducer(initialState, {

    [types.UPDATE_USER](state, action) {

        const { props } = action;

        props.balance = Number(props.balance);
        props.name = fullName(props.first_name, props.last_name);

        return patchOldState(state, props);
    },

    [types.UPDATE_LOCATION](state, action) {
        return patchOldState(state, action);
    }
});

export default userReducer;
