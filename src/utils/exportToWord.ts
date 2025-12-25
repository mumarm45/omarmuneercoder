import { ResumeData } from '../types';
import { withErrorHandling, ErrorCode, OperationResult, validateRequired, logger } from './errorHandling';

export interface ExportResult {
  success: boolean;
  message: string;
  error?: Error;
}

export interface WordExportOptions {
  fileName: string;
  format?: 'txt' | 'docx';
}

/**
 * Formats resume data as plain text
 */
function formatResumeText(data: ResumeData): string {
  const { personalInfo, summary, experience, education, skills } = data;

  const sections: string[] = [];

  // Personal Info
  sections.push(
    personalInfo.name,
    personalInfo.title,
    `${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.location}`,
    `${personalInfo.linkedin} | ${personalInfo.portfolio}`,
    ''
  );

  // Summary
  sections.push('PROFESSIONAL SUMMARY', summary, '');

  // Experience
  sections.push('EXPERIENCE', '');
  experience.forEach((exp) => {
    sections.push(
      exp.title,
      `${exp.company} | ${exp.location}`,
      `${exp.startDate} - ${exp.endDate}`,
      exp.description,
      ''
    );
  });

  // Education
  sections.push('EDUCATION', '');
  education.forEach((edu) => {
    sections.push(
      edu.degree,
      `${edu.school} | ${edu.location} | ${edu.year}`,
      ''
    );
  });

  // Skills
  sections.push('SKILLS', skills.join(' • '));

  return sections.join('\n');
}

/**
 * Creates and downloads a text blob
 */
function downloadTextFile(content: string, fileName: string): void {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  
  try {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } finally {
    // Clean up object URL
    setTimeout(() => window.URL.revokeObjectURL(url), 100);
  }
}

/**
 * Validates resume data before export
 */
function validateResumeData(data: ResumeData): OperationResult<ResumeData> {
  return validateRequired(data, ['personalInfo', 'experience', 'education', 'skills']);
}

/**
 * Exports resume data to text/Word format
 */
export async function exportToWord(
  data: ResumeData,
  options: WordExportOptions
): Promise<OperationResult<void>> {
  const { fileName, format = 'txt' } = options;

  logger.info('Starting document export', { fileName, format });

  return withErrorHandling(
    async () => {
      // Validate data
      const validation = validateResumeData(data);
      if (!validation.success) {
        throw new Error(validation.message);
      }

      // Format content
      const content = formatResumeText(data);

      // Generate filename with correct extension
      const finalFileName = fileName.replace(/\.(txt|docx)$/, '') + `.${format}`;

      // Download file
      downloadTextFile(content, finalFileName);

      logger.info('Document export completed successfully', { finalFileName });
    },
    'Failed to export document',
    ErrorCode.EXPORT_FAILED
  );
}

// Keep exportToPDF for backward compatibility with existing imports
export { exportToPDF } from './exportToPDF';
