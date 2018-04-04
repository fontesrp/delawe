import Api from "../lib/api";

class Order {

    static index(session) {
        return Api.get("/orders", session);
    }

    static create(props) {

        const postParams = { ...props.order };

        if (props.courierId) {
            postParams.courier_id = props.courierId;
        }

        return Api.post("/orders", postParams, props.session);
    }

    static update(props) {

        const patchParams = {};
        const { order = null, action } = props;

        if (order) {
            patchParams.value = order.value;
            patchParams.address = order.address;
        }

        patchParams.upd_action = action;

        if (action === "assign" || action === "reassign") {
            patchParams.courier_id = props.courierId;
        }

        return Api.patch(`/orders/${props.id}`, patchParams, props.session);
    }
}

export default Order;
