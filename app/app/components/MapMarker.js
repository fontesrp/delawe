import React from "react";
import {
    View,
    StyleSheet
} from "react-native";
import { Marker, Callout } from "react-native-maps";
import { Icon } from "react-native-elements";

import Order from "./Order";

const statusColor = function (status) {
    switch (status) {
    case "pending":
        return "yellow";
    case "assigned":
        return "#335252";
    }
};

const MapMarker = function (props) {

    const markerProps = {
        color: "",
        icon: "",
        title: "",
        description: "",
        callout: null
    };

    switch (props.type) {
    case "store":
        markerProps.color = "#aa4b41";
        markerProps.icon = "store";
        markerProps.title = props.calloutInfo.name;
        markerProps.description = props.calloutInfo.address;
        break;
    case "client":
        markerProps.color = statusColor(props.status);
        markerProps.icon = "shopping-cart";
        markerProps.callout = <Callout><Order { ...props.calloutInfo } /></Callout>;
        break;
    }

    const styles = StyleSheet.create({
        container: {
            alignItems: "center"
        },
        iconContainer: {
            backgroundColor: markerProps.color,
            padding: 10,
            borderRadius: 10
        },
        arrowDown: {
            width: 0,
            height: 0,
            borderLeftColor: "transparent",
            borderLeftWidth: 5,
            borderRightColor: "transparent",
            borderRightWidth: 5,
            borderTopColor: markerProps.color,
            borderTopWidth: 15
        }
    });

    return (
        <Marker
            coordinate={props.coords}
            title={markerProps.title}
            description={markerProps.description}
        >
            <View style={styles.container}>
                <Icon name={markerProps.icon} color="#d4dde1" containerStyle={styles.iconContainer} />
                <View style={styles.arrowDown} />
            </View>
            {markerProps.callout}
        </Marker>
    );
};

export default MapMarker;
