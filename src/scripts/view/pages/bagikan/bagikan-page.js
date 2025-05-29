import Auth from "../../../model/auth";
import BagikanPresenter from "../../../presenter/bagikan-presenter";
import L from "leaflet";

export default class BagikanPage {
  async render() {
    return `
      <section class="container mt-5">
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6">
            <h2 class="mb-4 text-center">Bagikan Cerita Anda</h2>
            <form id="shareForm" class="p-4 border rounded bg-light shadow-sm">
              <div class="mb-3">
                <label for="description" class="form-label">Deskripsi Cerita</label>
                <textarea class="form-control" id="description" rows="4" placeholder="Tulis kisah Anda di sini..." required></textarea>
              </div>

       <div class="mb-3">
  <label class="form-label">Foto</label>
  <div class="d-flex flex-column align-items-center">
    <button type="button" class="btn btn-primary mb-2" data-bs-toggle="modal" data-bs-target="#cameraModal">
      Ambil Foto
    </button>
    <img id="photoPreview" class="rounded d-none" style="max-width: 300px;" alt="Pratinjau Foto" />
  </div>
</div>

              <div class="mb-3">
                <label class="form-label">Pilih Lokasi</label>
                <div id="map" style="height: 300px;" class="rounded mb-2"></div>
                <small class="text-muted">Klik pada peta untuk memilih lokasi cerita Anda.</small>
              </div>
              
              <input type="hidden" id="lat" name="lat" />
              <input type="hidden" id="lon" name="lon" />
              <div class="d-grid">
                <button type="submit" class="btn btn-primary">Kirim Cerita</button>
              </div>
            </form>

            <div class="modal fade" id="cameraModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content p-3">
      <h5 class="modal-title mb-2">Ambil Foto</h5>
      <video id="camera-video" autoplay playsinline class="w-100 rounded border mb-2"></video>
      <canvas id="camera-canvas" class="d-none" width="300" height="225"></canvas>
      <div class="d-flex justify-content-between flex-wrap gap-2">
  <div class="d-flex gap-2">
    <button type="button" class="btn btn-outline-primary" id="start-camera">Buka Kamera</button>
    <button type="button" class="btn btn-outline-danger" id="stop-camera">Tutup Kamera</button>
  </div>
  <div class="d-flex gap-2">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
    <button type="button" class="btn btn-primary" id="camera-take-button">Ambil</button>
  </div>
</div>

    </div>
  </div>
</div>

            <div id="uploadResult" class="mt-3"></div>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    const presenter = new BagikanPresenter({
      tampilkanSukses: (pesan) => {
        resultContainer.innerHTML = `<div class="alert alert-success">${pesan}</div>`;
        form.reset();
        marker?.remove();
        map.setView([0, 0], 2);
        latInput.value = "";
        lonInput.value = "";
        capturedBlob = null;
        document.getElementById("photoPreview").classList.add("d-none");
      },
      tampilkanError: (pesan) => {
        resultContainer.innerHTML = `<div class="alert alert-danger">${pesan}</div>`;
      },
    });

    document
      .getElementById("camera-take-button")
      .addEventListener("click", () => {
        const video = document.getElementById("camera-video");
        const canvas = document.getElementById("camera-canvas");
        const preview = document.getElementById("photoPreview");
        const ctx = canvas.getContext("2d");

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            capturedBlob = blob;
            preview.src = URL.createObjectURL(blob);
            preview.classList.remove("d-none");

            // Tutup modal dan hentikan kamera
            const modalElement = document.getElementById("cameraModal");
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();

            // Paksa stop kamera (jaga-jaga jika event hidden.bs.modal delay)
            stopCamera();
          },
          "image/jpeg",
          0.95
        );
      });

    // Tombol "Buka Kamera"
    document
      .getElementById("start-camera")
      .addEventListener("click", startupCamera);

    // Tombol "Tutup Kamera"
    document
      .getElementById("stop-camera")
      .addEventListener("click", stopCamera);

    const form = document.getElementById("shareForm");
    const resultContainer = document.getElementById("uploadResult");
    const latInput = document.getElementById("lat");
    const lonInput = document.getElementById("lon");

    document
      .getElementById("cameraModal")
      .addEventListener("hidden.bs.modal", stopCamera);

    // Buat custom icon sama seperti halaman detail
    const customIcon = L.icon({
      iconUrl: "marker.svg", // pastikan marker.svg ada di folder public/dist
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    const mapContainer = document.getElementById("map");
    if (mapContainer._leaflet_id) {
      return; // Jangan inisialisasi ulang jika peta sudah ada
    }

    const map = L.map("map").setView([0, 0], 2);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    let marker;

    // Coba akses lokasi pengguna
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          map.setView([lat, lon], 13);
          marker = L.marker([lat, lon], {
            draggable: true,
            icon: customIcon,
          }).addTo(map);
          latInput.value = lat;
          lonInput.value = lon;

          marker.on("dragend", (e) => {
            const newPos = e.target.getLatLng();
            latInput.value = newPos.lat;
            lonInput.value = newPos.lng;
          });
        },
        () => {
          console.warn("Akses lokasi ditolak.");
        }
      );
    }

    // Tambahkan marker saat klik peta
    map.on("click", function (e) {
      const { lat, lng } = e.latlng;
      if (marker) {
        marker.setLatLng([lat, lng]);
      } else {
        marker = L.marker([lat, lng], {
          draggable: true,
          icon: customIcon,
        }).addTo(map);
        marker.on("dragend", (e) => {
          const newPos = e.target.getLatLng();
          latInput.value = newPos.lat;
          lonInput.value = newPos.lng;
        });
      }
      latInput.value = lat;
      lonInput.value = lng;
    });

    // Form submission tetap seperti sebelumnya
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const description = document.getElementById("description").value;
      const lat = latInput.value;
      const lon = lonInput.value;

      presenter.kirimCerita({
        description,
        photo: capturedBlob,
        lat,
        lon,
      });
    });
  }
}

//camera
let capturedBlob = null;
let cameraStream = null;

async function startupCamera() {
  const video = document.getElementById("camera-video");
  try {
    if (!cameraStream) {
      cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = cameraStream;
    }
  } catch (err) {
    alert("Tidak dapat mengakses kamera: " + err.message);
  }
}

function stopCamera() {
  if (cameraStream) {
    cameraStream.getTracks().forEach((track) => track.stop());
    cameraStream = null;
    document.getElementById("camera-video").srcObject = null;
  }
}
