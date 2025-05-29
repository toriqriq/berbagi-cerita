class LandingPage {
  async render() {
    return `
      <section class="landing d-flex justify-content-center align-items-center min-vh-100 bg-light text-center">
        <div class="container py-5">
          <h1 id="landing-heading" class="display-4 mb-4 fade-in">Selamat Datang di Aplikasi Saya</h1>
          <p id="landing-description" class="lead mb-4 fade-in">Aplikasi untuk berbagi cerita dengan teman-teman!</p>
          <div id="landing-links" class="d-flex justify-content-center gap-3">
            <a href="#/login" id="loginLink" class="btn btn-primary btn-lg fade-in" role="button">Login</a>
            <a href="#/register" id="registerLink" class="btn btn-outline-secondary btn-lg fade-in" role="button">Daftar</a>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    // Tidak ada interaksi khusus untuk landing page ini
    this.addFadeInAnimation();
  }

  addFadeInAnimation() {
    // Menambahkan kelas fade-in dengan transisi untuk elemen
    const fadeInElements = document.querySelectorAll(".fade-in");
    fadeInElements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add("fade-in-visible");
      }, index * 300); // Memberikan delay untuk tiap elemen muncul
    });
  }
}

export default LandingPage;
