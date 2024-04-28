import type { Article, ApiResponse } from "./types";
import { withErrorHandling } from "./error/errorHandler";

const NEWS_URL = "https://newsapi.org/v2";

export const fetchTechnologyNews = withErrorHandling(
  async (): Promise<Article[]> => {
    const params = {
      q: "technology programming",
      language: "en",
      sortBy: "popularity",
      pageSize: "10",
      apikey: Bun.env.API_KEY as string,
    };
    const urlQuery = new URLSearchParams(params);
    const response = await fetch(`${NEWS_URL}/everything?${urlQuery}`);
    if (!response.ok) throw new Error("Failed to fetch news");
    const data: ApiResponse = await response.json();

    return data.articles;
  }
);
