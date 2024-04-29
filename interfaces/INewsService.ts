import type { Article } from "../types/types";

export interface INewsService {
  fetchNews: () => Promise<Article[]>;
}
