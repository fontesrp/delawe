import React from "react";
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet
} from "react-native";

const PickupBtn = function (props) {

    return (
        <TouchableHighlight style={ styles.container } onPress={() => console.log("Request pickup!")}>
            <View style={ styles.view }>
                <Text style={ styles.text }>REQUEST FOR PICKUP</Text>
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "8%"
    },
    view: {
        flex: 1,
        backgroundColor: "#aa4b41",
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        color: "#d4dde1",
        fontWeight: "bold",
        fontSize: 15
    }
});

export default PickupBtn;
