import React from "react";
import {
    ActionsContainer,
    Button,
    FieldsContainer,
    Fieldset,
    Form,
    Theme
} from "react-native-clean-form";
import { Avatar } from "react-native-elements";
import PhotoUpload from "react-native-photo-upload";

import UserFormField from "./UserFormField";

Theme.BaseInput.fontSize = 15;
Theme.BaseInput.lineHeight = 20;
Theme.Button.backgroundColor = "#335252";
Theme.Button.color = "#d4dde1";
Theme.Button.fontSize = 18;
Theme.Button.fontWeight = "bold";
Theme.FormGroup.height = 45;
Theme.Label.fontSize = 15;

const provinces = [
    { label: "Alberta", value: "AB" },
    { label: "British Columbia", value: "BC" },
    { label: "Manitoba", value: "MB" },
    { label: "New Brunswick", value: "NB" },
    { label: "Newfoundland and Labrador", value: "NL" },
    { label: "Nova Scotia", value: "NS" },
    { label: "Ontario", value: "ON" },
    { label: "Prince Edward Island", value: "PE" },
    { label: "Quebec", value: "QC" },
    { label: "Saskatchewan", value: "SK" }
];

const UserForm = function (props) {

    const sets = {
        "Contact": [
            {
                name: "name",
                label: "Business Name",
                placeholder: "My Restaurant"
            }, {
                name: "contact",
                label: "Contact Name",
                placeholder: "Jon Snow"
            }, {
                name: "email",
                type: "email",
                label: "Email",
                placeholder: "john.snow@winterfell.gov"
            }, {
                name: "phone",
                type: "phone",
                label: "Telephone",
                placeholder: "(999) 999-9999"
            }
        ],
        "Address": [
            {
                name: "streetAddress",
                label: "Address",
                placeholder: "142 W Hastings St"
            }, {
                name: "city",
                label: "City",
                placeholder: "Vancouver"
            }, {
                name: "province",
                type: "select",
                label: "Province",
                placeholder: "BC",
                options: provinces
            }
        ]
    };

    const fieldsets = Object.keys(sets);

    return (
        <Form>
            <FieldsContainer>
                <PhotoUpload
                    containerStyle={{ height: 150, marginTop: 20, marginBottom: 20 }}
                    onPhotoSelect={ props.onPhotoSelect }
                >
                    <Avatar
                        xlarge
                        rounded
                        source={{ uri: props.image }}
                        activeOpacity={ 0.7 }
                    />
                </PhotoUpload>
                { fieldsets
                    .map((fsName, fsIdx) => (
                        <Fieldset
                            key={ fsIdx }
                            label={ fsName }
                            last={ (fsIdx === fieldsets.length - 1) }
                        >
                            { sets[fsName]
                                .map(field => (
                                    <UserFormField
                                        { ...field }
                                        key={ field.name }
                                        value={ props[field.name] }
                                        onInputChange = { props.onInputChange }
                                    />
                                ))
                            }
                        </Fieldset>
                    ))
                }
            </FieldsContainer>
            <ActionsContainer>
                <Button onPress={ props.onSave }>Save</Button>
            </ActionsContainer>
        </Form>
    );
};

export default UserForm;
