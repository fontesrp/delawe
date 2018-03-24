export const statusColor = function (status) {
    // Muted & Antique
    switch (status) {
    case "canceled":
        return "#b2473e";
    case "pending":
        return "#eab364";
    case "assigned":
        return "#a4cabc";
    case "delivered":
        return "#acbd78";
    }
};
