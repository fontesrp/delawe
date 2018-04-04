import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import CreditCard from "./CreditCard";
import { prettyNumber } from "../lib/util";

const WalletHeader = function (props) {

    return (
        <View style={ styles.container }>
            <View style={ styles.balanceContainer }>
                <Text style={ styles.balanceTitle }>
                    CURRENT BALANCE
                </Text>
                <Text style={ styles.balance }>
                    { prettyNumber(props.walletBalance) }
                </Text>
            </View>
            <CreditCard
                { ...props.walletCreditCard }
                onChange={ props.updateCreditCard }
                onSave={ props.addCredit }
                clearCard={ props.clearCard }
            />
            <Text style={ styles.history }>
                Credit History
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10
    },
    balanceContainer: {
        alignItems: "center",
        marginTop: 10
    },
    balanceTitle: {
        color: "#2d3033"
    },
    balance: {
        color: "#2d3033",
        fontWeight: "800",
        fontSize: 28
    },
    history: {
        color: "#2d3033",
        fontWeight: "bold",
        marginTop: 40,
        marginLeft: 10,
        fontSize: 18
    }
});

export default WalletHeader;
