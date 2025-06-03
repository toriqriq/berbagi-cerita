// model/story-model.js

import { getStories } from "./story-api";
import FavoriteDB from "./db/favorite-idb.js";

const StoryModel = {
  async getAllStories() {
    return await getStories();
  },
  async saveToFavorites(story) {
    return FavoriteDB.put(story);
  },
};

export default StoryModel;
