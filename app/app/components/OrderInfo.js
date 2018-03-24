import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import OrderDetail from "./OrderDetail";

const OrderInfo = function (props) {

    return (
        <View>
            <Text style={styles.number}>{props.orderNumber}</Text>
            <Text>{props.courierName}</Text>
            <Text>{props.address}</Text>
            <View style={styles.details}>
                <View>
                    <OrderDetail type="date" {...props} />
                    <OrderDetail type="distance" {...props} />
                </View>
                <View>
                    <OrderDetail type="time" {...props} />
                    <OrderDetail type="credits" {...props} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    number: {
        fontWeight: "bold"
    },
    details: {
        flexDirection: "row"
    }
});

export default OrderInfo;
