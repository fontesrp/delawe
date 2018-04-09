import ActionCable from "action-cable-react-jwt";

const host = "localhost:3000";

const createCable = function (jwt) {
    return ActionCable.createConsumer(`ws://${host}/cable`, jwt);
};

const subscribe = function (cable, props) {

    const courier = cable.subscriptions.create("CouriersChannel", {
        received: props.onCourierReceived
    });

    const order = cable.subscriptions.create("OrdersChannel", {
        received: props.onOrderReceived
    });

    const transaction = cable.subscriptions.create("TransactionsChannel", {
        received: props.onTransactionReceived
    });

    const user = cable.subscriptions.create("UsersChannel", {
        received: props.onUserReceived
    });

    return {
        courier,
        order,
        transaction,
        user
    };
};

export {
    createCable,
    subscribe
};
