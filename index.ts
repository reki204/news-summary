import { fetchTechnologyNews } from "./fetchNews";

async function main() {
  const news = await fetchTechnologyNews();
  console.log(news);
}

main();
