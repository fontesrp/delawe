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
                <CreditCard
                    { ...this.props.walletCreditCard }
                    onChange={ this.props.updateCreditCard }
                    onSave={ this.props.addCredit }
                    clearCard={ this.props.clearCard }
                />
            </View>
        );
    }
}

export default Wallet;
