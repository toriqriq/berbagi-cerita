import StoryDetailModel from "../model/story-detail-model.js";
import StoryDetailView from "../view/pages/story/story-detail-view.js";

class StoryDetailPresenter {
  constructor({ view, model, storyId }) {
    this.view = view;
    this.model = model;
    this.storyId = storyId;
  }

  async init() {
    this.view.setup();

    try {
      const story = await this.model.fetchStory(this.storyId);

      if (!story) {
        this.view.showError("Story tidak ditemukan.");
        return;
      }

      this.view.showStoryDetail(story);
    } catch (error) {
      this.view.showError(`Gagal memuat cerita: ${error.message}`);
    }
  }
}

export default StoryDetailPresenter;
