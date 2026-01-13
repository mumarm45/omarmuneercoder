import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  ResumeData, 
  TemplateType, 
  Experience, 
  Education, 
  PersonalInfo,
  Project,
  Certification,
  Language,
  Award
} from '../types';

interface ResumeStore {
  selectedTemplate: TemplateType;
  showPreview: boolean;
  resumeData: ResumeData;
  
  // Template Actions
  setTemplate: (template: TemplateType) => void;
  togglePreview: () => void;
  
  // Personal Info Actions
  updatePersonalInfo: (field: keyof PersonalInfo, value: string) => void;
  
  // Summary Actions
  updateSummary: (value: string) => void;
  
  // Experience Actions
  addExperience: (experience: Experience) => void;
  updateExperience: (id: number, field: keyof Experience, value: string | number | boolean) => void;
  deleteExperience: (id: number) => void;
  reorderExperience: (startIndex: number, endIndex: number) => void;
  
  // Education Actions
  addEducation: (education: Education) => void;
  updateEducation: (id: number, field: keyof Education, value: string | number) => void;
  deleteEducation: (id: number) => void;
  reorderEducation: (startIndex: number, endIndex: number) => void;
  
  // Skills Actions
  addSkill: () => void;
  updateSkill: (index: number, value: string) => void;
  deleteSkill: (index: number) => void;
  reorderSkills: (startIndex: number, endIndex: number) => void;

  // Project Actions
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: number) => void;
  
  // Certification Actions
  addCertification: (certification: Certification) => void;
  updateCertification: (certification: Certification) => void;
  deleteCertification: (id: number) => void;
  
  // Language Actions
  addLanguage: (language: Language) => void;
  updateLanguage: (language: Language) => void;
  deleteLanguage: (id: number) => void;
  
  // Award Actions
  addAward: (award: Award) => void;
  updateAward: (award: Award) => void;
  deleteAward: (id: number) => void;
}

const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      selectedTemplate: 'modern',
      showPreview: true,
      
      resumeData: {
        personalInfo: {
          name: 'John Doe',
          title: 'Software Engineer',
          email: 'john.doe@email.com',
          phone: '+1 (555) 123-4567',
          location: 'San Francisco, CA',
          linkedin: 'linkedin.com/in/johndoe',
          portfolio: 'johndoe.dev'
        },
        summary: 'Experienced software engineer with 5+ years of expertise in full-stack development, specializing in Node.js, and cloud technologies.',
        experience: [
          {
            id: 1,
            title: 'Senior Software Engineer',
            company: 'Tech Corp',
            location: 'San Francisco, CA',
            startDate: '2021',
            endDate: 'Present',
            description: '• Led development of scalable web applications\n• Mentored junior developers\n• Improved system performance by 40%'
          },
          {
            id: 2,
            title: 'Software Engineer',
            company: 'StartUp Inc',
            location: 'Remote',
            startDate: '2019',
            endDate: '2021',
            description: '• Built responsive user interfaces\n• Collaborated with cross-functional teams\n• Implemented CI/CD pipelines'
          }
        ],
        education: [
          {
            id: 1,
            degree: 'Bachelor of Science in Computer Science',
            school: 'University of Technology',
            location: 'Boston, MA',
            year: '2019'
          }
        ],
        skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Git', 'SQL'],
        projects: [],
        certifications: [],
        languages: [],
        awards: []
      },

      // Actions
      setTemplate: (template) => set({ selectedTemplate: template }),
      
      togglePreview: () => set((state) => ({ showPreview: !state.showPreview })),

      updatePersonalInfo: (field, value) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            personalInfo: {
              ...state.resumeData.personalInfo,
              [field]: value
            }
          }
        })),

      updateSummary: (value) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            summary: value
          }
        })),

      // Experience Actions
      addExperience: (experience) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: [...state.resumeData.experience, experience]
          }
        })),

      updateExperience: (id, field, value) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.map((exp) =>
              exp.id === id ? { ...exp, [field]: value } : exp
            )
          }
        })),

      deleteExperience: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.filter((exp) => exp.id !== id)
          }
        })),

      reorderExperience: (startIndex, endIndex) =>
        set((state) => {
          const result = Array.from(state.resumeData.experience);
          const [removed] = result.splice(startIndex, 1);
          result.splice(endIndex, 0, removed);
          
          return {
            resumeData: {
              ...state.resumeData,
              experience: result
            }
          };
        }),

      // Education Actions
      addEducation: (education) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: [...state.resumeData.education, education]
          }
        })),

      updateEducation: (id, field, value) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.map((edu) =>
              edu.id === id ? { ...edu, [field]: value } : edu
            )
          }
        })),

      deleteEducation: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.filter((edu) => edu.id !== id)
          }
        })),

      reorderEducation: (startIndex, endIndex) =>
        set((state) => {
          const result = Array.from(state.resumeData.education);
          const [removed] = result.splice(startIndex, 1);
          result.splice(endIndex, 0, removed);
          
          return {
            resumeData: {
              ...state.resumeData,
              education: result
            }
          };
        }),

      // Skills Actions
      addSkill: () =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: [...state.resumeData.skills, 'New Skill']
          }
        })),

      updateSkill: (index, value) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: state.resumeData.skills.map((skill, i) =>
              i === index ? value : skill
            )
          }
        })),

      deleteSkill: (index) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: state.resumeData.skills.filter((_, i) => i !== index)
          }
        })),

      reorderSkills: (startIndex, endIndex) =>
        set((state) => {
          const result = Array.from(state.resumeData.skills);
          const [removed] = result.splice(startIndex, 1);
          result.splice(endIndex, 0, removed);
          
          return {
            resumeData: {
              ...state.resumeData,
              skills: result
            }
          };
        }),

      // Project Actions
      addProject: (project) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: [...(state.resumeData.projects || []), project]
          }
        })),

      updateProject: (project) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: (state.resumeData.projects || []).map((p) =>
              p.id === project.id ? project : p
            )
          }
        })),

      deleteProject: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: (state.resumeData.projects || []).filter((p) => p.id !== id)
          }
        })),

      // Certification Actions
      addCertification: (certification) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            certifications: [...(state.resumeData.certifications || []), certification]
          }
        })),

      updateCertification: (certification) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            certifications: (state.resumeData.certifications || []).map((c) =>
              c.id === certification.id ? certification : c
            )
          }
        })),

      deleteCertification: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            certifications: (state.resumeData.certifications || []).filter((c) => c.id !== id)
          }
        })),

      // Language Actions
      addLanguage: (language) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            languages: [...(state.resumeData.languages || []), language]
          }
        })),

      updateLanguage: (language) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            languages: (state.resumeData.languages || []).map((l) =>
              l.id === language.id ? language : l
            )
          }
        })),

      deleteLanguage: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            languages: (state.resumeData.languages || []).filter((l) => l.id !== id)
          }
        })),

      // Award Actions
      addAward: (award) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            awards: [...(state.resumeData.awards || []), award]
          }
        })),

      updateAward: (award) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            awards: (state.resumeData.awards || []).map((a) =>
              a.id === award.id ? award : a
            )
          }
        })),

      deleteAward: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            awards: (state.resumeData.awards || []).filter((a) => a.id !== id)
          }
        }))
    }),
    {
      name: 'resume-storage',
      partialize: (state) => ({ 
        selectedTemplate: state.selectedTemplate,
        resumeData: state.resumeData 
      })
    }
  )
);

export default useResumeStore;
