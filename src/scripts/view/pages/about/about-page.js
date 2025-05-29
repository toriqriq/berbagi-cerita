export default class AboutPage {
  async render() {
    return `
      <section class="container py-5 bg-light">
        <div class="row justify-content-center">
          <div class="col-md-8 bg-white rounded shadow-sm p-4">
            <h1 class="text-center text-primary mb-4">Tentang Aplikasi Berbagi Cerita</h1>

            <p class="lead text-center text-secondary mb-5">
              Aplikasi ini memudahkan Anda untuk berbagi momen cerita dan pengalaman dengan teman-teman, serta membangun koneksi di dalamnya.
            </p>

            <div class="mb-4">
              <h5 class="text-primary">Informasi Pembuat</h5>
              <p>
                <strong>Nama:</strong> Muhammad Toriq<br>
                <strong>Alamat:</strong> Jl. Langit Bumi<br>
                <strong>Telepon:</strong> +62 22 555 2222<br>
                <strong>Email:</strong> support@berbagicerita.com
              </p>
            </div>

            <div class="mb-4">
              <h5 class="text-primary">Pembuatan Aplikasi</h5>
              <p>
                Aplikasi ini dikembangkan oleh <strong>Saya Sendiri</strong>, menggunakan teknologi modern seperti HTML5, CSS3, dan JavaScript.
              </p>
            </div>

            <div class="mb-4">
              <h5 class="text-primary">Informasi Legal</h5>
              <p>
                Untuk memahami lebih lanjut tentang cara kami mengelola data Anda, silakan baca <a href="/privacy-policy" class="text-primary">Kebijakan Privasi</a> dan <a href="/terms-of-service" class="text-primary">Syarat Penggunaan</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    // Tidak ada interaksi khusus
  }
}
