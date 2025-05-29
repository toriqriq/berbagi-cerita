// login-page.js
import LoginPresenter from "../../../presenter/login-presenter";

class LoginPage {
  constructor() {
    this.presenter = new LoginPresenter(this);
  }

  async render() {
    return `
      <section class="login container mt-5">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <h2 class="text-center mb-4">Login</h2>
            <form id="loginForm" class="p-4 border rounded bg-light shadow-sm">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div class="d-grid">
                <button type="submit" class="btn btn-primary" id="loginButton">Login</button>
              </div>
            </form>
            <div id="spinner" class="d-none text-center mt-3">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <div id="errorMessage" class="text-danger text-center mt-2"></div>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      this.presenter.handleLogin({ email, password });
    });
  }

  // ✅ Method-method View: hanya urus tampilan
  showSpinner() {
    document.getElementById("spinner").classList.remove("d-none");
  }

  hideSpinner() {
    document.getElementById("spinner").classList.add("d-none");
  }

  disableButton() {
    document.getElementById("loginButton").disabled = true;
  }

  enableButton() {
    document.getElementById("loginButton").disabled = false;
  }

  showError(message) {
    document.getElementById("errorMessage").textContent = message;
  }

  navigateToHome() {
    window.dispatchEvent(new Event("userloggedin"));
    window.location.hash = "#/home";
  }
}

export default LoginPage;
