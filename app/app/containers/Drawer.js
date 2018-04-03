import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    DrawerItems,
    SafeAreaView
} from "react-navigation";
import {
    ScrollView,
    StyleSheet
} from "react-native";

import UserAvatar from "../components/UserAvatar";
import { ActionCreators } from "../actions";
import { createCable, subscribe } from "../lib/actionCable";

class Drawer extends Component {

    constructor(props) {

        super(props);

        console.log(props);

        this.cable = createCable(props.session.jwt);
        this.subscriptions = subscribe(this.cable, {
            onCourierReceived: props.receiveCourier,
            onOrderReceived: props.receiveOrder,
            onTransactionReceived: props.receiveTransaction,
            onUserReceived: props.receiveUser
        });
    }

    render() {

        const { user = {} } = this.props;

        return (
            <ScrollView>
                <SafeAreaView
                    style={ styles.container }
                    forceInset={{ top: "always", horizontal: "never" }}
                >
                    <UserAvatar
                        image={ user.image }
                        name={ user.business_name }
                        onPress={ this.props.goToProfile }
                    />
                    <DrawerItems { ...this.props } />
                </SafeAreaView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

const mapStateToProps = function (state) {
    return {
        user: state.user,
        session: state.session
    };
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
