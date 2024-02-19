import { AnswerResponse, SearchRequest } from "./models";

export const aiSearchApi = async (request: SearchRequest) => {
  const response = await fetch("/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: request.query,
    }),
  });
  const parsedResponse: AnswerResponse = await response.json();
  if (response.status > 299 || !response.ok) {
    throw Error(parsedResponse.error || "Unknown Error");
  }
  return parsedResponse.answer;
};
