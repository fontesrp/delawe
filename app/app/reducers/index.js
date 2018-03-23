import { combineReducers } from "redux";
import nav from "./navigation";
import recipes from "./recipes";
import user from "./user";

const AppReducer = combineReducers({
    nav,
    recipes,
    user
});

export default AppReducer;
