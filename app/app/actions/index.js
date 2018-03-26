import * as NavigationActions from "./navigation";
import * as ProfileActions from "./profile";
import * as UserActions from "./user";
import * as WalletActions from "./wallet";

export const ActionCreators = {
    ...NavigationActions,
    ...UserActions,
    ...ProfileActions,
    ...WalletActions
};
