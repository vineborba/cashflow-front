import { apiClient } from "./client";

export const userService = {
  async loadUserData() {
    const data = await apiClient.get("users/me").json<User>();

    return data;
  },
};
