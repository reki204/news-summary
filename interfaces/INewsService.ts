import type { Article } from "../types";

export interface INewsService {
  fetchNews: () => Promise<Article[]>;
}
