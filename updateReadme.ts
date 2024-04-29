import type { Article } from "./types/types";
import { promises as fsPromises } from "fs";
import { withErrorHandling } from "./error/errorHandler";
import type { INewsService } from "./interfaces/INewsService";

export class ReadmeUpdater {
  constructor(private newsService: INewsService) {}

  updateReadme = withErrorHandling(async () => {
    const articles = await this.newsService.fetchNews();
    if (!Array.isArray(articles)) throw new Error("Failed to fetch articles");
    const markdownContent = this.generateMarkdownList(articles);
    const readmeTemplate = `# Latest Technology News\n\n## Top 20 Articles\n\n${markdownContent}\n`;
    await fsPromises.writeFile("README.md", readmeTemplate);
  });

  private generateMarkdownList(articles: Article[]): string {
    return articles
      .map((article) => {
        const imageMarkdown = article.urlToImage
          ? `![Image](${article.urlToImage})`
          : `![No image available](default-image-url)`;
        return `- ${imageMarkdown}\n - [${article.title}](${article.url}) - ${article.description}`;
      })
      .join("\n\n");
  }
}
