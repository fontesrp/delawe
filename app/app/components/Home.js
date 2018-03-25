import React, { Component } from "react";
import {
    View,
    StyleSheet
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import MapMarker from "./MapMarker";
import PickupBtn from "./PickupBtn";

class Home extends Component {

    constructor(props) {

        super(props);

        this.state = {
            currentLoc: {
                latitude: props.userLatitude,
                longitude: props.userLongitude
            }
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(this.geoSuccess.bind(this));
    }

    geoSuccess({ coords }) {
        this.setState({
            currentLoc: {
                latitude: coords.latitude,
                longitude: coords.longitude
            }
        });
    }

    render() {

        const { props } = this;

        const region = {
            ...this.state.currentLoc,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        };

        const store = {
            coords: {
                latitude: props.userLatitude,
                longitude: props.userLongitude
            },
            name: props.userName,
            address: props.userAddress
        };

        const shownStatus = ["pending", "assigned"];

        return (
            <View style={ styles.container }>
                <MapView
                    provider={ PROVIDER_GOOGLE }
                    region={ region }
                    style={ styles.map }
                    showsUserLocation
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
                        .filter(order => shownStatus.includes(order.status))
                        .map(order => (
                            <MapMarker
                                key={ order.id }
                                type="client"
                                coords={ order }
                                status={ order.status }
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
