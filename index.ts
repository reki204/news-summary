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

      try {
        await readmeUpdater.updateReadme();
        return new Response(JSON.stringify({ message: "Readme updated successfully" }), {
          headers: { 'Content-Type': 'application/json' },
          status: 200
        });
      } catch (error) {
        console.error("Error updating Readme:", error);
        return new Response(JSON.stringify({ error: error }), {
          headers: { 'Content-Type': 'application/json' },
          status: 500
        });
      }
    }
    return new Response("Page not found", { status: 404 });
  },
});

console.log(`Listening on ${server.url}`);
