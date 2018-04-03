import React, { Component } from "react";
import {
    TouchableOpacity,
    StatusBar,
    View,
    Text,
    Vibration,
    StyleSheet
} from "react-native";
import { Icon } from "react-native-elements";
import GestureRecognizer, { swipeDirections } from "react-native-swipe-gestures";

class NotificationBody extends Component {

    componentWillReceiveProps(nextProps) {

        if (nextProps.isOpen !== this.props.isOpen) {
            StatusBar.setHidden(nextProps.isOpen);
        }

        const isOpening = nextProps.isOpen && !this.props.isOpen;

        if ((this.props.vibrate || nextProps.vibrate) && isOpening) {
            Vibration.vibrate();
        }
    }

    onPress() {

        const { onPress, onClose } = this.props;

        onClose();
        onPress();
    }

    onSwipe(direction) {

        const { SWIPE_UP } = swipeDirections;

        if (direction === SWIPE_UP) {
            this.props.onClose();
        }
    }

    render() {

        const { title, message, icon } = this.props;

        return (
            <View style={ styles.container }>
                <GestureRecognizer
                    onSwipe={ this.onSwipe.bind(this) }
                    style={ styles.gesture }
                >
                    <TouchableOpacity
                        style={ styles.content }
                        activeOpacity={ 0.3 }
                        underlayColor="transparent"
                        onPress={ this.onPress.bind(this) }
                    >
                        <Icon
                            name={ icon }
                            color="#2d3033"
                            containerStyle={ styles.icon }
                            size={ 34 }
                        />
                        <View style={ styles.textContainer }>
                            <Text style={ styles.title }>{ title }</Text>
                            <Text style={ styles.message }>{ message }</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={ styles.footer } />
                </GestureRecognizer>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#d4dde1"
    },
    gesture: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    content: {
        flex: 1,
        flexDirection: "row"
    },
    icon: {
        width: 80
    },
    textContainer: {
        alignSelf: "center"
    },
    title: {
        color: "#2d3033",
        fontWeight: "bold"
    },
    message: {
        color: "#2d3033",
        marginTop: 5
    },
    footer: {
        backgroundColor: "#696969",
        borderRadius: 5,
        alignSelf: "center",
        height: 5,
        width: 35,
        margin: 5
    }
});

export default NotificationBody;
