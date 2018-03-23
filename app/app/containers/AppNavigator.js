import React from "react";
import { DrawerNavigator } from "react-navigation";

import routeConfigs from "../navigation/routeConfigs";
import Drawer from "./Drawer";

const AppNavigator = DrawerNavigator(routeConfigs, {
    contentComponent: Drawer,
    contentOptions: {
        activeTintColor: "#335252",
        activeBackgroundColor: "#d4dde1",
        inactiveTintColor: "#2d3033"
    }
});

export default AppNavigator;
