import React, { Component } from "react";
import { StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import MapMarker from "../components/MapMarker";

class MapHome extends Component {

    constructor(props) {

        super(props);

        this.markers = {};
        this.map = null;
    }

    showMarkerCallout(orderId) {

        const marker = this.markers[orderId];

        if (marker) {
            marker.showCallout();
        }
    }

    componentWillReceiveProps(nextProps, state) {

        const { props } = this;
        let coords;

        if (
            props.userLatitude !== nextProps.userLatitude ||
            props.userLongitude !== nextProps.userLongitude
        ) {

            coords = {
                latitude: nextProps.userLatitude,
                longitude: nextProps.userLongitude
            };
        } else if (
            nextProps.requestsOrderSaved &&
            nextProps.requestsOrderSaved.latitude &&
            nextProps.requestsOrderSaved.longitude
        ) {

            coords = {
                latitude: nextProps.requestsOrderSaved.latitude,
                longitude: nextProps.requestsOrderSaved.longitude
            };

            if (nextProps.requestsOrderSaved.aasm_state !== "canceled") {
                this.showMarkerCallout(nextProps.requestsOrderSaved.id);
            }
        }

        if (coords) {
            this.map.animateToCoordinate(coords, 300);
        }
    }

    onMarkerPress(props) {

        const { coords } = props;

        console.log("coords", coords);

        this.map.animateToCoordinate({
            latitude: coords.latitude,
            longitude: coords.longitude
        }, 300);
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

        const currLoc = props.userCurrentLocation;

        const shownStatus = ["pending", "assigned"];

        const initialRegion = {
            latitude: props.userLatitude,
            longitude: props.userLongitude,
            latitudeDelta: 0.0231,
            longitudeDelta: 0.0106
        };

        return (
            <MapView
                ref={ map => this.map = map }
                provider={ PROVIDER_GOOGLE }
                initialRegion={ initialRegion }
                style={ styles.map }
                showsUserLocation={ (currLoc.latitude !== null) }
                onMapReady={ () => this.map.animateToRegion(initialRegion, 500) }
                showsTraffic
                showsMyLocationButton
            >
                <MapMarker
                    type="store"
                    coords={ store.coords }
                    calloutInfo={ store }
                    onPress={ this.onMarkerPress.bind(this) }
                />
                { props
                    .couriers
                    .map(courier => (
                        <MapMarker
                            key={ courier.id }
                            type="courier"
                            coords={ courier }
                            calloutInfo={ courier }
                            onPress={ this.onMarkerPress.bind(this) }
                        />
                    ))
                }
                { props
                    .orders
                    .filter(order => shownStatus.includes(order.aasm_state))
                    .map(order => (
                        <MapMarker
                            key={ order.id }
                            addRef={ mkr => this.markers[order.id] = mkr }
                            type="client"
                            coords={ order }
                            status={ order.aasm_state }
                            calloutInfo={ order }
                            onOrderEdit={ props.onOrderEdit }
                            onPress={ this.onMarkerPress.bind(this) }
                        />
                    ))
                }
            </MapView>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        height: "92%",
        width: "100%"
    }
});

export default MapHome;
