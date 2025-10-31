export interface ExportItem {
  title: string;
  content: string;
  metadata?: Record<string, string | number | boolean>;
}

/**
 * Export to PDF using browser's print functionality
 * This creates a clean, printable HTML page that can be saved as PDF
 */
export function exportToPDF(items: ExportItem[], filename: string) {
  const timestamp = new Date().toLocaleDateString("pt-BR");

  // Create HTML content
  let htmlContent = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${filename}</title>
      <style>
        @page {
          margin: 2cm;
        }
        body {
          font-family: system-ui, -apple-system, sans-serif;
          line-height: 1.6;
          color: #1a1a1a;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        h1 {
          font-size: 28px;
          margin-bottom: 10px;
          color: #000;
          border-bottom: 2px solid #000;
          padding-bottom: 10px;
        }
        h2 {
          font-size: 22px;
          margin-top: 30px;
          margin-bottom: 15px;
          color: #333;
        }
        .metadata {
          background: #f5f5f5;
          padding: 15px;
          border-radius: 5px;
          margin: 15px 0;
          font-size: 14px;
        }
        .metadata-item {
          margin: 5px 0;
        }
        .metadata-label {
          font-weight: bold;
          color: #555;
        }
        .content {
          margin: 20px 0;
          white-space: pre-wrap;
          font-size: 14px;
        }
        .divider {
          border-top: 1px solid #ddd;
          margin: 40px 0;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          font-size: 12px;
          color: #666;
          text-align: center;
        }
        @media print {
          .no-print {
            display: none;
          }
        }
      </style>
    </head>
    <body>
      <h1>${filename}</h1>
      <p class="no-print" style="color: #666; font-size: 14px; margin-bottom: 30px;">
        Exportado em: ${timestamp} | Use Ctrl+P / Cmd+P para salvar como PDF
      </p>
  `;

  items.forEach((item, index) => {
    htmlContent += `
      <h2>${item.title}</h2>
    `;

    if (item.metadata && Object.keys(item.metadata).length > 0) {
      htmlContent += `<div class="metadata">`;
      Object.entries(item.metadata).forEach(([key, value]) => {
        htmlContent += `
          <div class="metadata-item">
            <span class="metadata-label">${key}:</span> ${value}
          </div>
        `;
      });
      htmlContent += `</div>`;
    }

    htmlContent += `
      <div class="content">${item.content}</div>
    `;

    if (index < items.length - 1) {
      htmlContent += `<div class="divider"></div>`;
    }
  });

  htmlContent += `
      <div class="footer">
        Gerado por Interview Prep App
      </div>
    </body>
    </html>
  `;

  // Open in new window and trigger print
  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();

    // Wait for content to load, then print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
      }, 250);
    };
  }
}
