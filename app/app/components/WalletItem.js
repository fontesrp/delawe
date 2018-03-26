import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import dateFns from "date-fns";

import { prettyNumber } from "../lib/util";

const WalletItem = function (props) {

    const date = new Date(`${props.date}T${props.time}Z`);

    return (
        <View style={ styles.container }>
            <View>
                <Text style={ styles.date }>
                    { dateFns.format(date, "D MMM YYYY HH:mm a") }
                </Text>
                <Text style={ styles.orderNumber }>
                    Order No: { props.orderNumber }
                </Text>
            </View>
            <View style={ styles.creditsContainer }>
                <Text style={ styles.credits }>
                    { (props.orderType === "expense") ? "-" : null } { prettyNumber(props.credits) }
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        marginRight: 10,
        marginLeft: 10,
        padding: 10
    },
    date: {
        color: "#2d3033",
        marginBottom: 5
    },
    orderNumber: {
        color: "#2d3033",
        fontSize: 12,
        fontWeight: "100"
    },
    creditsContainer: {
        justifyContent: "center"
    },
    credits: {
        color: "#2d3033",
        fontSize: 18
    }
});

export default WalletItem;
