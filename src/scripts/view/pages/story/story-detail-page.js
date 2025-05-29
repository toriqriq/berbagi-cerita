import StoryDetailView from "./story-detail-view.js";
import StoryDetailModel from "../../../model/story-detail-model.js";
import StoryDetailPresenter from "../../../presenter/story-detail-presenter.js";

export default class StoryDetailPage {
  async render() {
    const view = new StoryDetailView();
    return view.render();
  }

  async afterRender() {
    const view = new StoryDetailView();
    const model = StoryDetailModel;
    // Dapatkan ID cerita dari URL (seharusnya dari router)
    const storyId = window.location.hash.split("/")[2];

    const presenter = new StoryDetailPresenter({
      view,
      model,
      storyId,
    });

    await presenter.init();
  }
}
