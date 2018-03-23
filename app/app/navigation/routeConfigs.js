import React from "react";

import { createScreen } from "./screens";
import drawerIcon from "./drawerIcon";

const routeConfigs = {
    "Home": {
        screen: createScreen("Home"),
        navigationOptions: {
            drawerIcon: drawerIcon("home")
        }
    },
    "Profile": {
        screen: createScreen("Profile"),
        navigationOptions: {
            drawerIcon: drawerIcon("person")
        }
    }
};

export default routeConfigs;
