import { apiClient } from "./client";

export const authService = {
  async signIn(email: string, password: string) {
    const body = JSON.stringify({ email, password });
    await apiClient.post("auth/sign-in", { body }).text();
  },

  async signOut() {
    await apiClient.post("auth/sign-out").text();
  },

  async signUp(name: string, email: string, password: string) {
    const body = JSON.stringify({ name, email, password, terms: true });
    await apiClient.post("auth/sign-up", { body }).text();
  },

  async activateAccount(token: string) {
    const body = JSON.stringify({ token });
    await apiClient.post("auth/activate", { body }).text();
  },
};
