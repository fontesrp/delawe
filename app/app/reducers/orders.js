import createReducer from "../lib/createReducer";

const dt = new Date();

const pad = num => String(num).padStart(2, "0");

const today = `${dt.getUTCFullYear()}-${pad(dt.getUTCMonth() + 1)}-${pad(dt.getUTCDate())}`;

const rand = max => pad(Math.floor(Math.random() * max));

const randomTime = () => `${rand(24)}:${rand(60)}:${rand(60)}`;

const initialState = [
    {
        id: 1,
        orderNumber: 2204,
        courierName: "",
        address: "2023 James Street, Vancouver, BC",
        date: today,
        time: randomTime(),
        distance: 2.2,
        credits: 17.13,
        status: "pending",
        latitude: 49.244742,
        longitude: -122.837753
    }, {
        id: 2,
        orderNumber: 2100,
        courierName: "",
        address: "3645 Cordova Street, Vancouver, BC",
        date: today,
        time: randomTime(),
        distance: 19.14,
        credits: 15.15,
        status: "pending",
        latitude: 49.227955,
        longitude: -122.838983
    }, {
        id: 3,
        orderNumber: 2503,
        courierName: "",
        address: "2322 Robson St, Vancouver, BC",
        date: today,
        time: randomTime(),
        distance: 17.13,
        credits: 18.1,
        status: "pending",
        latitude: 49.211564,
        longitude: -122.914268
    }, {
        id: 4,
        orderNumber: 2401,
        courierName: "Indiana Niven",
        address: "877 Tanner Street, Vancouver, BC",
        date: today,
        time: randomTime(),
        distance: 9.12,
        credits: 12.15,
        status: "canceled",
        latitude: 49.240405,
        longitude: -122.770096
    }, {
        id: 5,
        orderNumber: 2336,
        courierName: "",
        address: "4535 Easy Highway, Surrey, BC",
        date: today,
        time: randomTime(),
        distance: 18.2,
        credits: 18.12,
        status: "pending",
        latitude: 0.0,
        longitude: 0.0
    }, {
        id: 6,
        orderNumber: 2964,
        courierName: "",
        address: "3294 Colonial Butterfly Dell, Surrey, BC",
        date: today,
        time: randomTime(),
        distance: 14.14,
        credits: 16.1,
        status: "pending",
        latitude: 49.199911,
        longitude: -122.771941
    }, {
        id: 7,
        orderNumber: 2311,
        courierName: "Dagný Abrami",
        address: "1531 Clear Pond Mountain, Surrey, BC",
        date: today,
        time: randomTime(),
        distance: 4.4,
        credits: 13.16,
        status: "assigned",
        latitude: 49.206100,
        longitude: -122.805277
    }, {
        id: 8,
        orderNumber: 2917,
        courierName: "Mädchen Lindon",
        address: "1529 Dewy By-pass, Surrey, BC",
        date: today,
        time: randomTime(),
        distance: 17.12,
        credits: 11.18,
        status: "assigned",
        latitude: 49.200634,
        longitude: -122.818194
    }, {
        id: 9,
        orderNumber: 2098,
        courierName: "Kai Vernersen",
        address: "3944 Blue Deer Bank, Surrey, BC",
        date: today,
        time: randomTime(),
        distance: 4.1,
        credits: 18.2,
        status: "delivered",
        latitude: 49.202965,
        longitude: -122.861741
    }, {
        id: 10,
        orderNumber: 2566,
        courierName: "",
        address: "142 W Hastings St, Vancouver, BC",
        date: today,
        time: randomTime(),
        distance: 10.11,
        credits: 18.2,
        status: "pending",
        latitude: 49.229160,
        longitude: -122.868876
    }
];

const ordersReducer = createReducer(initialState, {

    FETCH_ORDERS(state, action) {

        const orders = [];

        return orders;
    }
});

export default ordersReducer;