import React, { Component } from "react";
import {
    View,
    FlatList,
    Text,
    StyleSheet
} from "react-native";
import Modal from "react-native-modal";
import { Button } from "react-native-elements";

import PickupSelector from "./PickupSelector";
import PickupList from "./PickupList";

class PickupModal extends Component {

    constructor(props) {

        super(props);

        this.state = {
            displayOrders: false
        };
    }

    toggleOrders() {

        const display = !this.state.displayOrders;

        if (display) {
            this.ordersList.expand();
        } else {
            this.ordersList.squash();
        }

        this.setState({
            displayOrders: display
        });
    }

    sortOrders() {

        const shownStatus = ["pending", "assigned"];

        const orders = this.props.orders.filter(ord => shownStatus.includes(ord.aasm_state));

        orders.sort(function (a, b) {

            if (a.aasm_state === b.aasm_state) {

                if (a.created_at < b.created_at) {
                    return -1;
                }

                if (a.created_at > b.created_at) {
                    return 1;
                }

                return 0;
            }

            if (a.aasm_state === "pending") {
                return -1;
            }

            return 1;
        });

        return orders;
    }

    render() {

        const { props } = this;

        const selectorIcon = {
            name: "arrow-drop-down",
            color: "black",
            style: styles.selectorIcon
        };

        const ordersStyle = this.state.displayOrders ? { height: 180 } : { height: 0 };

        // onSwipe={ props.hide }
        // swipeDirection="down"

        return (
            <Modal
                isVisible={ props.visible }
                onBackdropPress={ props.hide }
            >
                <View style={ styles.container }>
                    <PickupSelector
                        name="New Order"
                        onPress={ this.toggleOrders.bind(this) }
                    />
                    <PickupList
                        ref={ list => this.ordersList = list }
                        data={ this.sortOrders() }
                    />
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10
    }
});

export default PickupModal;
