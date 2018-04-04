import React from "react";
import {
    View,
    StyleSheet
} from "react-native";
import { Button } from "react-native-elements";

const LoginButtons = function (props) {

    return (
        <View style={ props.containerStyle }>
            <Button
                title="Login"
                color="#335252"
                borderRadius={ 5 }
                containerViewStyle={ styles.buttonView }
                buttonStyle={ styles.button }
                onPress={ props.onLogin }
                outline
            />
            <Button
                title="Sign Up"
                color="#335252"
                borderRadius={ 5 }
                containerViewStyle={ styles.buttonView }
                buttonStyle={ styles.button }
                onPress={ props.onSignUp }
                outline
            />
            <Button
                title="Guest"
                color="#335252"
                borderRadius={ 5 }
                containerViewStyle={ styles.buttonView }
                buttonStyle={ styles.button }
                onPress={ props.onGuest }
                outline
            />
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        borderColor: "#d4dde1"
    },
    buttonView: {
        borderRadius: 5,
        marginTop: 10
    }
});

export default LoginButtons;
