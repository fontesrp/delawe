import React from "react";
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet
} from "react-native";

const CreditCardHeader = function (props) {

    return (
        <View style={ styles.container }>
            <View style={ styles.titleContainer }>
                <Text style={ styles.title }>ADD BALANCE</Text>
            </View>
            <TouchableHighlight
                style={ styles.clearContainer }
                activeOpacity={ 1 }
                underlayColor="#d4dde1"
                onPress={ props.onPressClear }
            >
                <Text style={ styles.clear }>clear</Text>
            </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10
    },
    titleContainer: {
        borderBottomColor: "#aa4b41",
        borderBottomWidth: 1,
        paddingBottom: 3,
        paddingTop: 3
    },
    title: {
        color: "#2d3033",
        fontWeight: "800"
    },
    clearContainer: {
        alignItems: "center",
        borderRadius: 10,
        paddingBottom: 3,
        paddingLeft: 7,
        paddingRight: 7,
        paddingTop: 3
    },
    clear: {
        color: "#335252",
        fontWeight: "bold"
    }
});

export default CreditCardHeader;
