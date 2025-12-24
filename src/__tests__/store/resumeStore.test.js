import { renderHook, act } from '@testing-library/react';
import useResumeStore from '../../store/resumeStore';

describe('resumeStore', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset store state
    const { getState } = useResumeStore;
    act(() => {
      useResumeStore.setState(getState());
    });
  });

  describe('Template Management', () => {
    it('should have default template as modern', () => {
      const { result } = renderHook(() => useResumeStore());
      expect(result.current.selectedTemplate).toBe('modern');
    });

    it('should update selected template', () => {
      const { result } = renderHook(() => useResumeStore());
      
      act(() => {
        result.current.setTemplate('professional');
      });

      expect(result.current.selectedTemplate).toBe('professional');
    });
  });

  describe('Personal Info Management', () => {
    it('should update personal info field', () => {
      const { result } = renderHook(() => useResumeStore());
      
      act(() => {
        result.current.updatePersonalInfo('name', 'Jane Doe');
      });

      expect(result.current.resumeData.personalInfo.name).toBe('Jane Doe');
    });

    it('should update multiple personal info fields', () => {
      const { result } = renderHook(() => useResumeStore());
      
      act(() => {
        result.current.updatePersonalInfo('name', 'Jane Doe');
        result.current.updatePersonalInfo('email', 'jane@example.com');
      });

      expect(result.current.resumeData.personalInfo.name).toBe('Jane Doe');
      expect(result.current.resumeData.personalInfo.email).toBe('jane@example.com');
    });
  });

  describe('Summary Management', () => {
    it('should update summary', () => {
      const { result } = renderHook(() => useResumeStore());
      const newSummary = 'New professional summary';
      
      act(() => {
        result.current.updateSummary(newSummary);
      });

      expect(result.current.resumeData.summary).toBe(newSummary);
    });
  });

  describe('Experience Management', () => {
    it('should add new experience', () => {
      const { result } = renderHook(() => useResumeStore());
      const initialLength = result.current.resumeData.experience.length;
      
      const newExperience = {
        id: Date.now(),
        title: 'Test Engineer',
        company: 'Test Corp',
        location: 'Test City',
        startDate: '2023',
        endDate: 'Present',
        description: 'Test description'
      };

      act(() => {
        result.current.addExperience(newExperience);
      });

      expect(result.current.resumeData.experience.length).toBe(initialLength + 1);
      expect(result.current.resumeData.experience[initialLength]).toEqual(newExperience);
    });

    it('should update experience field', () => {
      const { result } = renderHook(() => useResumeStore());
      const firstExpId = result.current.resumeData.experience[0].id;
      
      act(() => {
        result.current.updateExperience(firstExpId, 'title', 'Updated Title');
      });

      expect(result.current.resumeData.experience[0].title).toBe('Updated Title');
    });

    it('should delete experience', () => {
      const { result } = renderHook(() => useResumeStore());
      const initialLength = result.current.resumeData.experience.length;
      const firstExpId = result.current.resumeData.experience[0].id;
      
      act(() => {
        result.current.deleteExperience(firstExpId);
      });

      expect(result.current.resumeData.experience.length).toBe(initialLength - 1);
      expect(result.current.resumeData.experience.find(e => e.id === firstExpId)).toBeUndefined();
    });

    it('should reorder experience', () => {
      const { result } = renderHook(() => useResumeStore());
      const firstExp = result.current.resumeData.experience[0];
      const secondExp = result.current.resumeData.experience[1];
      
      act(() => {
        result.current.reorderExperience(0, 1);
      });

      expect(result.current.resumeData.experience[0]).toEqual(secondExp);
      expect(result.current.resumeData.experience[1]).toEqual(firstExp);
    });
  });

  describe('Education Management', () => {
    it('should add new education', () => {
      const { result } = renderHook(() => useResumeStore());
      const initialLength = result.current.resumeData.education.length;
      
      const newEducation = {
        id: Date.now(),
        degree: 'Master of Science',
        school: 'Test University',
        location: 'Test City',
        year: '2023'
      };

      act(() => {
        result.current.addEducation(newEducation);
      });

      expect(result.current.resumeData.education.length).toBe(initialLength + 1);
    });

    it('should update education field', () => {
      const { result } = renderHook(() => useResumeStore());
      const firstEduId = result.current.resumeData.education[0].id;
      
      act(() => {
        result.current.updateEducation(firstEduId, 'degree', 'Updated Degree');
      });

      expect(result.current.resumeData.education[0].degree).toBe('Updated Degree');
    });

    it('should delete education', () => {
      const { result } = renderHook(() => useResumeStore());
      const initialLength = result.current.resumeData.education.length;
      const firstEduId = result.current.resumeData.education[0].id;
      
      act(() => {
        result.current.deleteEducation(firstEduId);
      });

      expect(result.current.resumeData.education.length).toBe(initialLength - 1);
    });

    it('should reorder education', () => {
      const { result } = renderHook(() => useResumeStore());
      
      // Add another education for testing
      const newEducation = {
        id: Date.now(),
        degree: 'Test Degree',
        school: 'Test School',
        location: 'Test Location',
        year: '2020'
      };

      act(() => {
        result.current.addEducation(newEducation);
      });

      const firstEdu = result.current.resumeData.education[0];
      const secondEdu = result.current.resumeData.education[1];
      
      act(() => {
        result.current.reorderEducation(0, 1);
      });

      expect(result.current.resumeData.education[0]).toEqual(secondEdu);
      expect(result.current.resumeData.education[1]).toEqual(firstEdu);
    });
  });

  describe('Skills Management', () => {
    it('should add new skill', () => {
      const { result } = renderHook(() => useResumeStore());
      const initialLength = result.current.resumeData.skills.length;
      
      act(() => {
        result.current.addSkill();
      });

      expect(result.current.resumeData.skills.length).toBe(initialLength + 1);
      expect(result.current.resumeData.skills[initialLength]).toBe('New Skill');
    });

    it('should update skill', () => {
      const { result } = renderHook(() => useResumeStore());
      
      act(() => {
        result.current.updateSkill(0, 'Updated Skill');
      });

      expect(result.current.resumeData.skills[0]).toBe('Updated Skill');
    });

    it('should delete skill', () => {
      const { result } = renderHook(() => useResumeStore());
      const initialLength = result.current.resumeData.skills.length;
      
      act(() => {
        result.current.deleteSkill(0);
      });

      expect(result.current.resumeData.skills.length).toBe(initialLength - 1);
    });

    it('should reorder skills', () => {
      const { result } = renderHook(() => useResumeStore());
      const firstSkill = result.current.resumeData.skills[0];
      const secondSkill = result.current.resumeData.skills[1];
      
      act(() => {
        result.current.reorderSkills(0, 1);
      });

      expect(result.current.resumeData.skills[0]).toBe(secondSkill);
      expect(result.current.resumeData.skills[1]).toBe(firstSkill);
    });
  });

  describe('Preview Toggle', () => {
    it('should toggle preview visibility', () => {
      const { result } = renderHook(() => useResumeStore());
      const initialValue = result.current.showPreview;
      
      act(() => {
        result.current.togglePreview();
      });

      expect(result.current.showPreview).toBe(!initialValue);
    });
  });
});
