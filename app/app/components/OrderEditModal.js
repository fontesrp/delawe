import React, { Component } from "react";
import {
    Animated,
    StyleSheet,
    Text
} from "react-native";
import Modal from "react-native-modal";
import { Icon, Button } from "react-native-elements";

import PickupSelector from "./PickupSelector";
import PickupList from "./PickupList";
import { adjustedDistance } from "../lib/helpers";

const {
    Value,
    View
} = Animated;

class OrderEditModal extends Component {

    constructor(props) {

        super(props);

        this.state = {
            action: "",
            resultHeight: new Value(0),
            actionsHeight: new Value(175),
            actionsPadding: new Value(10),
            selectedCourier: this.findCourier(props)
        };
    }

    findCourier(props) {
        return props.couriers.find(cour => cour.id === props.order.courier_id) || {};
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            selectedCourier: this.findCourier(nextProps)
        })

        if (this.props.visible && this.props.orderSaved !== nextProps.orderSaved) {
            this.displaySuccess();
        }
    }

    resize(expand, listAnimation) {

        const delta = (expand)
            ? 90
            : -90;

        const finalHeight = this.state.actionsHeight._value + delta;

        Animated.parallel([
            Animated.timing(this.state.actionsHeight, {
                toValue: finalHeight + delta,
                duration: 250
            }),
            listAnimation
        ]).start();
    }

    toggleCouriers() {

        const display = !this.state.displayCouriers;

        const animation = (display)
            ? this.couriersList.expand()
            : this.couriersList.squash();

        this.resize(display, animation);

        this.setState({
            displayCouriers: display
        });
    }

    sortCouriers() {

        const couriers = this.props.couriers.slice();

        couriers.sort((a, b) => adjustedDistance(a) - adjustedDistance(b));

        return couriers;
    }

    onSelect(ignore, item) {
        this.toggleCouriers();
        this.setState({
            selectedCourier: item
        });
    }

    assign() {

        const { props } = this;

        props.updateOrder({
            order: { ...props.order },
            courier: this.state.selectedCourier
        });

        this.setState({
            action: "assigned"
        });
    }

    unassign() {

        const { props } = this;

        props.updateOrder({
            order: { ...props.order },
            courier: {}
        });

        this.setState({
            action: "unassigned"
        });
    }

    reassign() {

        const { props } = this;

        props.updateOrder({
            order: { ...props.order },
            courier: this.state.selectedCourier
        });

        this.setState({
            action: "reassigned"
        });
    }

    cancel() {

        const { props } = this;

        props.cancelOrder({ ...props.order });

        this.setState({
            action: "canceled"
        });
    }

    actions() {

        const { order } = this.props;
        const { state } = this;
        const buttons = [];

        switch (order.aasm_state) {
        case "pending":
            buttons.push({
                name: "assign",
                title: "Assign",
                backgroundColor: "#a4cabc",
                onPress: this.assign.bind(this)
            });
            break;
        case "assigned":
            if (state.selectedCourier.id === order.courier_id) {
                buttons.push({
                    name: "unassign",
                    title: "Unassign",
                    backgroundColor: "#eab364",
                    onPress: this.unassign.bind(this)
                });
            } else {
                buttons.push({
                    name: "reassign",
                    title: "Reassign",
                    backgroundColor: "#a4cabc",
                    onPress: this.reassign.bind(this)
                });
            }
            break;
        }

        buttons.push({
            name: "cancel",
            title: "Cancel Order",
            backgroundColor: "#b2473e",
            onPress: this.cancel.bind(this)
        });

        return buttons;
    }

    displaySuccess() {

        const stretch = this.state.actionsHeight._value;
        const hide = 0;
        const duration = 500;

        Animated.parallel([
            Animated.timing(this.state.actionsHeight, {
                toValue: 0,
                duration
            }),
            Animated.timing(this.state.actionsPadding, {
                toValue: 0,
                duration
            }),
            Animated.timing(this.state.resultHeight, {
                toValue: stretch,
                duration
            })
        ]).start();

        setTimeout(() => {
            this.props.hide();
            this.props.clearRequests();
            setTimeout(() => {
                this.state.actionsHeight.setValue(stretch);
                this.state.actionsPadding.setValue(10);
                this.state.resultHeight.setValue(hide);
            }, 300);
        }, duration + 300);
    }

    onHide() {
        this.setState
    }

    render() {

        const { props, state } = this;

        const resultStyle = [
            styles.result,
            {
                height: state.resultHeight
            }
        ];

        const actionsStyle = [
            styles.container,
            {
                height: state.actionsHeight,
                padding: state.actionsPadding
            }
        ];

        return (
            <Modal
                isVisible={ props.visible }
                onBackdropPress={ props.hide }
            >
                <View style={ resultStyle }>
                    <Icon
                        name="check"
                        size={ 64 }
                        color="#d4dde1"
                    />
                    <Text style={ styles.resultText }>Order { state.action }</Text>
                </View>
                <View style={ actionsStyle }>
                    <PickupSelector
                        name="Courier"
                        onPress={ this.toggleCouriers.bind(this) }
                        value={ state.selectedCourier }
                        type="courier"
                    />
                    <PickupList
                        ref={ list => this.couriersList = list }
                        data={ this.sortCouriers() }
                        type="couriers"
                        onSelect={ this.onSelect.bind(this) }
                    />
                    { !props.orderSaved && this.actions().map(btn => (
                        <Button
                            key={ btn.name }
                            title={ btn.title }
                            backgroundColor={ btn.backgroundColor }
                            containerViewStyle={ styles.action }
                            onPress={ btn.onPress }
                            color="#2d3033"
                            fontWeight="bold"
                        />
                    )) }
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderRadius: 10
    },
    result: {
        backgroundColor: "#a4cabc",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    resultText: {
        color: "#d4dde1",
        fontWeight: "bold",
        fontSize: 32
    },
    action: {
        marginLeft: 6,
        marginRight: 6,
        marginTop: 10
    }
});

export default OrderEditModal;
