import React from "react";
import {
    FormGroup,
    Input,
    Label,
    Select
} from "react-native-clean-form";

const UserFormField = function (props) {

    const onChange = function (text) {
        if (typeof props.onInputChange === "function") {
            props.onInputChange({ [this.name]: text });
        }
    };

    const fProps = Object.assign({}, props);

    const { type = "text" } = fProps;
    delete fProps.type;
    fProps.onChangeText = onChange;

    let field;

    switch (type) {
    case "text":
        field = <Input { ...fProps } />;
        break;
    case "email":
        field = <Input { ...fProps } keyboardType="email-address" />;
        break;
    case "phone":
        field = <Input { ...fProps } keyboardType="phone-pad" returnKeyType="done" dataDetectorTypes="phoneNumber" />;
        break;
    case "select":
        fProps.onValueChange = fProps.onChangeText;
        delete fProps.onChangeText;
        field = <Select { ...fProps } />;
        break;
    }

    return (
        <FormGroup error={ !!fProps.error }>
            <Label>{ fProps.label }</Label>
            {field}
        </FormGroup>
    );
};

export default UserFormField;
