class FavoritePresenter {
  constructor({ view, model }) {
    this.view = view;
    this.model = model;
  }

  async init() {
    try {
      const favorites = await this.model.getAll();
      this.view.showFavorites(favorites, this.handleDelete.bind(this));
    } catch (error) {
      this.view.showError(error.message);
    }
  }

  async handleDelete(id) {
    try {
      await this.model.delete(id);
      const favorites = await this.model.getAll();
      this.view.showFavorites(favorites, this.handleDelete.bind(this));
    } catch (error) {
      this.view.showError("Gagal menghapus favorit.");
    }
  }
}

export default FavoritePresenter;
