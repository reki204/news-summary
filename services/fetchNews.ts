import type { Article, ApiResponse } from "../types/types";
import type { INewsService } from "../interfaces/INewsService";

const NEWS_URL = "https://newsapi.org/v2";

export class NewsService implements INewsService {
  private params = {
    q: "technology programming",
    language: "en",
    sortBy: "popularity",
    pageSize: "20",
    apikey: Bun.env.API_KEY as string,
  };
  private urlQuery = new URLSearchParams(this.params);

  async fetchNews(): Promise<Article[]> {
    const response = await fetch(`${NEWS_URL}/everything?${this.urlQuery}`);
    if (!response.ok) throw new Error("Failed to fetch news");
    const data: ApiResponse = await response.json();

    return data.articles;
  }
}
