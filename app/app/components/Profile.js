import React, { Component } from "react";
import {
    View,
    Text,
    TouchableHighlight
} from "react-native";

class Profile extends Component {

    render() {
        return (
            <View style={{marginTop: 20}}>
                <Text>Profile</Text>
                <TouchableHighlight onPress={() => this.props.goToHome()}>
                    <Text>Profile</Text>
                </TouchableHighlight>
                <Text>recipeCount: {this.props.recipesCount}</Text>
                <TouchableHighlight onPress={() => this.props.addRecipe(123123)}>
                    <Text>Increase count</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.props.openDrawer()}>
                    <Text>Open Drawer</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export default Profile;
