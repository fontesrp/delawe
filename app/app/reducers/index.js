import { combineReducers } from "redux";

import couriers from "./couriers";
import nav from "./navigation";
import orders from "./orders";
import recipes from "./recipes";
import user from "./user";

const AppReducer = combineReducers({
    couriers,
    nav,
    orders,
    recipes,
    user
});

export default AppReducer;
