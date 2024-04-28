import { fetchTechnologyNews } from "./fetchNews";
import type { Article } from "./types";
import { promises as fsPromises } from "fs";

export const updateReadme = async () => {
  try {
    const articles = await fetchTechnologyNews();
    const markdownContent = generateMarkdownList(articles);
    const readmeTemplate = `# Latest Technology News\n\n## Top 10 Articles\n\n${markdownContent}\n`;
  
    await fsPromises.writeFile("README.md", readmeTemplate)
  } catch (error) {
    console.error("Failed to update README.md:", error);
  }
};

const generateMarkdownList = (articles: Article[]): string => {
  return articles
    .map(article => {
      const imageMarkdown = article.urlToImage
        ? `![Image](${article.urlToImage})`
        : `![No image available](default-image-url)`;
      return `- ${imageMarkdown}\n - [${article.title}](${article.url}) - ${article.description}`;
    })
    .join("\n\n");
};
