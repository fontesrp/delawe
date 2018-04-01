import React, { Component } from "react";
import {
    Animated,
    FlatList,
    TouchableHighlight,
    StyleSheet
} from "react-native";
import { Divider } from "react-native-elements";

import PickupOrder from "./PickupOrder";
import PickupCourier from "./PickupCourier";

class PickupList extends Component {

    constructor(props) {

        super(props);

        this.state = {
            height: new Animated.Value(0),
            borderWidth: new Animated.Value(0)
        };
    }

    sequence(params) {
        return [
            Animated.timing(this.state.borderWidth, {
                toValue: params.margin,
                duration: 50
            }),
            Animated.timing(this.state.height, {
                toValue: params.height,
                duration: 200
            })
        ];
    }

    expand() {
        return Animated.sequence(
            this.sequence({
                margin: 5,
                height: 180
            })
        );
    }

    squash() {
        return Animated.sequence(
            this.sequence({
                margin: 0,
                height: 0
            }).reverse()
        );
    }

    onPressItem(item) {
        this.props.onSelect(this.props.type, item);
    }

    renderItem(param) {

        const { props } = this;

        const Item = (props.type === "orders")
            ? PickupOrder
            : PickupCourier;

        return (
            <TouchableHighlight
                underlayColor="rgba(0, 0, 0, 0.5)"
                onPress={ this.onPressItem.bind(this, param.item) }
            >
                <Item { ...param.item } />
            </TouchableHighlight>
        );
    }

    render() {

        return (
            <Animated.View style={ [styles.container, { ...this.state }] }>
                <FlatList
                    data={ this.props.data }
                    renderItem={ this.renderItem.bind(this) }
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
        borderRadius: 10,
        marginLeft: 6,
        marginRight: 6
    },
    divider: {
        height: 5,
        backgroundColor: "#d4dde1"
    }
});

export default PickupList;
