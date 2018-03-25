import * as NavigationActions from "./navigation";
import * as ProfileActions from "./profile";
import * as UserActions from "./user";

export const ActionCreators = Object.assign({}, NavigationActions, UserActions, ProfileActions);
