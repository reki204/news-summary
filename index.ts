import { NewsService } from "./services/fetchNews";
import { ReadmeUpdater } from "./updateReadme";

const server = Bun.serve({
  port: 8080,
  async fetch(req) {
    const path = new URL(req.url).pathname;

    if (path === "/") return Response.json({ message: "hello" });

    if (path === "/api/news") {
      const newsService = new NewsService();
      const readmeUpdater = new ReadmeUpdater(newsService);
      return await readmeUpdater.updateReadme();
    }
    return new Response("Page not found", { status: 404 });
  },
});

console.log(`Listening on ${server.url}`);
