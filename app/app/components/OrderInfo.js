import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import OrderDetail from "./OrderDetail";
import { fullName } from "../lib/util";

const OrderInfo = function (props) {

    return (
        <View>
            <Text style={ styles.number }>{ props.id }</Text>
            <Text style={ styles.text }>
                { fullName(props.courier_first_name, props.courier_last_name) }
            </Text>
            <Text style={ styles.text }>{ props.address }</Text>
            <View style={ styles.details }>
                <View>
                    <OrderDetail type="date" { ...props } />
                    <OrderDetail type="distance" { ...props } />
                </View>
                <View>
                    <OrderDetail type="time" { ...props } />
                    <OrderDetail type="credits" { ...props } />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    number: {
        fontWeight: "bold",
        color: "#2d3033"
    },
    details: {
        flexDirection: "row"
    },
    text: {
        color: "#2d3033"
    }
});

export default OrderInfo;
