import * as NavigationActions from "./navigation";
import * as ProfileActions from "./profile";
import * as UserActions from "./user";

export const ActionCreators = {
    ...NavigationActions,
    ...UserActions,
    ...ProfileActions
};
