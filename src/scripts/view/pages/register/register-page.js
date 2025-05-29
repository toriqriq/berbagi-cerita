import RegisterPresenter from "../../../presenter/register-presenter.js";

class RegisterPage {
  constructor() {
    this.presenter = new RegisterPresenter(this);
  }

  async render() {
    return `
      <section class="register container mt-5">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <h2 class="text-center mb-4">Daftar</h2>
            <form id="registerForm" class="p-4 border rounded bg-light shadow-sm">
              <div class="mb-3">
                <label for="name" class="form-label">Nama Lengkap</label>
                <input type="text" id="name" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" id="password" class="form-control" minlength="8" required />
              </div>
              <div class="d-grid">
                <button type="submit" class="btn btn-success" id="registerButton">Daftar</button>
              </div>
            </form>
            <div id="spinner" class="d-none text-center mt-3">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    const form = document.getElementById("registerForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      this.presenter.handleRegister({ name, email, password });
    });
  }

  showSpinner() {
    document.getElementById("spinner").classList.remove("d-none");
  }

  hideSpinner() {
    document.getElementById("spinner").classList.add("d-none");
  }

  disableButton() {
    document.getElementById("registerButton").disabled = true;
  }

  enableButton() {
    document.getElementById("registerButton").disabled = false;
  }

  showError(message) {
    alert(`Gagal daftar: ${message}`);
  }

  showSuccess(message) {
    alert(message);
  }

  navigateToLogin() {
    window.location.hash = "/login";
  }
}

export default RegisterPage;
