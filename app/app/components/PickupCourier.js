import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import { Icon } from "react-native-elements";

import OrderInfo from "./OrderInfo";
import { fullName, prettyDate, prettyTime } from "../lib/util";

const PickupCourier = function (props) {

    return (
        <View style={ styles.container } >
            <Text style={ styles.name }>
                { fullName(props.first_name, props.last_name) }
            </Text>
            <View style={ styles.detail }>
                <Icon name="pin-drop" color="#d4dde1" />
                <Text style={ styles.text }>{ props.distance.toFixed(1) } km</Text>
            </View>
            <View style={ styles.lastPickup }>
                <View style={ styles.detail }>
                    <Icon name={ "today" } color="#d4dde1" />
                    <Text style={ styles.text }>
                        { prettyDate(props.last_pickup) }
                    </Text>
                </View>
                <View style={ styles.detail }>
                    <Icon name={ "access-time" } color="#d4dde1" />
                    <Text style={ styles.text }>
                        { prettyTime(props.last_pickup) }
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 350,
        padding: 5
    },
    name: {
        color: "#2d3033",
        fontWeight: "bold"
    },
    detail: {
        flexDirection: "row",
        alignItems: "center"
    },
    text: {
        color: "#2d3033"
    },
    lastPickup: {
        flexDirection: "row"
    }
});

export default PickupCourier;
