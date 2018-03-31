import React, { Component } from "react";
import {
    View,
    StyleSheet
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import MapMarker from "../components/MapMarker";
import PickupBtn from "../components/PickupBtn";

class Home extends Component {

    constructor(props) {

        super(props);

        if (props.userEnableLocation) {
            navigator.geolocation.getCurrentPosition(this.geoSuccess.bind(this), this.geoFail.bind(this));
        }

        props.fetchCouriers();
        props.fetchOrders();
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

    render() {

        const { props } = this;

        const store = {
            coords: {
                latitude: props.userLatitude,
                longitude: props.userLongitude
            },
            name: props.userBusinessName,
            address: props.userAddress
        };

        const region = {
            ...store.coords,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        };

        const currLoc = props.userCurrentLocation;

        const shownStatus = ["pending", "assigned"];

        return (
            <View style={ styles.container }>
                <MapView
                    provider={ PROVIDER_GOOGLE }
                    region={ region }
                    style={ styles.map }
                    showsUserLocation={ (currLoc.latitude !== null) }
                    showsTraffic
                >
                    <MapMarker
                        type="store"
                        coords={ store.coords }
                        calloutInfo={ store }
                    />
                    { props
                        .couriers
                        .map(courier => (
                            <MapMarker
                                key={ courier.id }
                                type="courier"
                                coords={ courier }
                                calloutInfo={ courier }
                            />
                        ))
                    }
                    { props
                        .orders
                        .filter(order => shownStatus.includes(order.aasm_state))
                        .map(order => (
                            <MapMarker
                                key={ order.id }
                                type="client"
                                coords={ order }
                                status={ order.aasm_state }
                                calloutInfo={ order }
                            />
                        ))
                    }
                </MapView>
                <PickupBtn />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        height: "92%",
        width: "100%"
    }
});

export default Home;
