import createReducer from "../lib/createReducer";
import * as types from "../actions/types";
import { patchOldState } from "../lib/util";

const initialState = {
    name: "Grilled Gourmet",
    image: "https://www.48hourslogo.com/48hourslogo_data/2016/09/21/54195_1474457526.jpg",
    address: "2075 Kingsway St, Vancouver, BC",
    contact: "Eric Khan",
    email: "eric.khan@gmail.com",
    phone: "3127810051",
    latitude: 49.2136074,
    longitude: -122.8245812,
    enableLocation: false,
    currentLocation: {
        latitude: null,
        longitude: null
    }
};

const userReducer = createReducer(initialState, {

    [types.UPDATE_USER](state, action) {
        return patchOldState(state, action);
    },

    [types.UPDATE_LOCATION](state, action) {
        return patchOldState(state, action);
    }
});

export default userReducer;
