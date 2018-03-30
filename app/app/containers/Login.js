import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import { ActionCreators } from "../actions";
import LoginFields from "../components/LoginFields";
import LoginLogo from "../components/LoginLogo";
import LoginButtons from "../components/LoginButtons";

class Login extends Component {

    constructor(props) {

        super(props);

        this.state = {
            email: props.session.email,
            password: ""
        };

        props.logout();
    }

    onChangeText(props) {
        this.setState({
            ...this.state,
            ...props
        });
    }

    login() {
        this.props.login(this.state);
    }

    render() {

        const { props } = this;
        let password;

        return (
            <View style={ styles.container }>
                <LoginLogo
                    containerStyle={ styles.logoContainer }
                />
                { (props.session.errors.length > 0)
                    ? <Text style={ styles.error }>Invalid email / password</Text>
                    : null
                }
                <LoginFields
                    containerStyle={ styles.inputContainer }
                    onChangeText={ this.onChangeText.bind(this) }
                    values={ this.state }
                    onLogin={ this.login.bind(this) }
                    errors={ props.session.errors }
                />
                <LoginButtons
                    containerStyle={ styles.buttonContainer }
                    onLogin={ this.login.bind(this) }
                    onSignUp={ () => console.log("Sign up!") }
                    onGuest={ () => console.log("Guest!") }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderTopWidth: 20,
        borderTopColor: "#aa4b41"
    },
    logoContainer: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center"
    },
    inputContainer: {
        flex: 0.15,
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20
    },
    buttonContainer: {
        flex: 0.35
    },
    error: {
        marginLeft: 20,
        color: "#aa4b41"
    }
});

const mapStateToProps = function (state) {
    return {
        session: state.session
    };
};

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
