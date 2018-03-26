import React from "react";

import ScreenContainer from "../containers/ScreenContainer";
import Home from "../containers/Home";
import Profile from "../containers/Profile";
import Wallet from "../containers/Wallet";

const screens = {
    Home,
    Profile,
    Wallet
};

const createScreen = function (name) {

    const Screen = screens[name];

    return () => <ScreenContainer><Screen /></ScreenContainer>;
};


export default screens;
export { createScreen };
