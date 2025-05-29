// pages/story/story-presenter.js

class StoryPresenter {
  constructor({ view, model }) {
    this.view = view;
    this.model = model;
  }

  async init() {
    try {
      const response = await this.model.getAllStories();
      this.view.showStories(response.listStory);
    } catch (error) {
      this.view.showError(error.message);
    }
  }
}

export default StoryPresenter;
