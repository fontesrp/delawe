import { Theme } from "react-native-clean-form";

export const statusColor = function (status) {
    // Muted & Antique
    switch (status) {
    case "pending":
        return "#eab364";
    case "assigned":
    case "on_transit":
        return "#a4cabc";
    case "delivered":
        return "#acbd78";
    case "canceled":
        return "#b2473e";
    }
};

export const setFormTheme = function () {
    Theme.BaseInput.fontSize = 15;
    Theme.BaseInput.lineHeight = 20;
    Theme.Button.backgroundColor = "#335252";
    Theme.Button.color = "#d4dde1";
    Theme.Button.fontSize = 18;
    Theme.Button.fontWeight = "bold";
    Theme.FormGroup.height = 45;
    Theme.Label.fontSize = 15;
};
