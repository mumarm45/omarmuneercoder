import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface ExportResult {
  success: boolean;
  message: string;
  error?: Error;
}

export const exportToPDF = async (
  elementId: string = 'resume-preview',
  fileName: string = 'resume.pdf'
): Promise<ExportResult> => {
  try {
    const element = document.getElementById(elementId);
    
    if (!element) {
      throw new Error('Resume preview element not found');
    }

    // Create canvas from the resume element
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    
    // Calculate dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if content is longer
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save the PDF
    pdf.save(fileName);
    
    return { success: true, message: 'PDF downloaded successfully' };
  } catch (error) {
    console.error('Error generating PDF:', error);
    return { 
      success: false, 
      message: 'Failed to generate PDF', 
      error: error as Error 
    };
  }
};
