import React from "react";

import ScreenContainer from "../containers/ScreenContainer";
import Home from "../components/Home";
import Profile from "../components/Profile";
import Wallet from "../components/Wallet";

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
