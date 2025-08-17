import ky from "ky";
import { CookieJar } from "tough-cookie";

const cookieJar = new CookieJar();

export const apiClient = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
  hooks: {
    beforeRequest: [
      async (request) => {
        const url = request.url;
        const cookies = await cookieJar.getCookies(url);
        const cookieString = cookies.join("; ");
        request.headers.set("cookie", cookieString);
      },
    ],
    afterResponse: [
      async (request, _options, response) => {
        const url = request.url;
        const cookies = response.headers.getSetCookie();
        if (cookies) {
          for (const cookie of cookies) {
            await cookieJar.setCookie(cookie, url);
          }
        }
      },
    ],
  },
});
