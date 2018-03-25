export const titleize = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
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
