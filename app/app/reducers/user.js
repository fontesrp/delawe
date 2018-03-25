import createReducer from "../lib/createReducer";
import * as types from "../actions/types";

const initialState = {
    name: "MyRestaurant",
    image: "https://i.imgur.com/RrUk5JL.jpg",
    address: "2075 Kingsway St, Vancouver, BC",
    latitude: 49.2136074,
    longitude: -122.8245812
};

const userReducer = createReducer(initialState, {

    [types.UPDATE_USER](state, action) {

        const { props = {} } = action;

        const newState = { ...state };

        Object.keys(props).forEach(function (key) {
            newState[key] = props[key];
        });

        return newState;
    }
});

export default userReducer;
