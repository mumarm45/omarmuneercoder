import { withErrorHandling, ErrorCode, OperationResult, logger } from './errorHandling';

type JsPDFConstructor = (typeof import('jspdf'))['default'];
type JsPDFInstance = InstanceType<JsPDFConstructor>;

export interface ExportResult {
  success: boolean;
  message: string;
  error?: Error;
}

export interface PDFExportOptions {
  elementId: string;
  fileName: string;
  scale?: number;
  quality?: number;
}

const DEFAULT_OPTIONS: Partial<PDFExportOptions> = {
  scale: 2,
  quality: 0.95,
};

/**
 * Validates DOM element exists
 */
function validateElement(elementId: string): HTMLElement {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with ID "${elementId}" not found in DOM`);
  }
  return element;
}

/**
 * Converts HTML element to canvas
 */
async function elementToCanvas(
  element: HTMLElement,
  scale: number
): Promise<HTMLCanvasElement> {
  logger.debug('Converting element to canvas', { scale });

  const { default: html2canvas } = await import('html2canvas');

  return await html2canvas(element, {
    scale,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    imageTimeout: 15000,
    allowTaint: false,
  });
}

/**
 * Calculates PDF dimensions for A4 format
 */
function calculatePDFDimensions(canvas: HTMLCanvasElement) {
  const A4_WIDTH = 210; // mm
  const A4_HEIGHT = 297; // mm
  const imgWidth = A4_WIDTH;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  return {
    imgWidth,
    imgHeight,
    pageHeight: A4_HEIGHT,
  };
}

/**
 * Adds image pages to PDF document
 */
function addImageToPDF(
  pdf: JsPDFInstance,
  imgData: string,
  dimensions: ReturnType<typeof calculatePDFDimensions>
): void {
  const { imgWidth, imgHeight, pageHeight } = dimensions;
  let heightLeft = imgHeight;
  let position = 0;

  // Add first page
  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
  heightLeft -= pageHeight;

  // Add additional pages if needed
  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;
  }
}

/**
 * Exports HTML element to PDF with error handling and retry logic
 */
export async function exportToPDF(
  options: PDFExportOptions
): Promise<OperationResult<void>> {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  const { elementId, fileName, scale = 2 } = mergedOptions;

  logger.info('Starting PDF export', { elementId, fileName });

  return withErrorHandling(
    async () => {
      const { default: jsPDF } = await import('jspdf');

      // Validate element
      const element = validateElement(elementId);

      // Convert to canvas
      const canvas = await elementToCanvas(element, scale);
      logger.debug('Canvas created', {
        width: canvas.width,
        height: canvas.height,
      });

      // Get image data
      const imgData = canvas.toDataURL('image/png', mergedOptions.quality);

      // Calculate dimensions
      const dimensions = calculatePDFDimensions(canvas);

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4', true);

      // Add content to PDF
      addImageToPDF(pdf, imgData, dimensions);

      // Save PDF
      pdf.save(fileName);

      logger.info('PDF export completed successfully', { fileName });
    },
    'Failed to export PDF',
    ErrorCode.EXPORT_FAILED
  );
}
