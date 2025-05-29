export default class HomePage {
  async render() {
    return `
      <section class="container text-center mt-5">
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6">
            <h1 class="display-4 mb-4">Selamat datang di <span class="brand-name">Berbagi Cerita</span></h1>
            <p class="lead mb-4">Aplikasi tempat dimana kisah hidup Anda bisa berbagi dengan dunia. Temukan cerita menarik dan bagikan pengalaman Anda dengan orang lain.</p>
            <a href="#/story" class="btn btn-primary btn-lg">Lihat Cerita Mereka</a>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    // Tidak ada interaksi khusus, hanya layout yang lebih rapi
  }
}
