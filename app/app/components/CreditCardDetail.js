import React from "react";
import {
    TextInput,
    View,
    Text,
    StyleSheet
} from "react-native";

const CreditCardDetail = function (props) {

    // TODO: format text ($ 0.00) as user inputs

    return (
        <View style={ styles.container }>
            <View style={ styles.textWrapper }>
                <Text style={ styles.text }>{ props.textA }</Text>
                <Text style={ styles.text }>{ props.textB }</Text>
            </View>
            <TextInput
                name={ props.name }
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
        flexDirection: "row",
        marginBottom: 10,
        width: "50%"
    },
    textWrapper: {
        width: "34%"
    },
    text: {
        color: "#2d3033",
        fontSize: 12,
        paddingRight: 10,
        textAlign: "right"
    },
    input: {
        color: "#2d3033",
        borderBottomColor: "#2d3033",
        borderBottomWidth: 1,
        fontSize: 13,
        paddingLeft: 5,
        width: "66%"
    }
});

export default CreditCardDetail;
