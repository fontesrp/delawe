import React from "react";
import {
    TextInput,
    View,
    Text,
    StyleSheet
} from "react-native";
import {
    Button,
    Card
} from "react-native-elements";

import CreditCardHeader from "./CreditCardHeader";
import CreditCardAdd from "./CreditCardAdd";
import CreditCardRadio from "./CreditCardRadio";
import CreditCardNumber from "./CreditCardNumber";

const CreditCard = function (props) {

    return (
        <Card>
            <CreditCardHeader onPressClear={ () => console.log("Clear!") } />
            <CreditCardAdd value="" onChangeText={ () => console.log("Change!") } />
            <CreditCardRadio value={ 0 } onPress={ () => console.log("Radio change!") } />
            <CreditCardNumber value="" onChangeText={ () => console.log("Card change!") } />
            <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "row" }}>
                    <View>
                        <Text>Expirity</Text>
                        <Text>Date</Text>
                    </View>
                    <TextInput />
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View>
                        <Text>CVV</Text>
                        <Text>Code</Text>
                    </View>
                    <TextInput />
                </View>
            </View>
            <Button title="Add Credit" />
        </Card>
    );
};



export default CreditCard;
