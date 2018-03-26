import { combineReducers } from "redux";

import couriers from "./couriers";
import nav from "./navigation";
import orders from "./orders";
import profile from "./profile";
import user from "./user";
import wallet from "./wallet";

const AppReducer = combineReducers({
    couriers,
    nav,
    orders,
    profile,
    user,
    wallet
});

export default AppReducer;
