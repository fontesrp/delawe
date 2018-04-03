import React, { Component } from "react";
import { StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import MapMarker from "../components/MapMarker";

class MapHome extends Component {

    constructor(props) {

        super(props);

        this.markers = {};

        this.state = {
            region: {
                latitude: props.userLatitude,
                longitude: props.userLongitude,
                latitudeDelta: 0.02031,
                longitudeDelta: 0.01053
            }
        };
    }

    showMarkerCallout(orderId) {

        const marker = this.markers[orderId];

        if (marker) {
            marker.showCallout();
        }
    }

    componentWillReceiveProps(nextProps) {

        const { props } = this;
        let region;

        if (
            props.userLatitude !== nextProps.userLatitude ||
            props.userLongitude !== nextProps.userLongitude
        ) {

            region = {
                ...this.state.region,
                latitude: nextProps.userLatitude,
                longitude: nextProps.userLongitude
            };

            this.setState({ region });
        } else if (
            nextProps.requestsOrderSaved &&
            nextProps.requestsOrderSaved.latitude &&
            nextProps.requestsOrderSaved.longitude
        ) {

            region = {
                ...this.state.region,
                latitude: nextProps.requestsOrderSaved.latitude,
                longitude: nextProps.requestsOrderSaved.longitude
            };

            if (nextProps.requestsOrderSaved.aasm_state !== "canceled") {
                this.showMarkerCallout(nextProps.requestsOrderSaved.id);
            }

            this.setState({ region });
        }
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

        return (
            <MapView
                provider={ PROVIDER_GOOGLE }
                region={ this.state.region }
                style={ styles.map }
                showsUserLocation={ (currLoc.latitude !== null) }
                showsTraffic
                showsMyLocationButton
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
                            addRef={ mkr => this.markers[order.id] = mkr }
                            type="client"
                            coords={ order }
                            status={ order.aasm_state }
                            calloutInfo={ order }
                            onOrderEdit={ props.onOrderEdit }
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
