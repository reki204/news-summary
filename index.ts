import { fetchTechnologyNews } from "./fetchNews";
import { updateReadme } from "./updateReadme";

const server = Bun.serve({
  port: 8080,
  async fetch(req) {
    const path = new URL(req.url).pathname;

    if (path === '/') return Response.json({ message: 'hello' });

    if (path === '/api/news') {
      try {
        const articles = await fetchTechnologyNews();
        updateReadme();
        return new Response(JSON.stringify(articles), {
          headers: { 'Content-Type': 'application/json' },
          status: 200
        });
      } catch (err) {
        console.error("Error fetching News:", err);
        return new Response(JSON.stringify({ error: err }), {
          headers: { 'Content-Type': 'application/json' },
          status: 500
        });
      }
    }

    return new Response('Page not found', { status: 404});
  },
});

console.log(`Listening on ${server.url}`);
