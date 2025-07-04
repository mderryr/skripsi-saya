// Komponen klien untuk rendering
"use client";
import html2canvas from "html2canvas";
export async function renderHTMLToCanvas(htmlContent: string) {
  // Buat elemen temporary
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  document.body.appendChild(tempDiv);

  try {
    // Render ke canvas
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      logging: false
    });

    // Hapus elemen temporary
    document.body.removeChild(tempDiv);

    return canvas;
  } catch (error) {
    // Hapus elemen temporary jika terjadi error
    document.body.removeChild(tempDiv);
    throw error;
  }
}