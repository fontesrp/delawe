import React from "react";
import {
    FormGroup,
    Input,
    Label
} from "react-native-clean-form";
import { View, PanResponder } from "react-native";

import FormSelect from "./FormSelect";

const PickupField = function (props) {

    const onChange = function (text) {
        if (typeof props.onInputChange === "function") {
            props.onInputChange({ [this.name]: text });
        }
    };

    const fProps = { ...props };

    const { type = "text" } = fProps;
    delete fProps.type;
    fProps.onChangeText = onChange;

    let field;

    switch (type) {
    case "text":
        field = <Input { ...fProps } />;
        break;
    case "number":
        field = <Input { ...fProps } keyboardType="numeric" returnKeyType="done" />;
        break;
    case "select":

        fProps.onValueChange = fProps.onChangeText;
        delete fProps.onChangeText;

        return (
            <FormSelect { ...fProps } />
        );
    }

    return (
        <FormGroup error={ !!fProps.error }>
            <Label>{ fProps.label }</Label>
            { field }
        </FormGroup>
    );
};

export default PickupField;
