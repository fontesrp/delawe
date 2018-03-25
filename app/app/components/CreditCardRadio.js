import React from "react";
import RadioForm, {
    RadioButton,
    RadioButtonInput,
    RadioButtonLabel
} from "react-native-simple-radio-button";

const creditAmounts = [
    { label: "20", value: 20 },
    { label: "50", value: 50 },
    { label: "75", value: 75 },
    { label: "100", value: 100 }
];

const CreditCardRadio = function (props) {

    return (
        <RadioForm formHorizontal style={{ justifyContent: "flex-end", marginBottom: 10 }}>
            { creditAmounts
                .map((credit, idx) => (
                    <RadioButton labelHorizontal key={ idx }>
                        <RadioButtonInput
                            obj={ credit }
                            index={ idx }
                            isSelected={ (credit.value === props.value) }
                            borderWidth={ 1 }
                            buttonInnerColor="#2d3033"
                            buttonOuterColor="#d4dde1"
                            buttonSize={ 8 }
                            buttonOuterSize={ 16 }
                            buttonWrapStyle={{ marginLeft: 13 }}
                            onPress={ props.onPress }
                        />
                        <RadioButtonLabel
                            obj={ credit }
                            index={ idx }
                            labelHorizontal
                            labelStyle={{ fontSize: 13, color: "#2d3033", paddingLeft: 5 }}
                            onPress={ props.onPress }
                        />
                    </RadioButton>
                ))
            }
        </RadioForm>
    );
};

export default CreditCardRadio;
