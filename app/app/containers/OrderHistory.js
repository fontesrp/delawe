import React, { Component } from "react";
import {
    FlatList,
    View,
    StyleSheet
} from "react-native";
import { Divider } from "react-native-elements";

import Order from "../components/Order";

class OrderHistory extends Component {

    renderItem({ item, index }) {
        return (
            <View style={ styles.item }>
                <Order key={ index } { ...item } />
            </View>
        );
    }

    renderSeparator() {
        return (
            <Divider style={ styles.divider } />
        );
    }

    render() {
        return (
            <FlatList
                data={ this.props.orders }
                renderItem={ this.renderItem }
                ItemSeparatorComponent={ this.renderSeparator }
            />
        );
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: "white",
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: "center"
    },
    divider: {
        height: 5,
        backgroundColor: "#d4dde1"
    }
});

export default OrderHistory;
