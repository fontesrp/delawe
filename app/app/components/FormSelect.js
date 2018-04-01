import React, { Component } from "react";
import {
    View,
    PanResponder,
    ActionSheetIOS
} from "react-native";
import {
    FormGroup,
    Label,
    Select
} from "react-native-clean-form";

class FormSelect extends Component {

    constructor(props) {

        super(props);

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => true,
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: this.showSelector.bind(this),
            onPanResponderMove: () => undefined,
            onPanResponderTerminationRequest: () => true,
            onPanResponderRelease: () => undefined,
            onPanResponderTerminate: () => undefined,
            onShouldBlockNativeResponder: () => true
        });

        this.state = {
            value: props.value
        };
    }

    componentWillReceiveProps(nextProps) {

        const labels = [];
        const values = [];

        nextProps.options.forEach(function (opt) {
            labels.push(opt.label);
            values.push(opt.value);
        });

        this.labels = labels;
        this.values = values;
    }

    onSelect(idx) {

        // If pressed button was not Cancel
        if (idx < this.labels.length) {

            const val = this.values[idx];

            this.props.onValueChange(val, idx);

            this.setState({
                value: val
            });
        }
    }

    showSelector() {

        console.log("here");

        const { labels } = this;

        const options = {
            options: [...labels, "Cancel"],
            cancelButtonIndex: labels.length
        };

        ActionSheetIOS.showActionSheetWithOptions(options, this.onSelect.bind(this));
    }

    render() {

        const { props } = this;

        return (
            <View { ...this.panResponder.panHandlers }>
                <FormGroup error={ !!props.error }>
                    <Label>{ props.label }</Label>
                    <Select { ...props } value={ this.state.value } />
                </FormGroup>
            </View>
        );
    }
}

export default FormSelect;
