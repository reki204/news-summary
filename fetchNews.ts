const NEWS_URL = 'https://newsapi.org/v2';

export async function fetchTechnologyNews() {
  const params = {
    q: 'technology programming',
    language: 'en',
    sortBy: 'popularity',
    apikey: Bun.env.API_KEY as string,
  }
  const url_query = new URLSearchParams(params);
  try {
    const response = await fetch(`${NEWS_URL}/everything?${url_query}`);
    const data = await response.json();
    return data.articles;
  } catch (err) {
    console.error('Error fetching News:', err);
    return [];
  }
};
