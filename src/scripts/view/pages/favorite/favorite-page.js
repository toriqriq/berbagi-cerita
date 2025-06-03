import FavoriteView from "./favorite-view.js";
import FavoriteModel from "../../../model/db/favorite-idb.js";
import FavoritePresenter from "../../../presenter/favorite/favorite-presenter.js";

class FavoritePage {
  constructor() {
    this.view = new FavoriteView();
    this.model = FavoriteModel; // langsung object
    this.presenter = new FavoritePresenter({
      view: this.view,
      model: this.model,
    });
  }

  async render() {
    const content = this.view.render();
    document.getElementById("main-content").innerHTML = content;
    return content; // ⛔️ jangan panggil setup di sini
  }

  async afterRender() {
    this.view.setup(); // ✅ panggil setup setelah DOM siap
    await this.presenter.init(); // ✅ tampilkan data
  }
}

export default FavoritePage;
