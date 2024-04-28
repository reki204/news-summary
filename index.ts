import { fetchTechnologyNews } from "./fetchNews";

const server = Bun.serve({
  port: 8080,
  async fetch(req) {
    const path = new URL(req.url).pathname;

    if (path === "/") return Response.json({ message: "hello" });

    if (path === "/api/news") {
      const articles = await fetchTechnologyNews();
      return new Response(JSON.stringify(articles), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    }
    return new Response("Page not found", { status: 404 });
  },
});

console.log(`Listening on ${server.url}`);
