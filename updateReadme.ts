import { fetchTechnologyNews } from "./fetchNews";
import type { Article } from "./types";
import { promises as fsPromises } from "fs";
import { withErrorHandling } from "./error/errorHandler";

export const updateReadme = withErrorHandling(async () => {
  const articles = await fetchTechnologyNews();
  if (!(Array.isArray(articles))) throw new Error("Failed to fetch articles");
  const markdownContent = generateMarkdownList(articles);
  const readmeTemplate = `# Latest Technology News\n\n## Top 10 Articles\n\n${markdownContent}\n`;
  await fsPromises.writeFile("README.md", readmeTemplate);
});

const generateMarkdownList = (articles: Article[]): string => {
  return articles
    .map((article) => {
      const imageMarkdown = article.urlToImage
        ? `![Image](${article.urlToImage})`
        : `![No image available](default-image-url)`;
      return `- ${imageMarkdown}\n - [${article.title}](${article.url}) - ${article.description}`;
    })
    .join("\n\n");
};
