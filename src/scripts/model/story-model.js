// model/story-model.js

import { getStories } from "./story-api";

const StoryModel = {
  async getAllStories() {
    return await getStories();
  },
};

export default StoryModel;
