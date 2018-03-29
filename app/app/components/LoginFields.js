import React from "react";
import {
    View,
    TextInput,
    StyleSheet
} from "react-native";

const LoginFields = function (props) {

    let password;

    const onChangeText = function (value) {
        props.onChangeText({ [this.name]: value });
    };

    return (
        <View style={ props.containerStyle }>
            <TextInput
                name="email"
                placeholder="Email"
                placeholderTextColor="#d4dde1"
                autoCorrect={ false }
                autoCapitalize="none"
                returnKeyType="next"
                style={ styles.input }
                clearButtonMode="while-editing"
                onChangeText={ onChangeText }
                value={ props.email }
                enablesReturnKeyAutomatically
                keyboardType="email-address"
                onSubmitEditing={ () => password.focus() }
            />
            <TextInput
                ref={ input => password = input }
                name="password"
                placeholder="Password"
                placeholderTextColor="#d4dde1"
                autoCorrect={ false }
                autoCapitalize="none"
                returnKeyType="go"
                style={ styles.input }
                clearButtonMode="while-editing"
                onChangeText={ onChangeText }
                value={ props.password }
                enablesReturnKeyAutomatically
                secureTextEntry
                clearTextOnFocus
            />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        color: "#2d3033",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#d4dde1"
    }
});

export default LoginFields;
