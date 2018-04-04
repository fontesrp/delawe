import React from "react";
import {
    TextInput,
    View,
    Text,
    StyleSheet
} from "react-native";

const CreditCardNumber = function (props) {

    return (
        <View style={ styles.container }>
            <Text style={ styles.label }>Card Number:</Text>
            <TextInput
                name="card"
                style={ styles.input }
                value={ props.value }
                onChangeText={ props.onChangeText }
                keyboardType="numeric"
                returnKeyType="done"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "#335252",
        flexDirection: "row",
        marginBottom: 10,
        marginLeft: -10,
        marginRight: -10,
        padding: 10
    },
    label: {
        color: "#d4dde1",
        flex: 0.35,
        fontSize: 15,
        fontWeight: "bold"
    },
    input: {
        borderBottomColor: "#d4dde1",
        borderBottomWidth: 1,
        color: "#d4dde1",
        flex: 0.65,
        fontSize: 15,
        padding: 5
    }
});

export default CreditCardNumber;
