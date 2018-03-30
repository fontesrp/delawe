import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

const LoginLogo = function (props) {

    return (
        <View style={ props.containerStyle }>
            <Text style={ styles.logo }>DELAWE</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    logo: {
        color: "#335252",
        fontSize: 32,
        fontWeight: "900"
    }
});

export default LoginLogo;
