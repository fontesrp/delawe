import * as CouriersActions from "./couriers";
import * as NavigationActions from "./navigation";
import * as NotificationsActions from "./notifications";
import * as OrdersActions from "./orders";
import * as ProfileActions from "./profile";
import * as RequestsActions from "./requests";
import * as SessionActions from "./session";
import * as TransactionsActions from "./transactions";
import * as UserActions from "./user";
import * as WalletActions from "./wallet";

export const ActionCreators = {
    ...CouriersActions,
    ...NavigationActions,
    ...NotificationsActions,
    ...OrdersActions,
    ...ProfileActions,
    ...RequestsActions,
    ...SessionActions,
    ...TransactionsActions,
    ...UserActions,
    ...WalletActions
};
