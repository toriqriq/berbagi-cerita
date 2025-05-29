// pages/story/story-page.js

import StoryView from "./story-view.js";
import StoryModel from "../../../model/story-model.js";
import StoryPresenter from "../../../presenter/story-presenter.js";

export default class StoryPage {
  constructor() {
    this.view = new StoryView();
    this.presenter = new StoryPresenter({
      view: this.view,
      model: StoryModel,
    });
  }

  async render() {
    return this.view.render();
  }

  async afterRender() {
    this.view.setup(); // Setup elemen DOM
    await this.presenter.init(); // Jalankan logika presenter
  }
}
