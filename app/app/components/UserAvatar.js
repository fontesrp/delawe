import React from "react";
import {
    StyleSheet,
    View,
    Text
} from "react-native";
import { Avatar } from "react-native-elements";

const UserAvatar = function (props) {
    return (
        <View style={styles.container}>
            <Avatar
                xlarge
                rounded
                source={{uri: props.image }}
                onPress={props.onPress}
                activeOpacity={0.7}
            />
            <Text style={styles.name}>{props.name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        flexDirection: "column",
        height: 250,
        justifyContent: "space-evenly"
    },
    name: {
        color: "#2d3033",
        fontSize: 20,
        fontWeight: "bold"
    }
});

export default UserAvatar;
