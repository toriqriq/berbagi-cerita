// presenter/login-presenter.js
import Auth from "../model/auth";

class LoginPresenter {
  constructor(view) {
    this.view = view;
  }

  async handleLogin({ email, password }) {
    this.view.showSpinner();
    this.view.disableButton();

    const result = await Auth.login({ email, password });

    this.view.hideSpinner();
    this.view.enableButton();

    if (result.success) {
      this.view.navigateToHome();
    } else {
      this.view.showError(result.message || "Login gagal. Coba lagi.");
    }
  }
}

export default LoginPresenter;
