import createReducer from "../lib/createReducer";

const initialState = {
    name: "MyRestaurant",
    image: "https://i.imgur.com/RrUk5JL.jpg"
};

const userReducer = createReducer(initialState, {

    CHANGE_USER(state, action) {

        const newUser = {
            name: "OtherPlace",
            image: "https://i.imgur.com/QSIXPaM.jpg"
        };

        return (state.name === "MyRestaurant")
            ? newUser
            : initialState;
    }
});

export default userReducer;
