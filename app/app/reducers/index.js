import { combineReducers } from "redux";
import nav from "./navigation";
import orders from "./orders";
import recipes from "./recipes";
import user from "./user";

const AppReducer = combineReducers({
    nav,
    orders,
    recipes,
    user
});

export default AppReducer;
