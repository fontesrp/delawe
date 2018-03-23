import React from "react";

import { Icon } from "react-native-elements";

const drawerIcon = function (name) {
    return props => (
        <Icon
            name={name}
            color={props.tintColor}
        />
    );
};

export default drawerIcon;
