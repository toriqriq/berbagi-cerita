class FavoriteView {
  constructor() {
    this.favoriteContainer = null;
  }

  render() {
    return `
      <section class="container mt-5">
        <h2 class="mb-4">Cerita Favorit</h2>
        <div id="favorite-list" class="row row-cols-1 row-cols-md-2 g-4"></div>
      </section>
    `;
  }

  setup() {
    this.favoriteContainer = document.getElementById("favorite-list");
  }

  showFavorites(favorites, onDeleteClick) {
    if (!this.favoriteContainer) return;

    this.favoriteContainer.innerHTML = "";

    if (favorites.length === 0) {
      this.favoriteContainer.innerHTML = `<p class="text-muted">Belum ada cerita favorit.</p>`;
      return;
    }

    favorites.forEach((story) => {
      const card = document.createElement("div");
      card.classList.add("col");
      card.innerHTML = `
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${story.name}</h5>
            <img src="${story.photoUrl}" alt="Foto" class="img-fluid mb-3" />
            <p class="card-text">${story.description}</p>
            <button class="btn btn-danger btn-sm" data-id="${story.id}">Hapus</button>
          </div>
        </div>
      `;
      const deleteBtn = card.querySelector("button");
      deleteBtn.addEventListener("click", () => onDeleteClick(story.id));
      this.favoriteContainer.appendChild(card);
    });
  }

  showError(message) {
    if (!this.favoriteContainer) return;
    this.favoriteContainer.innerHTML = `<p class="text-danger">Gagal memuat data: ${message}</p>`;
  }
}

export default FavoriteView;
