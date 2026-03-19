import { renderHook, act } from '@testing-library/react';
import useResumeStore from '../../store/resumeStore';
import { DEFAULT_SECTION_LABELS, SectionLabels } from '../../types';

describe('resumeStore — SectionLabels defaults', () => {
  it('initialises sectionLabels with all DEFAULT_SECTION_LABELS values', () => {
    const { result } = renderHook(() => useResumeStore());
    const labels = result.current.resumeData.sectionLabels;
    expect(labels).toBeDefined();
    (Object.keys(DEFAULT_SECTION_LABELS) as Array<keyof SectionLabels>).forEach((key) => {
      expect(labels?.[key]).toBe(DEFAULT_SECTION_LABELS[key]);
    });
  });

  it('DEFAULT_SECTION_LABELS contains all 8 sections', () => {
    const keys = Object.keys(DEFAULT_SECTION_LABELS);
    expect(keys).toHaveLength(8);
    expect(keys).toEqual(
      expect.arrayContaining([
        'summary',
        'experience',
        'education',
        'skills',
        'projects',
        'certifications',
        'languages',
        'awards',
      ])
    );
  });
});

describe('resumeStore — updateSectionLabel', () => {
  it('updates experience label', () => {
    const { result } = renderHook(() => useResumeStore());
    act(() => {
      result.current.updateSectionLabel('experience', 'WORK HISTORY');
    });
    expect(result.current.resumeData.sectionLabels?.experience).toBe('WORK HISTORY');
  });

  it('updates education label', () => {
    const { result } = renderHook(() => useResumeStore());
    act(() => {
      result.current.updateSectionLabel('education', 'ACADEMIC BACKGROUND');
    });
    expect(result.current.resumeData.sectionLabels?.education).toBe('ACADEMIC BACKGROUND');
  });

  it('updates skills label', () => {
    const { result } = renderHook(() => useResumeStore());
    act(() => {
      result.current.updateSectionLabel('skills', 'TECHNICAL SKILLS');
    });
    expect(result.current.resumeData.sectionLabels?.skills).toBe('TECHNICAL SKILLS');
  });

  it('updates summary label', () => {
    const { result } = renderHook(() => useResumeStore());
    act(() => {
      result.current.updateSectionLabel('summary', 'ABOUT ME');
    });
    expect(result.current.resumeData.sectionLabels?.summary).toBe('ABOUT ME');
  });

  it('updates projects label', () => {
    const { result } = renderHook(() => useResumeStore());
    act(() => {
      result.current.updateSectionLabel('projects', 'MY PORTFOLIO');
    });
    expect(result.current.resumeData.sectionLabels?.projects).toBe('MY PORTFOLIO');
  });

  it('updates certifications label', () => {
    const { result } = renderHook(() => useResumeStore());
    act(() => {
      result.current.updateSectionLabel('certifications', 'CREDENTIALS');
    });
    expect(result.current.resumeData.sectionLabels?.certifications).toBe('CREDENTIALS');
  });

  it('updates languages label', () => {
    const { result } = renderHook(() => useResumeStore());
    act(() => {
      result.current.updateSectionLabel('languages', 'SPOKEN LANGUAGES');
    });
    expect(result.current.resumeData.sectionLabels?.languages).toBe('SPOKEN LANGUAGES');
  });

  it('updates awards label', () => {
    const { result } = renderHook(() => useResumeStore());
    act(() => {
      result.current.updateSectionLabel('awards', 'HONORS');
    });
    expect(result.current.resumeData.sectionLabels?.awards).toBe('HONORS');
  });

  it('updating one label does not affect others', () => {
    const { result } = renderHook(() => useResumeStore());
    // reset summary to known default
    act(() => {
      result.current.updateSectionLabel('summary', DEFAULT_SECTION_LABELS.summary);
    });
    act(() => {
      result.current.updateSectionLabel('experience', 'CAREER');
    });
    expect(result.current.resumeData.sectionLabels?.summary).toBe(DEFAULT_SECTION_LABELS.summary);
  });

  it('can update all 8 labels in one batch', () => {
    const { result } = renderHook(() => useResumeStore());
    const custom: SectionLabels = {
      summary: 'INTRO',
      experience: 'CAREER',
      education: 'STUDY',
      skills: 'ABILITIES',
      projects: 'WORK',
      certifications: 'CERTS',
      languages: 'LANGS',
      awards: 'PRIZES',
    };
    act(() => {
      (Object.keys(custom) as Array<keyof SectionLabels>).forEach((key) => {
        result.current.updateSectionLabel(key, custom[key]);
      });
    });
    (Object.keys(custom) as Array<keyof SectionLabels>).forEach((key) => {
      expect(result.current.resumeData.sectionLabels?.[key]).toBe(custom[key]);
    });
  });

  it('accepts an empty string (caller is responsible for fallback)', () => {
    const { result } = renderHook(() => useResumeStore());
    act(() => {
      result.current.updateSectionLabel('skills', '');
    });
    expect(result.current.resumeData.sectionLabels?.skills).toBe('');
  });
});
