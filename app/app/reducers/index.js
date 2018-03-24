import { combineReducers } from "redux";

import couriers from "./couriers";
import nav from "./navigation";
import orders from "./orders";
import user from "./user";

const AppReducer = combineReducers({
    couriers,
    nav,
    orders,
    user
});

export default AppReducer;
