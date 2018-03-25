import React, { Component } from "react";
import {
    View,
    TouchableHighlight,
    Text,
    StyleSheet
} from "react-native";
import { Avatar } from "react-native-elements";
import PhotoUpload from "react-native-photo-upload";
import t from "tcomb-form-native";

import { breakupAddress } from "../lib/util";

const { Form } = t.form;

const User = t.struct({
    name: t.String,
    streetAddress: t.String,
    city: t.String,
    province: t.String
});

class Profile extends Component {

    constructor(props) {

        super(props);

        this.state = {
            image: props.userImage,
            name: props.userName,
            ...breakupAddress(this.props.userAddress)
        };
    }

    onPhotoSelect(avatar) {
        if (avatar) {
            this.setState({
                image: `data:image/png;base64,${avatar}`
            });
        }
    }

    onFormChange(value) {
        this.setState({ ...value });
    }

    onSavePress() {

        const { form } = this.refs;
        const value = form.getValue();

        if (value === null) {
            return;
        }

        const userProps = Object.assign({}, this.state, value);

        this.props.updateUser(userProps);
    }

    render() {

        const { state } = this;

        return (
            <View style={ styles.container }>
                <PhotoUpload
                    containerStyle={{ flex: 0.3 }}
                    onPhotoSelect={ this.onPhotoSelect.bind(this) }
                >
                    <Avatar
                        xlarge
                        rounded
                        source={{ uri: state.image }}
                        activeOpacity={ 0.7 }
                    />
                </PhotoUpload>
                <View style={ styles.formContainer }>
                    <Form
                        ref="form"
                        type={ User }
                        value={ state }
                        onChange={ this.onFormChange.bind(this) }
                    />
                    <TouchableHighlight
                        onPress={ this.onSavePress.bind(this) }
                        style={ styles.saveBtn }
                    >
                        <Text style={ styles.saveTxt }>Save</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    formContainer: {
        flex: 0.7,
        width: "90%"
    },
    saveBtn: {
        alignItems: "center",
        backgroundColor: "#335252",
        borderRadius: 5,
        height: 40,
        justifyContent: "center",
        marginTop: 20
    },
    saveTxt: {
        color: "#d4dde1",
        fontWeight: "bold",
        fontSize: 18
    }
});

export default Profile;
