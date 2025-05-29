import Auth from "../model/auth";
import createDrawer from "./drawer-presenter";
import createLoginStateView from "../view/pages/login/login-state-view";

const handleLoginState = () => {
  const drawer = createDrawer();
  const loginStateView = createLoginStateView();

  loginStateView.attachDrawer(drawer);
  loginStateView.setDrawerVisibility(Auth.isLoggedIn());

  return drawer;
};

export default handleLoginState;
