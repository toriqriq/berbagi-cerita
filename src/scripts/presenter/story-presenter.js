// pages/story/story-presenter.js

class StoryPresenter {
  constructor({ view, model }) {
    this.view = view;
    this.model = model;
    this.stories = [];
  }

  async init() {
    try {
      const response = await this.model.getAllStories();
      this.stories = response.listStory;
      this.view.showStories(this.stories);
      this.view.bindSaveButton(this.handleSaveStory.bind(this));
    } catch (error) {
      this.view.showError(error.message);
    }
  }

  async handleSaveStory(id) {
    const story = this.stories.find((s) => s.id === id);
    if (story) {
      try {
        await this.model.saveToFavorites(story);
        alert("Cerita berhasil disimpan!");
      } catch (error) {
        alert("Gagal menyimpan cerita: " + error.message);
      }
    }
  }
}

export default StoryPresenter;
