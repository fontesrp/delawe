import { Theme } from "react-native-clean-form";

import { minutesSince } from "./util";

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

export const getProvinces = function () {
    return [
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
};

export const adjustedDistance = function (courier) {

    const minutes = Math.floor(minutesSince(courier.last_pickup));

    // Minimum of half an hour
    if (minutes <= 30) {
        return courier.distance;
    }

    // Every 15 minutes after half an hour, the factor increases by 0.1. So for 45
    // minutes, it will be 1.1; for 60, 1.2; and so on.
    const factor = (minutes / 15 - 2) / 10 + 1;

    return courier.distance / factor;
};
