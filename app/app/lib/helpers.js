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
