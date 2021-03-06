import React, { Component } from "react";
import {
    FlatList,
    StyleSheet
} from "react-native";
import { Divider } from "react-native-elements";

import WalletHeader from "../components/WalletHeader";
import WalletItem from "../components/WalletItem";

class Wallet extends Component {

    renderHeader() {
        return (
            <WalletHeader key="header" { ...this.props } />
        );
    }

    renderItem(itemProps) {
        return (
            <WalletItem key={ itemProps.index } { ...itemProps.item } />
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
                style={ styles.container }
                data={ this.props.orders }
                ListHeaderComponent={ this.renderHeader.bind(this) }
                ItemSeparatorComponent={ this.renderSeparator }
                renderItem={ this.renderItem }
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#d4dde1"
    },
    divider: {
        marginLeft: 10,
        marginRight: 10
    }
});

export default Wallet;
