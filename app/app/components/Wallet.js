import React, { Component } from "react";
import {
    View,
    StyleSheet
} from "react-native";

import CreditCard from "./CreditCard";

class Wallet extends Component {

    render() {
        return (
            <View>
                <CreditCard />
            </View>
        );
    }
}

export default Wallet;
