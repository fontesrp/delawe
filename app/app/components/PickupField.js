import React from "react";
import {
    FormGroup,
    Input,
    Label,
    Select
} from "react-native-clean-form";

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

        // TODO: The picker from this Select is covering the whole screen
        field = <Select { ...fProps } cancelLabel="cancel" />;
        break;
    }

    return (
        <FormGroup error={ !!fProps.error }>
            <Label>{ fProps.label }</Label>
            { field }
        </FormGroup>
    );
};

export default PickupField;
