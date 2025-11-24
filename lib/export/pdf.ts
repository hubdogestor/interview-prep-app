import { jsPDF } from "jspdf";

export interface ExportItem {
  title: string;
  content: string;
  metadata?: Record<string, string | number | boolean>;
}

interface PDFExportOptions {
  title: string;
  subtitle?: string;
  author?: string;
  date?: Date;
}

/**
 * Generate a professional PDF with company branding using jsPDF
 */
export function generateProfessionalPDF(
  items: ExportItem[],
  options: PDFExportOptions
): jsPDF {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const usableWidth = pageWidth - 2 * margin;

  // Colors
  const primaryColor = "#2563eb"; // blue-600
  const textColor = "#1f2937"; // gray-800
  const lightGray = "#f3f4f6"; // gray-100

  let yPosition = margin;

  // Header with branding
  doc.setFillColor(primaryColor);
  doc.rect(0, 0, pageWidth, 30, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(options.title, margin, 15);

  if (options.subtitle) {
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(options.subtitle, margin, 22);
  }

  yPosition = 40;

  // Document metadata
  doc.setTextColor(textColor);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  const metadata = [];
  if (options.author) {
    metadata.push(`Autor: ${options.author}`);
  }
  metadata.push(
    `Data: ${(options.date || new Date()).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })}`
  );
  metadata.push(`Total de itens: ${items.length}`);

  doc.text(metadata.join(" | "), margin, yPosition);
  yPosition += 10;

  // Divider line
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 10;

  // Content items
  items.forEach((item, index) => {
    // Check if we need a new page
    if (yPosition > pageHeight - 40) {
      doc.addPage();
      yPosition = margin;
    }

    // Item number badge
    doc.setFillColor(primaryColor);
    doc.circle(margin + 3, yPosition + 3, 3, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text(`${index + 1}`, margin + 3, yPosition + 4, {
      align: "center",
    });

    // Item title
    doc.setTextColor(textColor);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    const titleLines = doc.splitTextToSize(item.title, usableWidth - 10);
    doc.text(titleLines, margin + 10, yPosition + 5);
    yPosition += titleLines.length * 6 + 5;

    // Item metadata
    if (item.metadata && Object.keys(item.metadata).length > 0) {
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);

      const metadataText = Object.entries(item.metadata)
        .map(([key, value]) => `${key}: ${value}`)
        .join(" | ");

      doc.text(metadataText, margin, yPosition);
      yPosition += 6;
    }

    // Item content box
    doc.setFillColor(lightGray);
    const contentLines = doc.splitTextToSize(item.content, usableWidth - 10);
    const boxHeight = contentLines.length * 5 + 10;

    // Check if content box fits
    if (yPosition + boxHeight > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
    }

    doc.roundedRect(margin, yPosition, usableWidth, boxHeight, 2, 2, "F");

    doc.setTextColor(textColor);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(contentLines, margin + 5, yPosition + 7);

    yPosition += boxHeight + 15;
  });

  // Footer on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Página ${i} de ${totalPages}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" }
    );
    doc.text(
      "Gerado por leomds-app",
      pageWidth - margin,
      pageHeight - 10,
      { align: "right" }
    );
  }

  return doc;
}

/**
 * Legacy export using browser's print functionality
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
        Gerado por leomds-app
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
