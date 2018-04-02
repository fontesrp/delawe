import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import OrderInfo from "./OrderInfo";
import { snakeToTitle } from "../lib/util";

const PickupOrder = function (props) {

    return (
        <View style={ styles.container } >
            <View style={ styles.info }>
                <OrderInfo { ...props } />
            </View>
            <View style={ styles.status }>
                <Text style={ styles.statusText }>{ snakeToTitle(props.aasm_state) }</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: 350,
        paddingTop: 5,
        paddingBottom: 5
    },
    info: {
        flex: 0.65,
        justifyContent: "center",
        paddingLeft: 10
    },
    status: {
        flex: 0.35,
        justifyContent: "center",
        alignItems: "flex-start",
        borderLeftColor: "#d4dde1",
        borderLeftWidth: 1,
        paddingLeft: 5,
        marginLeft:5
    },
    statusText: {
        color: "#2d3033",
        textAlign: "center"
    }
});

export default PickupOrder;
