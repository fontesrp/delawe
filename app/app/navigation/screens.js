import React from "react";

import ScreenContainer from "../containers/ScreenContainer";
import Home from "../components/Home";
import Profile from "../components/Profile";

const screens = {
    Home,
    Profile
};

const createScreen = function (name) {

    const Screen = screens[name];

    return () => <ScreenContainer><Screen /></ScreenContainer>;
};


export default screens;
export { createScreen };
