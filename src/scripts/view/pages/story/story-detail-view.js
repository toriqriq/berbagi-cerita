import L from "leaflet";

class StoryDetailView {
  constructor() {
    this.detailContainer = null;
  }

  render() {
    return `
      <section class="container mt-4" id="storyDetail">
        <p>Memuat cerita...</p>
      </section>
    `;
  }

  setup() {
    this.detailContainer = document.getElementById("storyDetail");
  }

  showStoryDetail(story) {
    if (!this.detailContainer) return;

    this.detailContainer.innerHTML = `
      <div class="card mx-auto" style="max-width: 600px;">
        <img src="${story.photoUrl}" class="card-img-top" alt="${
      story.name
    }" title="Foto cerita pengguna :${story.name}">
        <div class="card-body">
          <h5 class="card-title">${story.name}</h5>
          <p class="card-text">${story.description}</p>
          <p class="text-muted">Dibuat pada: ${new Date(
            story.createdAt
          ).toLocaleString()}</p>
          <div id="map" style="height: 300px;" class="mb-3 rounded"></div>
        </div>
      </div>
    `;

    this._initMap(story);
  }

  showError(message) {
    if (!this.detailContainer) return;
    this.detailContainer.innerHTML = `<p class="text-danger">${message}</p>`;
  }

  _initMap(story) {
    const customIcon = L.icon({
      iconUrl: "marker.svg",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    const map = L.map("map").setView([story.lat, story.lon], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([story.lat, story.lon], { icon: customIcon })
      .addTo(map)
      .bindPopup(`<b>${story.name}</b><br>${story.description}`)
      .openPopup();
  }
}

export default StoryDetailView;
