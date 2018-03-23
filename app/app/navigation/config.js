import React from "react";
import {
    View
} from "react-native";

import { createScreen } from "./screens";
import drawerIcon from "./icon";

const routeConfigs = {
    "Home": {
        screen: createScreen("Home"),
        navigationOptions: {
            drawerIcon: drawerIcon("home")
        }
    },
    "Profile": {
        screen: createScreen("Profile")
    }
};

export default routeConfigs;
