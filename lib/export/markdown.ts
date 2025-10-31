export interface ExportItem {
  title: string;
  content: string;
  metadata?: Record<string, string | number | boolean>;
}

export function exportToMarkdown(items: ExportItem[]): string {
  const timestamp = new Date().toISOString().split("T")[0];
  let markdown = `# Export - ${timestamp}\n\n`;

  items.forEach((item, index) => {
    markdown += `## ${item.title}\n\n`;

    if (item.metadata) {
      markdown += `**Metadados:**\n`;
      Object.entries(item.metadata).forEach(([key, value]) => {
        markdown += `- **${key}:** ${value}\n`;
      });
      markdown += `\n`;
    }

    markdown += `${item.content}\n\n`;

    if (index < items.length - 1) {
      markdown += `---\n\n`;
    }
  });

  return markdown;
}

export function downloadMarkdown(markdown: string, filename: string) {
  const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.md`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
