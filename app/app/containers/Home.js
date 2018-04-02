import React, { Component } from "react";
import {
    View,
    StyleSheet
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import MapHome from "../components/MapHome";
import MapMarker from "../components/MapMarker";
import PickupBtn from "../components/PickupBtn";
import PickupModal from "../components/PickupModal";

class Home extends Component {

    constructor(props) {

        super(props);

        if (props.userEnableLocation) {
            navigator.geolocation.getCurrentPosition(this.geoSuccess.bind(this), this.geoFail.bind(this));
        }

        props.fetchCouriers();
        props.fetchOrders();

        this.state = {
            modalVisible: false
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

    displayModal(show) {
        this.setState({
            modalVisible: show
        });
    }

    onOrderSave(params) {
        this.props.newPickup(params);
    }

    render() {

        const { props } = this;

        return (
            <View style={ styles.container }>
                <MapHome { ...this.props } />
                <PickupModal
                    visible={ this.state.modalVisible }
                    hide={ this.displayModal.bind(this, false) }
                    orders={ props.orders }
                    couriers={ props.couriers }
                    onSave={ this.onOrderSave.bind(this) }
                    orderSaved={ props.requestsOrderSaved }
                    clearRequests={ props.clearRequests }
                />
                <PickupBtn
                    onPress={ this.displayModal.bind(this, true) }
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
