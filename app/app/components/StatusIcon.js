import React from "react";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

const StatusIcon = function (props) {

    const iconProps = {
        bgColor: "",
        name: ""
    };

    switch (props.status) {
    case "canceled":
        iconProps.bgColor = "red";
        iconProps.name = "highlight-off";
        break;
    case "pending":
        iconProps.bgColor = "yellow";
        iconProps.name = "query-builder";
        break;
    case "assigned":
        iconProps.bgColor = "#335252";
        iconProps.name = "directions-car";
        break;
    case "delivered":
        iconProps.bgColor = "green";
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
            name={iconProps.name}
            color="#d4dde1"
            containerStyle={styles.container}
            raised
        />
    );
};

export default StatusIcon;
