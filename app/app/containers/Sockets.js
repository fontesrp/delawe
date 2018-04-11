import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { ActionCreators } from "../actions";
import { createCable, subscribe } from "../lib/actionCable";

class Sockets extends Component {

    constructor(props) {

        super(props);

        this.state = {
            cable: null,
            subscriptions: null,
            watchId: null
        };
    }

    componentDidMount() {

        const { props } = this;

        this.setupSubscriptions(props);
        this.setupTracking(props.user.enableLocation);
    }

    componentWillReceiveProps(nextProps) {
        this.setupTracking(nextProps.user);
        this.handleSessionChange(nextProps);
    }

    componentWillUnmount() {
        this.setupTracking(false);
        this.unsubscribe();
    }

    handleSessionChange(nextProps) {

        const nextJwt = nextProps.session.jwt;
        const prevJwt = this.props.session.jwt;

        if (nextJwt !== prevJwt) {

            this.setupSubscriptions(nextProps);

            if (nextJwt === "") {
                this.setupTracking(false);
            }
        }
    }

    setupSubscriptions(props) {

        const subscribed = (this.state.cable !== null);

        if (subscribed && props.session.jwt === "") {
            this.unsubscribe();
        } else if (!subscribed && props.session.jwt !== "") {
            this.subscribe(props);
        }
    }

    subscribe(props) {

        const cable = createCable(props.session.jwt);
        const subscriptions = subscribe(cable, {
            onCourierReceived: props.receiveCourier,
            onOrderReceived: props.receiveOrder,
            onTransactionReceived: props.receiveTransaction,
            onUserReceived: props.receiveUser
        });

        this.setState({
            cable,
            subscriptions
        });
    }

    unsubscribe() {

        const { cable, subscriptions } = this.state;

        if (subscriptions) {
            Object.keys(subscriptions).forEach(key => subscriptions[key].unsubscribe());
        }

        if (cable) {
            cable.disconnect();
        }

        this.setState({
            cable: null,
            subscriptions: null
        });
    }

    setupTracking(user) {

        const enable = (user.user_type === "courier" && user.enableLocation);
        const tracking = (this.state.watchId !== null);

        if (enable && !tracking || !enable && tracking) {
            this.toggleTracking();
        }
    }

    toggleTracking() {

        let { watchId } = this.state;

        if (watchId !== null) {

            navigator.geolocation.clearWatch(watchId);

            this.setState({
                watchId: null
            });
        } else {

            navigator.geolocation.requestAuthorization();
            navigator.geolocation.getCurrentPosition(() => {

                const dumb = () => {};

                watchId = navigator.geolocation.watchPosition(this.onPositionChange.bind(this), dumb, {
                    distanceFilter: 100
                });

                this.setState({ watchId });
            });
        }
    }

    onPositionChange(position) {

        const { subscriptions } = this.state;

        if (!subscriptions) {
            return;
        }

        const { latitude, longitude } = position.coords;

        console.log("sending coords", latitude, longitude);

        subscriptions.user.send({
            latitude,
            longitude
        });
    }

    render() {
        return null;
    }
}

const mapStateToProps = function (state) {
    return {
        user: state.user,
        session: state.session
    };
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Sockets);
