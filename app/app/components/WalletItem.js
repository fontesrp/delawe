import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import { prettyNumber } from "../lib/util";

const WalletItem = function (props) {

    return (
        <View style={ styles.container }>
            <View>
                <Text>
                    { props.date } { props.time }
                </Text>
                <Text>
                    Order No: { props.orderNumber }
                </Text>
            </View>
            <View>
                <Text>
                    { prettyNumber(props.credits) }
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
    }
});

export default WalletItem;
