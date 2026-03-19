import { renderHook, act } from '@testing-library/react';
import useResumeStore from '../../store/resumeStore';
import { Project, Certification, Language, Award } from '../../types';

describe('resumeStore — Projects', () => {
  const project: Project = {
    id: 1,
    name: 'My App',
    description: 'A test project',
    technologies: ['React'],
  };

  it('adds a project', () => {
    const { result } = renderHook(() => useResumeStore());
    const before = result.current.resumeData.projects?.length ?? 0;
    act(() => { result.current.addProject(project); });
    expect(result.current.resumeData.projects?.length).toBe(before + 1);
  });

  it('updates a project', () => {
    const { result } = renderHook(() => useResumeStore());
    act(() => { result.current.addProject({ ...project, id: 99 }); });
    act(() => { result.current.updateProject({ ...project, id: 99, name: 'Updated' }); });
    const found = result.current.resumeData.projects?.find(p => p.id === 99);
    expect(found?.name).toBe('Updated');
  });

  it('deletes a project', () => {
    const { result } = renderHook(() => useResumeStore());
    act(() => { result.current.addProject({ ...project, id: 77 }); });
    act(() => { result.current.deleteProject(77); });
    expect(result.current.resumeData.projects?.find(p => p.id === 77)).toBeUndefined();
  });
});

describe('resumeStore — Certifications', () => {
  const cert: Certification = {
    id: 10,
    name: 'AWS Certified',
    issuer: 'Amazon',
    date: '2024-01',
  };

  it('adds a certification', () => {
    const { result } = renderHook(() => useResumeStore());
    const before = result.current.resumeData.certifications?.length ?? 0;
    act(() => { result.current.addCertification(cert); });
    expect(result.current.resumeData.certifications?.length).toBe(before + 1);
  });

  it('updates a certification', () => {
    const { result } = renderHook(() => useResumeStore());
    act(() => { result.current.addCertification({ ...cert, id: 11 }); });
    act(() => { result.current.updateCertification({ ...cert, id: 11, name: 'GCP Certified' }); });
    expect(result.current.resumeData.certifications?.find(c => c.id === 11)?.name).toBe('GCP Certified');
  });

  it('deletes a certification', () => {
    const { result } = renderHook(() => useResumeStore());
    act(() => { result.current.addCertification({ ...cert, id: 12 }); });
    act(() => { result.current.deleteCertification(12); });
    expect(result.current.resumeData.certifications?.find(c => c.id === 12)).toBeUndefined();
  });
});

describe('resumeStore — Languages', () => {
  const lang: Language = { id: 20, name: 'Spanish', proficiency: 'Fluent' };

  it('adds a language', () => {
    const { result } = renderHook(() => useResumeStore());
    const before = result.current.resumeData.languages?.length ?? 0;
    act(() => { result.current.addLanguage(lang); });
    expect(result.current.resumeData.languages?.length).toBe(before + 1);
  });

  it('updates a language', () => {
    const { result } = renderHook(() => useResumeStore());
    act(() => { result.current.addLanguage({ ...lang, id: 21 }); });
    act(() => { result.current.updateLanguage({ ...lang, id: 21, proficiency: 'Native' }); });
    expect(result.current.resumeData.languages?.find(l => l.id === 21)?.proficiency).toBe('Native');
  });

  it('deletes a language', () => {
    const { result } = renderHook(() => useResumeStore());
    act(() => { result.current.addLanguage({ ...lang, id: 22 }); });
    act(() => { result.current.deleteLanguage(22); });
    expect(result.current.resumeData.languages?.find(l => l.id === 22)).toBeUndefined();
  });
});

describe('resumeStore — Awards', () => {
  const award: Award = {
    id: 30,
    title: 'Employee of the Year',
    issuer: 'ACME',
    date: '2023-12',
  };

  it('adds an award', () => {
    const { result } = renderHook(() => useResumeStore());
    const before = result.current.resumeData.awards?.length ?? 0;
    act(() => { result.current.addAward(award); });
    expect(result.current.resumeData.awards?.length).toBe(before + 1);
  });

  it('updates an award', () => {
    const { result } = renderHook(() => useResumeStore());
    act(() => { result.current.addAward({ ...award, id: 31 }); });
    act(() => { result.current.updateAward({ ...award, id: 31, title: 'Team Award' }); });
    expect(result.current.resumeData.awards?.find(a => a.id === 31)?.title).toBe('Team Award');
  });

  it('deletes an award', () => {
    const { result } = renderHook(() => useResumeStore());
    act(() => { result.current.addAward({ ...award, id: 32 }); });
    act(() => { result.current.deleteAward(32); });
    expect(result.current.resumeData.awards?.find(a => a.id === 32)).toBeUndefined();
  });
});
