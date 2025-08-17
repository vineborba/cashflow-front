import { apiClient } from "./client";

export const authService = {
  async signIn(email: string, password: string) {
    const body = JSON.stringify({ email, password });
    await apiClient.post("auth/sign-in", { body }).text();
  },

  async signOut() {
    await apiClient.post("auth/sign-out").text();
  },

  async signUp() {},
};
