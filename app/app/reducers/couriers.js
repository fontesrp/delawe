import createReducer from "../lib/createReducer";

const dt = new Date();

const pad = num => String(num).padStart(2, "0");

const today = `${dt.getUTCFullYear()}-${pad(dt.getUTCMonth() + 1)}-${pad(dt.getUTCDate())}`;

const rand = max => pad(Math.floor(Math.random() * max));

const randomTime = () => `${rand(24)}:${rand(60)}:${rand(60)}`;

const initialState = [
    {
        id: 1,
        name: "Cameron Guiney",
        lastPickup: `${today} ${randomTime()}`,
        latitude: 49.211575,
        longitude: -122.841275
    }, {
        id: 2,
        name: "Riley Rabun",
        lastPickup: `${today} ${randomTime()}`,
        latitude: 49.200976,
        longitude: -122.823015
    }, {
        id: 3,
        name: "Rogelio Frazee",
        lastPickup: `${today} ${randomTime()}`,
        latitude: 49.206234,
        longitude: -122.810247
    }, {
        id: 4,
        name: "Eleanore Fulcher",
        lastPickup: `${today} ${randomTime()}`,
        latitude: 49.188416,
        longitude: -122.843258
    }, {
        id: 5,
        name: "Bambi Didomenico",
        lastPickup: `${today} ${randomTime()}`,
        latitude: 49.190462,
        longitude: -122.867761
    }
];

const couriersReducer = createReducer(initialState, {

    FETCH_COURIERS(state, action) {

        const couriers = [];

        return couriers;
    }
});

export default couriersReducer;
