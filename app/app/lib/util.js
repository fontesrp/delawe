import dateFns from "date-fns";

export const titleize = function (str) {
    str = str || "";
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const toCamelCase = function (str) {
    str = str || "";
    return str.split("_").map(titleize).join("");
};

export const snakeToTitle = function (str) {
    str = str || "";
    return str.split("_").map(titleize).join(" ");
};

export const breakupAddress = function (address) {

    const comp = address.split(", ");

    return {
        streetAddress: comp[0],
        city: comp[1],
        province: comp[2]
    };
};

export const joinAddress = function (comp) {
    return `${comp.streetAddress}, ${comp.city}, ${comp.province}`;
};

export const patchOldState = function (state, action) {

    const { props = action } = action;

    const newState = { ...state };

    Object.keys(props).forEach(function (key) {
        newState[key] = props[key];
    });

    return newState;
};

export const toCurrency = function (num) {
    return Number(num).toLocaleString("en-CA", { style: "currency", currency: "CAD" });
};

export const prettyNumber = function (num) {
    return toCurrency(num).replace("$", "");
};

export const fullName = function (...names) {
    return names.map(titleize).join(" ");
};

export const prettyDate = function (isoDate) {
    const date = new Date(isoDate);
    return dateFns.format(date, "D MMM YYYY");
};

export const prettyTime = function (isoDate) {
    const date = new Date(isoDate);
    return dateFns.format(date, "HH:mm a");
};

export const prettyDateTime = function (isoDate) {
    return `${prettyDate(isoDate)} ${prettyTime(isoDate)}`;
};

export const secondsSince = function (isoDate) {
    const date = new Date(isoDate);
    return (Date.now() - date.valueOf()) / 1000;
};

export const minutesSince = function (isoDate) {
    return secondsSince(isoDate) / 60;
};
