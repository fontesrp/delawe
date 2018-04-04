import React from "react";
import {
    View,
    StyleSheet
} from "react-native";
import {
    Button,
    Card
} from "react-native-elements";

import CreditCardHeader from "./CreditCardHeader";
import CreditCardDetail from "./CreditCardDetail";
import CreditCardRadio from "./CreditCardRadio";
import CreditCardNumber from "./CreditCardNumber";

const CreditCard = function (props) {

    const onChange = function (value) {
        if (typeof props.onChange === "function") {
            props.onChange({ [this.name]: String(value) });
        }
    };

    return (
        <Card containerStyle={ styles.container }>
            <CreditCardHeader
                onPressClear={ props.clearCard }
            />
            <CreditCardDetail
                name="credits"
                value={ props.credits }
                textA="Add"
                textB="Credits"
                onChangeText={ onChange }
            />
            <CreditCardRadio
                value={ Number(props.credits) }
                onPress={ onChange }
            />
            <CreditCardNumber
                value={ props.card }
                onChangeText={ onChange }
            />
            <View style={ styles.cardDetails }>
                <CreditCardDetail
                    name="expiry"
                    value={ props.expiry }
                    textA="Expiry"
                    textB="Date"
                    onChangeText={ onChange }
                />
                <CreditCardDetail
                    name="cvv"
                    value={ props.cvv }
                    textA="CVV"
                    textB="Code"
                    onChangeText={ onChange }
                />
            </View>
            <Button
                title="ADD CREDIT"
                backgroundColor="#aa4b41"
                color="#d4dde1"
                fontSize={ 15 }
                containerViewStyle={ styles.buttonContainer }
                buttonStyle={ styles.button }
                onPress={ props.onSave }
            />
        </Card>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderColor: "#d4dde1",
        shadowColor: "#2d3033",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
    },
    cardDetails: {
        flexDirection: "row",
        marginBottom: 30
    },
    button: {
        width: 120
    },
    buttonContainer: {
        alignItems: "center",
        marginBottom: -(10 + 12 + 7),
        marginLeft: 0,
        marginRight: 0
    }
});

export default CreditCard;
