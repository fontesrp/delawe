import React, { Component } from "react";
import {
    Animated,
    StyleSheet
} from "react-native";
import Modal from "react-native-modal";
import {
    ActionsContainer,
    Button,
    FieldsContainer,
    Fieldset,
    Form
} from "react-native-clean-form";

import PickupSelector from "./PickupSelector";
import PickupList from "./PickupList";
import PickupField from "./PickupField";
import { setFormTheme, getProvinces, adjustedDistance } from "../lib/helpers";
import { breakupAddress, joinAddress } from "../lib/util";

setFormTheme();

class PickupModal extends Component {

    constructor(props) {

        super(props);

        this.state = {
            displayOrders: false,
            displayCouriers: false,
            height: new Animated.Value(420),
            selectedOrder: {},
            selectedCourier: {},
            form: {
                value: "",
                streetAddress: "",
                city: "",
                province: ""
            }
        };
    }

    resize(expand, listAnimation) {

        const delta = (expand)
            ? 90
            : -90;

        const finalHeight = this.state.height._value + delta;

        Animated.parallel([
            Animated.timing(this.state.height, {
                toValue: finalHeight + delta,
                duration: 250
            }),
            listAnimation
        ]).start();
    }

    toggleOrders() {

        const display = !this.state.displayOrders;

        const animation = (display)
            ? this.ordersList.expand()
            : this.ordersList.squash();

        this.resize(display, animation);

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

    onSelect(type, item) {

        let newState;

        if (type === "orders") {

            newState = {
                selectedOrder: item
            };

            newState.selectedCourier = (item.courier_id)
                ? this.props.couriers.find(cour => cour.id === item.courier_id)
                : {};

            this.toggleOrders();
        } else {

            newState = {
                selectedCourier: item
            };

            this.toggleCouriers();
        }

        this.setState(newState);
    }

    onInputChange(input) {
        this.setState({
            form: {
                ...this.state.form,
                ...input
            }
        });
    }

    onSave() {

        const { state } = this;
        const { form } = state;

        this.props.onSave({
            order: state.selectedOrder,
            courier: state.selectedCourier,
            form: {
                value: form.value,
                address: joinAddress(form)
            }
        });
    }

    render() {

        const { props } = this;

        const { selectedOrder, selectedCourier } = this.state;
        const { address = "" } = selectedOrder;
        const addressProps = breakupAddress(address);

        const fields = [
            {
                name: "value",
                type: "number",
                label: "Credits",
                placeholder: "5.73",
                value: String(selectedOrder.value || "")
            }, {
                name: "streetAddress",
                label: "Street Address",
                placeholder: "142 W Hastings St",
                value: addressProps.streetAddress
            }, {
                name: "city",
                label: "City",
                placeholder: "Vancouver",
                value: addressProps.city
            }, {
                name: "province",
                type: "select",
                label: "Province",
                placeholder: "BC",
                options: getProvinces(),
                value: addressProps.province
            }
        ];

        return (
            <Modal
                isVisible={ props.visible }
                onBackdropPress={ props.hide }
            >
                <Animated.View style={ [styles.container, { height: this.state.height }] }>
                    <Form>
                        <FieldsContainer>
                            <PickupSelector
                                name="New Order"
                                onPress={ this.toggleOrders.bind(this) }
                                value={ selectedOrder }
                                type="order"
                            />
                            <PickupList
                                ref={ list => this.ordersList = list }
                                data={ this.sortOrders() }
                                type="orders"
                                onSelect={ this.onSelect.bind(this) }
                            />
                            <Fieldset last>
                                { fields.map(fld => (
                                    <PickupField
                                        key={ fld.name }
                                        { ...fld }
                                        onInputChange={ this.onInputChange.bind(this) }
                                    />
                                )) }
                            </Fieldset>
                            <PickupSelector
                                name="Courier"
                                onPress={ this.toggleCouriers.bind(this) }
                                value={ selectedCourier }
                                type="courier"
                            />
                            <PickupList
                                ref={ list => this.couriersList = list }
                                data={ this.sortCouriers() }
                                type="couriers"
                                onSelect={ this.onSelect.bind(this) }
                            />
                        </FieldsContainer>
                        <ActionsContainer>
                            <Button onPress={ this.onSave.bind(this) }>Save</Button>
                        </ActionsContainer>
                    </Form>
                </Animated.View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10
    }
});

export default PickupModal;
