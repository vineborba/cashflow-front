import { HTTPError } from "ky";

export class ApiError extends HTTPError {
  public extractedMessage: string;

  constructor(extractedMessage: string, originalError: HTTPError) {
    super(originalError.response, originalError.request, originalError.options);
    this.name = "ApiError";
    this.extractedMessage = extractedMessage;
    this.message = extractedMessage;
  }
}

export async function extractErrorMessage(error: HTTPError): Promise<string> {
  const fallbackMessage = "Ocorreu um erro inesperado";

  try {
    const contentType = error.response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      try {
        const errorData = (await error.response.json()) as any;

        if (errorData && typeof errorData === "object") {
          if (errorData.message && typeof errorData.message === "string") {
            return errorData.message;
          } else if (errorData.error && typeof errorData.error === "string") {
            return errorData.error;
          }
        }
      } catch (jsonParseError) {
        console.error("Failed to parse JSON error response", jsonParseError);
      }
    }

    if (contentType.includes("text/plain")) {
      try {
        const textMessage = await error.response.text();
        if (textMessage && textMessage.trim().length > 0) {
          return textMessage.trim();
        }
      } catch (textParseError) {
        console.error("Failed to parse text error response", textParseError);
      }
    }

    if (!contentType.includes("application/json")) {
      try {
        const textMessage = await error.response.text();
        if (textMessage && textMessage.trim().length > 0) {
          return textMessage.trim();
        }
      } catch (textParseError) {
        console.error(
          "Failed to parse fallback text error response",
          textParseError,
        );
      }
    }
  } catch (parseError) {
    console.error("Failed to parse error response", parseError);
  }

  return fallbackMessage;
}
