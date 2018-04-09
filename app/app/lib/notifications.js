const storeNotification = function (notification) {

    if (notification.type !== "order_update") {
        return;
    }

    const { action, order, prevAasmState } = notification;

    let notifProps;

    switch (action) {
    case "pickup":
        notifProps = {
            title: "Order pickup",
            message: `The courier picked up order #${order.id}`
        };
        break;
    case "deliver":
        notifProps = {
            title: "Order delivered",
            message: `Order #${order.id} was delivered`
        };
        break;
    case "cancel":
        if (prevAasmState === "on_transit") {
            notifProps = {
                title: "Order canceled",
                message: `The courier canceled order #${order.id}`
            };
        }
        break;
    }

    return notifProps;
};

const courierNotification = function (storeBusinessName, notification) {

    const { order, prevAasmState, action } = notification;

    let notifProps;

    const newOrderNotif = {
        title: "New pickup request",
        message: `${storeBusinessName} requested a new pickup for order #${order.id} worth ${order.value} credits`
    };

    switch (notification.type) {
    case "order_new":
        notifProps = newOrderNotif;
        break;
    case "order_update":
        if (action) {
            switch (action) {
            case "assign":
                notifProps = newOrderNotif;
                break;
            case "unassign":
            case "reassign":
                notifProps = {
                    title: "Order unassigned",
                    message: `You are no longer responsible for delivering order #${order.id}`
                };
                break;
            case "cancel":
                if (prevAasmState === "assigned") {
                    notifProps = {
                        title: "Order canceld",
                        message: `Order #${order.id} was canceled`
                    };
                }
                break;
            }
        }
        break;
    }

    return notifProps;
};

const orderNotification = function (props) {

    const types = ["order_new", "order_update"];

    return props.notifications.find(notif => types.includes(notif.type));
};

const handleNotifications = function (prevProps, nextProps, showNotification) {

    const notification = orderNotification(nextProps);

    if (!notification) {
        return;
    }

    const { order } = notification;
    const notifProps = (prevProps.userUserType === "courier")
        ? courierNotification(prevProps.storeBusinessName, notification)
        : storeNotification(notification);

    if (notifProps) {

        showNotification({
            ...notifProps,
            icon: "shopping-cart",
            vibrate: true
        });
    }

    prevProps.clearNotifications();
};

export default handleNotifications;
