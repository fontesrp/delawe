import React from "react";
import {
    TextInput,
    View,
    Text,
    TouchableHighlight,
    StyleSheet
} from "react-native";
import {
    Button,
    Card
} from "react-native-elements";
import RadioForm from "react-native-simple-radio-button";

import CreditCardHeader from "./CreditCardHeader";
import CreditCardAdd from "./CreditCardAdd";

const creditAmounts = [
    { label: "20", value: 20 },
    { label: "50", value: 50 },
    { label: "75", value: 75 },
    { label: "100", value: 100 }
];

const CreditCard = function (props) {

    return (
        <Card>
            <CreditCardHeader onPressClear={ () => console.log("Clear!") } />
            <CreditCardAdd value="" onChangeText={ () => console.log("Change!") } />
            <RadioForm
                radio_props={creditAmounts}
                initial={0}
                formHorizontal={true}
            />
            <View style={{ flexDirection: "row" }}>
                <Text>Card Number:</Text>
                <TextInput />
            </View>
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
