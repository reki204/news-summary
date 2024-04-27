import type { Article, ApiResponse } from "./types";

const NEWS_URL = "https://newsapi.org/v2";

export const fetchTechnologyNews = async (): Promise<Article[]> => {
  const params = {
    q: "technology programming",
    language: "en",
    sortBy: "popularity",
    apikey: Bun.env.API_KEY as string,
  };
  const urlQuery = new URLSearchParams(params);

  try {
    const response = await fetch(`${NEWS_URL}/everything?${urlQuery}`);
    const data: ApiResponse = await response.json();
    return data.articles;
  } catch (err) {
    console.error("Error fetching News:", err);
    return [];
  }
};
