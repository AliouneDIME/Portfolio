/**
 * openPdf — opens the PDF in a new browser tab.
 * Most reliable cross-browser method for viewing.
 */
export function openPdf(path: string): void {
  window.open(path, '_blank', 'noopener,noreferrer');
}

/**
 * downloadPdf — forces a .pdf download via fetch → Blob → object URL.
 *
 * WHY this instead of <a download href="...">?
 *   Vite's dev server and some hosts respond with Content-Type: text/html
 *   for all routes. The <a download> attribute obeys the response
 *   Content-Type, so the browser saves the file as .htm instead of .pdf.
 *   Fetching as a Blob bypasses that: we create an object URL from the raw
 *   binary, set the download filename ourselves, then revoke the URL.
 *
 * Falls back to window.open if the fetch fails (e.g. CORS, offline).
 */
export async function downloadPdf(path: string, filename: string): Promise<void> {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blob = await res.blob();
    const url  = URL.createObjectURL(blob);
    const a    = Object.assign(document.createElement('a'), {
      href:     url,
      download: filename.endsWith('.pdf') ? filename : `${filename}.pdf`,
    });
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 10_000);
  } catch {
    // Fallback: open in new tab so the user can save manually
    window.open(path, '_blank', 'noopener,noreferrer');
  }
}