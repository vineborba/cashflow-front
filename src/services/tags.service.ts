import { apiClient } from "./client";

export const tagsService = {
  listTags: async () => {
    const data = await apiClient.get("tags").json<Tag[]>();

    return data;
  },

  createTag: async (tagData: NewTag) => {
    const data = await apiClient
      .post("tags", {
        body: JSON.stringify(tagData),
      })
      .json<Tag>();

    return data;
  },

  deleteTag: async (tagId: string) => {
    await apiClient.delete(`tags/${tagId}`);
  },
};
