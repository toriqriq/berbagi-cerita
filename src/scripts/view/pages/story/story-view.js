// pages/story/story-view.js

class StoryView {
  constructor() {
    this.storyListContainer = null;
  }

  render() {
    return `
      <section class="container mt-5">
        <h2 class="mb-4">Cerita Pengguna</h2>
        <div id="story-list" class="row row-cols-1 row-cols-md-2 g-4"></div>
      </section>
    `;
  }

  setup() {
    this.storyListContainer = document.getElementById("story-list");
  }

  showStories(stories) {
    if (!this.storyListContainer) return;

    this.storyListContainer.innerHTML = "";
    stories.forEach((story) => {
      const storyCard = document.createElement("div");
      storyCard.classList.add("col");
      storyCard.innerHTML = `
        <div class="card h-100">
          <div class="card-body">
            <p class="card-text">${story.name}</p>
            <div class="card mx-auto" style="max-width: 300px; max-height: 300px;">
              <img src="${
                story.photoUrl
              }" class="card-img-top" alt="Foto cerita pengguna" title="Foto cerita pengguna" />
            </div>
            <div class="card-body">
              <p class="card-text">${story.description}</p>
              <p class="text-muted">Dibuat pada: ${new Date(
                story.createdAt
              ).toLocaleString()}</p>
              <a href="#/story/${
                story.id
              }" class="btn btn-outline-primary mt-2">Lihat Detail</a>
            </div>
          </div>
        </div>
      `;
      this.storyListContainer.appendChild(storyCard);
    });
  }

  showError(message) {
    if (!this.storyListContainer) return;
    this.storyListContainer.innerHTML = `<p class="text-danger">Gagal memuat cerita. ${message}</p>`;
  }
}

export default StoryView;
