import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    DrawerItems,
    SafeAreaView
} from "react-navigation";
import {
    ScrollView,
    StyleSheet
} from "react-native";

import UserAvatar from "../components/UserAvatar";

class Drawer extends Component {

    render() {

        const { user = {} } = this.props;

        return (
            <ScrollView>
                <SafeAreaView
                    style={styles.container}
                    forceInset={{ top: "always", horizontal: "never" }}
                >
                    <UserAvatar
                        image={user.image}
                        name={user.name}
                        onPress={() => console.log("Pressed!")}
                    />
                    <DrawerItems {...this.props} />
                </SafeAreaView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

const mapStateToProps = function (state) {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(Drawer);
