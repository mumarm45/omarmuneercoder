import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ResumeData } from '../types';

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

export const exportToWord = async (
  resumeData: ResumeData,
  fileName: string = 'resume.docx'
): Promise<ExportResult> => {
  // Simplified Word export - creates a downloadable text file
  // For a proper Word document, you would need the 'docx' library
  try {
    const { personalInfo, summary, experience, education, skills } = resumeData;
    
    let content = '';
    
    // Personal Info
    content += `${personalInfo.name}\n`;
    content += `${personalInfo.title}\n`;
    content += `${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.location}\n`;
    content += `${personalInfo.linkedin} | ${personalInfo.portfolio}\n\n`;
    
    // Summary
    content += `PROFESSIONAL SUMMARY\n`;
    content += `${summary}\n\n`;
    
    // Experience
    content += `EXPERIENCE\n\n`;
    experience.forEach(exp => {
      content += `${exp.title}\n`;
      content += `${exp.company} | ${exp.location}\n`;
      content += `${exp.startDate} - ${exp.endDate}\n`;
      content += `${exp.description}\n\n`;
    });
    
    // Education
    content += `EDUCATION\n\n`;
    education.forEach(edu => {
      content += `${edu.degree}\n`;
      content += `${edu.school} | ${edu.location} | ${edu.year}\n\n`;
    });
    
    // Skills
    content += `SKILLS\n`;
    content += skills.join(' • ');
    
    // Create blob and download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName.replace('.docx', '.txt');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    return { success: true, message: 'Text file downloaded successfully' };
  } catch (error) {
    console.error('Error generating document:', error);
    return { 
      success: false, 
      message: 'Failed to generate document', 
      error: error as Error 
    };
  }
};
