import { getStoryDetailById } from "./story-api";

const StoryDetailModel = {
  async fetchStory(id) {
    return await getStoryDetailById(id);
  },
};

export default StoryDetailModel;
