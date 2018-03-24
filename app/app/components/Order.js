import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import { Callout } from "react-native-maps";

import StatusIcon from "./StatusIcon";
import OrderInfo from "./OrderInfo";

const Order = function (props) {

    return (
        <View style={styles.container} >
            <View style={styles.icon}>
                <StatusIcon status={props.status} />
            </View>
            <View style={styles.info}>
                <OrderInfo { ...props } />
            </View>
            <View style={styles.status}>
                <Text>{props.status}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: 350
    },
    icon: {
        flex: 0.2,
        justifyContent: "center",
        alignItems: "center"
    },
    info: {
        flex: 0.6,
        justifyContent: "center",
        alignItems: "center"
    },
    status: {
        flex: 0.2,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default Order;
