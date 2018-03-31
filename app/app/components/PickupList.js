import React, { Component } from "react";
import {
    Animated,
    FlatList,
    StyleSheet
} from "react-native";
import { Divider } from "react-native-elements";

import PickupOrder from "./PickupOrder";

class PickupList extends Component {

    constructor(props) {

        super(props);

        this.state = {
            height: new Animated.Value(0),
            borderWidth: new Animated.Value(0)
        };
    }

    expand() {
        Animated.sequence([
            Animated.timing(this.state.borderWidth, {
                toValue: 5,
                duration: 50
            }),
            Animated.timing(this.state.height, {
                toValue: 180,
                duration: 200
            })
        ]).start();
    }

    squash() {
        Animated.sequence([
            Animated.timing(this.state.height, {
                toValue: 0,
                duration: 200
            }),
            Animated.timing(this.state.borderWidth, {
                toValue: 0,
                duration: 50
            })
        ]).start();
    }

    render() {

        const { props } = this;

        const containerStyle = (props.display)
            ? styles.containerShow
            : styles.containerHide;

        return (
            <Animated.View style={ [styles.container, { ...this.state }] }>
                <FlatList
                    data={ props.data }
                    renderItem={ param => <PickupOrder { ...param.item } /> }
                    keyExtractor={ item => String(item.id) }
                    ItemSeparatorComponent={ () => <Divider style={ styles.divider } /> }
                />
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderColor: "#d4dde1",
        borderRadius: 10
    },
    divider: {
        height: 5,
        backgroundColor: "#d4dde1"
    }
});

export default PickupList;
