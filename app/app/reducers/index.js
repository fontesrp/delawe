import { combineReducers } from "redux";

import couriers from "./couriers";
import nav from "./navigation";
import orders from "./orders";
import profile from "./profile";
import requests from "./requests";
import session from "./session";
import store from "./store";
import transactions from "./transactions";
import user from "./user";
import wallet from "./wallet";

const AppReducer = combineReducers({
    couriers,
    nav,
    orders,
    profile,
    requests,
    session,
    store,
    transactions,
    user,
    wallet
});

export default AppReducer;
