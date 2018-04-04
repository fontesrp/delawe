import React, { Component } from "react";
import {
    View,
    StyleSheet
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import MapHome from "../components/MapHome";
import PickupBtn from "../components/PickupBtn";
import PickupModal from "../components/PickupModal";
import OrderEditModal from "../components/OrderEditModal";

import CourierMapHome from "../components/courier/MapHome";

class Home extends Component {

    constructor(props) {

        super(props);

        if (props.userEnableLocation) {
            navigator.geolocation.getCurrentPosition(this.geoSuccess.bind(this), this.geoFail.bind(this));
        }

        this.state = {
            pickupVisible: false,
            orderEditVisible: false,
            selectedOrder: {}
        };
    }

    geoSuccess({ coords }) {
        this.props.updateLocation({
            currentLocation: {
                latitude: coords.latitude,
                longitude: coords.longitude
            }
        });
    }

    geoFail() {
        this.props.updateLocation({
            enableLocation: false
        });
    }

    displayPickup(show) {
        this.setState({
            pickupVisible: show
        });
    }

    displayOrderEdit(show) {
        this.setState({
            orderEditVisible: show
        });
    }

    onOrderEdit(order) {
        this.setState({
            selectedOrder: order
        });
        this.displayOrderEdit(true);
    }

    render() {

        const { props, state } = this;

        if (props.userUserType === "courier") {
            return (
                <View style={ styles.container }>
                    <CourierMapHome { ...props } />
                </View>
            );
        }

        return (
            <View style={ styles.container }>
                <MapHome
                    { ...props }
                    onOrderEdit={ this.onOrderEdit.bind(this) }
                />
                <PickupModal
                    visible={ state.pickupVisible }
                    hide={ this.displayPickup.bind(this, false) }
                    orders={ props.orders }
                    couriers={ props.couriers }
                    onSave={ props.newPickup }
                    orderSaved={ props.requestsOrderSaved }
                    clearRequests={ props.clearRequests }
                />
                <OrderEditModal
                    visible={ state.orderEditVisible }
                    hide={ this.displayOrderEdit.bind(this, false) }
                    order={ state.selectedOrder }
                    couriers={ props.couriers }
                    updateOrder={ props.newPickup }
                    cancelOrder={ props.cancelOrder }
                    clearRequests={ props.clearRequests }
                    orderSaved={ props.requestsOrderSaved }
                />
                <PickupBtn
                    onPress={ this.displayPickup.bind(this, true) }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default Home;
