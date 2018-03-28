import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import { ActionCreators } from "../actions";

class Login extends Component {

    render() {
        return (
            <View style={{ flex: 1, marginTop: 20 }}>
                <Text>Login</Text>
            </View>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        session: state.session
    };
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
