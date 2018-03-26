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
    },
    "My Wallet": {
        screen: createScreen("Wallet"),
        navigationOptions: {
            drawerIcon: drawerIcon("account-balance-wallet")
        }
    }
};

export default routeConfigs;
