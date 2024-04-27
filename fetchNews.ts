const NEWS_URL = 'https://newsapi.org/v2';

interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

interface ApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export async function fetchTechnologyNews(): Promise<Article[]> {
  const params = {
    q: 'technology programming',
    language: 'en',
    sortBy: 'popularity',
    apikey: Bun.env.API_KEY as string,
  }
  const url_query = new URLSearchParams(params);

  try {
    const response = await fetch(`${NEWS_URL}/everything?${url_query}`);
    const data: ApiResponse = await response.json();
    return data.articles;
  } catch (err) {
    console.error('Error fetching News:', err);
    return [];
  }
};
