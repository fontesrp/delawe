import React from "react";
import {
    View,
    Text,
    Modal,
    StyleSheet
} from "react-native";

const PickupModal = function (props) {
    return (
        <Modal
            animationType="fade"
            transparent={ false }
            visible={ props.visible }
            transparent
        >
            <View style={{ flex: 1, paddingLeft: 20, paddingRight: 20, paddingTop: 60, paddingBottom: 60, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                <View style={{ flex: 1, width: "100%", backgroundColor: "white", borderRadius: 10 }}>
                    <Text>Modal</Text>
                </View>
            </View>
        </Modal>
    );
};

export default PickupModal;
