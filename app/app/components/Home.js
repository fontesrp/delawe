import React, { Component } from "react";
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet
} from "react-native";
import MapView from "react-native-maps";

import MapMarker from "./MapMarker";

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
                latitude: this.props.userLatitude,
                longitude: this.props.userLongitude
            },
            name: this.props.userName,
            address: this.props.userAddress
        };

        const shownStatus = ["pending", "assigned"];

        return (
            <View>
                <MapView
                    provider="google"
                    region={region}
                    style={styles.map}
                    showsUserLocation
                    showsTraffic
                >
                    <MapMarker
                        type="store"
                        coords={store.coords}
                        calloutInfo={store}
                    />
                    {props
                        .orders
                        .filter(order => shownStatus.includes(order.status))
                        .map(order => (
                            <MapMarker
                                key={order.id}
                                type="client"
                                coords={order}
                                status={order.status}
                                calloutInfo={order}
                            />
                        ))
                    }
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        height: "100%",
        width: "100%"
    }
});

export default Home;
