import React, { Component } from "react";
import {
    KeyboardAvoidingView,
    StyleSheet
} from "react-native";

import { breakupAddress } from "../lib/util";
import UserForm from "../components/UserForm";

class Profile extends Component {

    constructor(props) {

        super(props);

        props.updateProfile({
            image: props.userImage,
            name: props.userBusinessName,
            contact: props.userName,
            email: props.userEmail,
            phone: props.userPhone,
            ...breakupAddress(props.userAddress)
        });
    }

    onPhotoSelect(avatar) {
        if (avatar) {
            this.props.updateProfile({
                image: `data:image/png;base64,${avatar}`
            });
        }
    }

    onInputChange(field) {
        this.props.updateProfile(field);
    }

    onSave() {

        // TODO: validate form

        this.props.updateUser(this.getProfileState());
    }

    getProfileState() {

        const profile = /^profile/;
        const { props } = this;
        const state = {};

        Object
            .keys(props)
            .filter(stateKey => profile.test(stateKey))
            .forEach(function (stateKey) {

                let name = stateKey.replace(profile, "").toLowerCase();

                if (name === "streetaddress") {
                    name = "streetAddress";
                }

                state[name] = props[stateKey];
            });

        return state;
    }

    render() {

        return (
            <KeyboardAvoidingView style={ styles.container } behavior="padding">
                <UserForm
                    { ...this.getProfileState() }
                    onInputChange={ this.onInputChange.bind(this) }
                    onPhotoSelect={ this.onPhotoSelect.bind(this) }
                    onSave={ this.onSave.bind(this) }
                />
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default Profile;
