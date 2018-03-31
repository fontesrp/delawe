import React from "react";
import {
    View,
    StyleSheet
} from "react-native";
import { Marker, Callout } from "react-native-maps";
import { Icon } from "react-native-elements";

import Order from "./Order";
import { statusColor } from "../lib/helpers";
import { fullName, prettyDateTime } from "../lib/util";

const MapMarker = function (props) {

    const markerProps = {
        color: "",
        icon: "",
        title: "",
        description: "",
        callout: null
    };

    const { calloutInfo } = props;

    switch (props.type) {
    case "store":
        markerProps.color = "#aa4b41";
        markerProps.icon = "store";
        markerProps.title = calloutInfo.name;
        markerProps.description = calloutInfo.address;
        break;
    case "client":
        markerProps.color = statusColor(props.status);
        markerProps.icon = "shopping-cart";
        markerProps.callout = <Callout><Order { ...calloutInfo } /></Callout>;
        break;
    case "courier":
        markerProps.color = "#335252";
        markerProps.icon = "directions-car";
        markerProps.title = fullName(calloutInfo.first_name, calloutInfo.last_name);
        markerProps.description = `Last pickup: ${prettyDateTime(calloutInfo.last_pickup)}`;
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
            coordinate={ props.coords }
            title={ markerProps.title }
            description={ markerProps.description }
        >
            <View style={ styles.container }>
                <Icon name={ markerProps.icon } color="#d4dde1" containerStyle={ styles.iconContainer } />
                <View style={ styles.arrowDown } />
            </View>
            { markerProps.callout }
        </Marker>
    );
};

export default MapMarker;
