import React from "react";

import ScreenContainer from "../containers/ScreenContainer";
import Home from "../containers/Home";
import OrderHistory from "../containers/OrderHistory";
import Profile from "../containers/Profile";
import Settings from "../containers/Settings";
import Wallet from "../containers/Wallet";

const screens = {
    Home,
    OrderHistory,
    Profile,
    Settings,
    Wallet
};

const createScreen = function (name) {

    const Screen = screens[name];

    return () => <ScreenContainer><Screen /></ScreenContainer>;
};


export default screens;
export { createScreen };
