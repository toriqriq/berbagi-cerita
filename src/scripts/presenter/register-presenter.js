import Auth from "../model/auth.js";

class RegisterPresenter {
  constructor(view) {
    this.view = view;
  }

  async handleRegister({ name, email, password }) {
    this.view.showSpinner();
    this.view.disableButton();

    const result = await Auth.register({ name, email, password });

    this.view.hideSpinner();
    this.view.enableButton();

    if (result.success) {
      this.view.showSuccess("Pendaftaran berhasil. Silakan login.");
      this.view.navigateToLogin();
    } else {
      this.view.showError(result.message);
    }
  }
}

export default RegisterPresenter;
