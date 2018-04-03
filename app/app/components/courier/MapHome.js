import React, { Component } from "react";
import {
    ActionSheetIOS,
    Alert,
    Linking,
    StyleSheet
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import MapMarker from "../MapMarker";

class MapHome extends Component {

    constructor(props) {

        super(props);

        this.markers = [];

        const currLoc = props.userCurrentLocation;

        this.state = {
            region: {
                latitude: currLoc.latitude || props.storeLatitude,
                longitude: currLoc.longitude || props.storeLongitude,
                latitudeDelta: 0.02031,
                longitudeDelta: 0.01053
            }
        };
    }

    componentWillReceiveProps(nextProps) {

        const prevLoc = this.props.userCurrentLocation;
        const nextLoc = nextProps.userCurrentLocation;

        if (prevLoc.latitude !== nextLoc.latitude || prevLoc.longitude !== nextLoc.longitude) {
            this.setState({
                region: {
                    ...this.state.region,
                    ...nextLoc
                }
            });
        }
    }

    getStoreProps() {

        const { props } = this;
        const store = /^store/;
        const storeProps = {};

        Object
            .keys(props)
            .filter(prop => store.test(prop))
            .forEach(function (prop) {
                name = prop.replace(store, "");
                name = name.charAt(0).toLowerCase() + name.slice(1);
                storeProps[name] = props[prop];
            });

        storeProps.name = storeProps.businessName;

        return storeProps;
    }

    navProvider(url) {

        return Linking
            .canOpenURL(url)
            .then(function (can) {
                if (can) {
                    Linking.openURL(url);
                    return true;
                }
                return false;
            });
    }

    openNav(coords) {

        const addr = coords.join(",");
        const waze = `waze://?ll=${addr}&navigate=yes`;
        const google = `comgooglemaps://?daddr=${addr}`;
        const apple = `https://maps.apple.com/maps?daddr=${addr}`;

        const providers = [waze, google, apple];
        const { navProvider } = this;
        let idx = -1;

        const tryProvider = function tryProvider(success) {

            idx += 1;

            if (!success && idx < providers.length) {
                navProvider(providers[idx]).then(tryProvider);
            }
        };

        tryProvider(false);
    }

    findMarker(orderId) {
        this.markers = this.markers.filter(mkr => mkr !== null);
        return this.markers.find(mkr => mkr.props.orderId === orderId);
    }

    orderPickedUp(order) {

        this.findMarker(order.id).showCallout();

        const actions = [
            {
                text: "Go",
                onPress: this.openNav.bind(this, [order.latitude, order.longitude])
            }, {
                text: "Cancel",
                style: "cancel"
            }
        ];

        Alert.alert(
            "Order pickup",
            "The order is now On Transit. Go to its address?",
            actions
        )
    }

    onDeliver(order) {

        Alert.alert(
            "Awesome!",
            `The order is now delivered and you received ${order.value} credits!`,
            [{ text: "Ok" }]
        );
    }

    onCancel(order) {
        Alert.alert(
            "Order canceled!",
            `The order #${order.id} was canceled.`,
            [{ text: "Ok" }]
        );
    }

    cancelOrder(order) {

        const actions = [
            {
                text: "Yes",
                onPress: this.props.cancelOrder.bind(null, order, this.onCancel.bind(this, order)),
                style: "destructive"
            }, {
                text: "No",
                style: "cancel"
            }
        ];

        Alert.alert(
            "Cancel order",
            "Are you sure you want to cancel the order? This action cannot be undone.",
            actions
        )
    }

    onActionSelect(order, actions, idx) {

        // If pressed button was Cancel
        if (idx >= actions.length) {
            return;
        }

        const option = actions[idx].value;

        const { props } = this;

        switch (option) {
        case "navigate_store":
            this.openNav([props.storeLatitude, props.storeLongitude]);
            break;
        case "navigate_order":
            this.openNav([order.latitude, order.longitude]);
            break;
        case "pickup":
            const marker = this.findMarker(order.id);
            props.collectOrder(order, this.orderPickedUp.bind(this, order));
            marker.hideCallout();
            break;
        case "deliver":
            props.deliverOrder(order, this.onDeliver.bind(this, order));
            break;
        case "cancel":
            this.cancelOrder(order);
            break;
        }
    }

    onOrderEdit(order) {

        let actions;

        if (order.aasm_state === "assigned") {
            actions = [
                {
                    label: "Go to Store",
                    value: "navigate_store"
                }, {
                    label: "Pickup",
                    value: "pickup"
                }
            ];
        } else {
            actions = [
                {
                    label: "Go to Address",
                    value: "navigate_order"
                }, {
                    label: "Delivered",
                    value: "deliver"
                }, {
                    label: "Cancel Order",
                    value: "cancel"
                }
            ];
        }

        const options = {
            options: actions.map(act => act.label).concat(["Cancel"]),
            cancelButtonIndex: actions.length
        };

        ActionSheetIOS.showActionSheetWithOptions(
            options,
            this.onActionSelect.bind(this, order, actions)
        );
    }

    onMarkerPress(props) {

        const { coords } = props;

        this.setState({
            region: {
                ...this.state.region,
                latitude: coords.latitude,
                longitude: coords.longitude
            }
        });
    }

    render() {

        const { props } = this;

        const currLoc = props.userCurrentLocation;

        const shownStatus = ["assigned", "on_transit"];

        const store = this.getStoreProps();

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
                    coords={ store }
                    calloutInfo={ store }
                    onPress={ this.onMarkerPress.bind(this) }
                />
                { props
                    .orders
                    .filter(order => shownStatus.includes(order.aasm_state))
                    .map(order => (
                        <MapMarker
                            key={ order.id }
                            addRef={ mkr => this.markers.push(mkr) }
                            type="client"
                            coords={ order }
                            status={ order.aasm_state }
                            calloutInfo={ order }
                            onOrderEdit={ this.onOrderEdit.bind(this) }
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
        // height: "92%",
        flex: 1,
        width: "100%"
    }
});

export default MapHome;
