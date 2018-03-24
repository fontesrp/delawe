import createReducer from "../lib/createReducer";

const initialState = {
    name: "MyRestaurant",
    image: "https://i.imgur.com/RrUk5JL.jpg",
    address: "2075 Kingsway St, Vancouver, BC",
    latitude: 49.2136074,
    longitude: -122.8245812
};

const userReducer = createReducer(initialState, {

    CHANGE_USER(state, action) {

        const newUser = {
            name: "OtherPlace",
            image: "https://i.imgur.com/QSIXPaM.jpg",
            address: "142 W Hastings St, Vancouver, BC",
            latitude: 49.281964,
            longitude: -123.1108491
        };

        return (state.name === "MyRestaurant")
            ? newUser
            : initialState;
    }
});

export default userReducer;
