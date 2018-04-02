import React from "react";
import {
    ActionsContainer,
    Button,
    FieldsContainer,
    Fieldset,
    Form
} from "react-native-clean-form";
import { Avatar } from "react-native-elements";
import PhotoUpload from "react-native-photo-upload";

import UserFormField from "./UserFormField";
import { setFormTheme, getProvinces } from "../lib/helpers";

setFormTheme();

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
                placeholder: "jon.snow@winterfell.gov"
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
                options: getProvinces()
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
                                        error={ !props[field.name] }
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
