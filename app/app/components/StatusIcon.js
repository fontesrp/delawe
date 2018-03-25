import React from "react";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

import { statusColor } from "../lib/helpers";

const StatusIcon = function (props) {

    const iconProps = {
        bgColor: statusColor(props.status),
        name: ""
    };

    switch (props.status) {
    case "canceled":
        iconProps.name = "highlight-off";
        break;
    case "pending":
        iconProps.name = "query-builder";
        break;
    case "assigned":
        iconProps.name = "directions-car";
        break;
    case "delivered":
        iconProps.name = "check-circle";
        break;
    }

    const styles = StyleSheet.create({
        container: {
            backgroundColor: iconProps.bgColor
        }
    });

    return (
        <Icon
            name={ iconProps.name }
            color="#d4dde1"
            containerStyle={ styles.container }
            raised
        />
    );
};

export default StatusIcon;
