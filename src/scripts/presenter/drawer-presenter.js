import Auth from "../model/auth";
import drawerView from "../view/pages/drawer/drawer-view";

const createDrawer = () => {
  const onLogout = () => {
    Auth.logout();
  };

  drawerView.bindLogout(onLogout);
  drawerView.setVisible(Auth.isLoggedIn());

  return drawerView.element;
};

export default createDrawer;
