import { renderHook } from '@testing-library/react';
import { act } from 'react';
import useResumeStore from '../../store/resumeStore';

describe('Resume Builder Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Complete Resume Creation Flow', () => {
    it('should create a complete resume from scratch', () => {
      const { result } = renderHook(() => useResumeStore());

      // Update personal information
      act(() => {
        result.current.updatePersonalInfo('name', 'Integration Test User');
        result.current.updatePersonalInfo('title', 'QA Engineer');
        result.current.updatePersonalInfo('email', 'test@integration.com');
        result.current.updatePersonalInfo('phone', '+1234567890');
      });

      expect(result.current.resumeData.personalInfo.name).toBe('Integration Test User');
      expect(result.current.resumeData.personalInfo.title).toBe('QA Engineer');

      // Update summary
      act(() => {
        result.current.updateSummary('Experienced QA engineer with testing expertise');
      });

      expect(result.current.resumeData.summary).toBe('Experienced QA engineer with testing expertise');

      // Add experience
      const experience1 = {
        id: Date.now(),
        title: 'Senior QA Engineer',
        company: 'Tech Corp',
        location: 'Remote',
        startDate: '2021',
        endDate: 'Present',
        description: 'Led testing initiatives'
      };

      act(() => {
        result.current.addExperience(experience1);
      });

      expect(result.current.resumeData.experience).toContainEqual(experience1);

      // Add education
      const education1 = {
        id: Date.now(),
        degree: 'BS Computer Science',
        school: 'Test University',
        location: 'Test City',
        year: '2020'
      };

      act(() => {
        result.current.addEducation(education1);
      });

      expect(result.current.resumeData.education).toContainEqual(education1);

      // Add skills
      const skillCountBefore = result.current.resumeData.skills.length;
      act(() => {
        result.current.addSkill();
        result.current.updateSkill(skillCountBefore, 'Jest');
        result.current.addSkill();
        result.current.updateSkill(skillCountBefore + 1, 'React Testing Library');
      });

      expect(result.current.resumeData.skills).toContain('Jest');
      expect(result.current.resumeData.skills).toContain('React Testing Library');
    });

    it('should handle multiple experience entries with reordering', () => {
      const { result } = renderHook(() => useResumeStore());

      const exp1 = {
        id: 1,
        title: 'Junior Developer',
        company: 'StartUp',
        location: 'City A',
        startDate: '2018',
        endDate: '2020',
        description: 'Entry level'
      };

      const exp2 = {
        id: 2,
        title: 'Senior Developer',
        company: 'Big Corp',
        location: 'City B',
        startDate: '2020',
        endDate: 'Present',
        description: 'Leadership role'
      };

      // Add experiences
      act(() => {
        result.current.addExperience(exp1);
        result.current.addExperience(exp2);
      });

      const totalExperiences = result.current.resumeData.experience.length;
      const juniorIndexBefore = result.current.resumeData.experience.findIndex(e => e.id === 1);
      const seniorIndexBefore = result.current.resumeData.experience.findIndex(e => e.id === 2);
      
      // Reorder: swap the two items
      act(() => {
        result.current.reorderExperience(seniorIndexBefore, juniorIndexBefore);
      });

      // Verify senior role is now before junior role
      const seniorIndex = result.current.resumeData.experience.findIndex(e => e.id === 2);
      const juniorIndex = result.current.resumeData.experience.findIndex(e => e.id === 1);
      
      expect(seniorIndex).toBeLessThan(juniorIndex);
    });

    it('should handle education updates and deletions', () => {
      const { result } = renderHook(() => useResumeStore());

      const edu1 = {
        id: Date.now(),
        degree: 'Bachelor',
        school: 'University A',
        location: 'Location A',
        year: '2020'
      };

      // Add education
      act(() => {
        result.current.addEducation(edu1);
      });

      const addedEdu = result.current.resumeData.education.find(e => e.degree === 'Bachelor');
      expect(addedEdu).toBeDefined();

      // Update education
      act(() => {
        result.current.updateEducation(addedEdu.id, 'degree', 'Bachelor of Science');
      });

      const updatedEdu = result.current.resumeData.education.find(e => e.id === addedEdu.id);
      expect(updatedEdu.degree).toBe('Bachelor of Science');

      // Delete education
      const countBefore = result.current.resumeData.education.length;
      act(() => {
        result.current.deleteEducation(addedEdu.id);
      });

      expect(result.current.resumeData.education.length).toBe(countBefore - 1);
      expect(result.current.resumeData.education.find(e => e.id === addedEdu.id)).toBeUndefined();
    });

    it('should maintain data consistency through multiple operations', () => {
      const { result } = renderHook(() => useResumeStore());

      // Perform multiple operations
      act(() => {
        // Update personal info
        result.current.updatePersonalInfo('name', 'Consistency Test');
        
        // Add and modify experience
        result.current.addExperience({
          id: 100,
          title: 'Test',
          company: 'Test Co',
          location: 'Test Loc',
          startDate: '2020',
          endDate: '2021',
          description: 'Test desc'
        });
        result.current.updateExperience(100, 'title', 'Updated Test');
        
        // Add and reorder skills
        result.current.addSkill();
        result.current.updateSkill(result.current.resumeData.skills.length - 1, 'New Skill');
        
        // Change template
        result.current.setTemplate('professional');
      });

      // Verify all changes persisted
      expect(result.current.resumeData.personalInfo.name).toBe('Consistency Test');
      expect(result.current.resumeData.experience.find(e => e.id === 100).title).toBe('Updated Test');
      expect(result.current.resumeData.skills).toContain('New Skill');
      expect(result.current.selectedTemplate).toBe('professional');
    });
  });

  describe('Template Switching', () => {
    it('should switch templates without losing data', () => {
      const { result } = renderHook(() => useResumeStore());

      // Set up some data
      act(() => {
        result.current.updatePersonalInfo('name', 'Template Test User');
        result.current.updateSummary('Test summary');
      });

      const nameBefore = result.current.resumeData.personalInfo.name;
      const summaryBefore = result.current.resumeData.summary;

      // Switch template
      act(() => {
        result.current.setTemplate('creative');
      });

      // Verify data persists
      expect(result.current.resumeData.personalInfo.name).toBe(nameBefore);
      expect(result.current.resumeData.summary).toBe(summaryBefore);
      expect(result.current.selectedTemplate).toBe('creative');

      // Switch to another template
      act(() => {
        result.current.setTemplate('minimal');
      });

      // Verify data still persists
      expect(result.current.resumeData.personalInfo.name).toBe(nameBefore);
      expect(result.current.resumeData.summary).toBe(summaryBefore);
      expect(result.current.selectedTemplate).toBe('minimal');
    });
  });

  describe('Skills Management Flow', () => {
    it('should handle complete skills workflow', () => {
      const { result } = renderHook(() => useResumeStore());

      const initialSkillCount = result.current.resumeData.skills.length;

      // Add multiple skills
      act(() => {
        result.current.addSkill();
        result.current.updateSkill(initialSkillCount, 'TypeScript');
        
        result.current.addSkill();
        result.current.updateSkill(initialSkillCount + 1, 'GraphQL');
        
        result.current.addSkill();
        result.current.updateSkill(initialSkillCount + 2, 'Docker');
      });

      expect(result.current.resumeData.skills.length).toBe(initialSkillCount + 3);
      expect(result.current.resumeData.skills).toContain('TypeScript');
      expect(result.current.resumeData.skills).toContain('GraphQL');
      expect(result.current.resumeData.skills).toContain('Docker');

      // Reorder skills
      const typeScriptIndex = result.current.resumeData.skills.indexOf('TypeScript');
      const dockerIndex = result.current.resumeData.skills.indexOf('Docker');

      act(() => {
        result.current.reorderSkills(typeScriptIndex, dockerIndex);
      });

      const newTypeScriptIndex = result.current.resumeData.skills.indexOf('TypeScript');
      expect(newTypeScriptIndex).not.toBe(typeScriptIndex);

      // Delete a skill
      const graphqlIndex = result.current.resumeData.skills.indexOf('GraphQL');
      act(() => {
        result.current.deleteSkill(graphqlIndex);
      });

      expect(result.current.resumeData.skills).not.toContain('GraphQL');
      expect(result.current.resumeData.skills.length).toBe(initialSkillCount + 2);
    });
  });
});
