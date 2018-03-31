import * as CouriersActions from "./couriers";
import * as NavigationActions from "./navigation";
import * as OrdersActions from "./orders";
import * as ProfileActions from "./profile";
import * as SessionActions from "./session";
import * as TransactionsActions from "./transactions";
import * as UserActions from "./user";
import * as WalletActions from "./wallet";

export const ActionCreators = {
    ...CouriersActions,
    ...NavigationActions,
    ...OrdersActions,
    ...ProfileActions,
    ...SessionActions,
    ...TransactionsActions,
    ...UserActions,
    ...WalletActions
};
