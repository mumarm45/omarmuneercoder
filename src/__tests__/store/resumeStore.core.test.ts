import { renderHook, act } from '@testing-library/react';
import useResumeStore from '../../store/resumeStore';
import { Experience, Education } from '../../types';

// ─── PersonalInfo ────────────────────────────────────────────────────────────

describe('resumeStore — PersonalInfo', () => {
  it('updates name', () => {
    const { result } = renderHook(() => useResumeStore());
    act(() => {
      result.current.updatePersonalInfo('name', 'Jane Smith');
    });
    expect(result.current.resumeData.personalInfo.name).toBe('Jane Smith');
  });

  it('updates email without touching other fields', () => {
    const { result } = renderHook(() => useResumeStore());
    const beforeTitle = result.current.resumeData.personalInfo.title;
    act(() => {
      result.current.updatePersonalInfo('email', 'jane@test.com');
    });
    expect(result.current.resumeData.personalInfo.email).toBe('jane@test.com');
    expect(result.current.resumeData.personalInfo.title).toBe(beforeTitle);
  });
});

// ─── Summary ─────────────────────────────────────────────────────────────────

describe('resumeStore — Summary', () => {
  it('updates the summary text', () => {
    const { result } = renderHook(() => useResumeStore());
    act(() => {
      result.current.updateSummary('A passionate developer.');
    });
    expect(result.current.resumeData.summary).toBe('A passionate developer.');
  });

  it('can set summary to empty string', () => {
    const { result } = renderHook(() => useResumeStore());
    act(() => {
      result.current.updateSummary('');
    });
    expect(result.current.resumeData.summary).toBe('');
  });
});

// ─── Experience ───────────────────────────────────────────────────────────────

describe('resumeStore — Experience', () => {
  const baseExp: Experience = {
    id: 500,
    title: 'Engineer',
    company: 'Acme Corp',
    location: 'Remote',
    startDate: '2020',
    endDate: '2023',
    description: 'Built things.',
  };

  it('adds an experience entry', () => {
    const { result } = renderHook(() => useResumeStore());
    const before = result.current.resumeData.experience.length;
    act(() => {
      result.current.addExperience({ ...baseExp, id: 501 });
    });
    expect(result.current.resumeData.experience.length).toBe(before + 1);
  });

  it('added entry has correct data', () => {
    const { result } = renderHook(() => useResumeStore());
    act(() => {
      result.current.addExperience({ ...baseExp, id: 502 });
    });
    const added = result.current.resumeData.experience.find((e) => e.id === 502);
    expect(added?.title).toBe('Engineer');
    expect(added?.company).toBe('Acme Corp');
  });

  it('updates a specific field of an experience', () => {
    const { result } = renderHook(() => useResumeStore());
    act(() => {
      result.current.addExperience({ ...baseExp, id: 503 });
    });
    act(() => {
      result.current.updateExperience(503, 'title', 'Senior Engineer');
    });
    expect(result.current.resumeData.experience.find((e) => e.id === 503)?.title).toBe(
      'Senior Engineer'
    );
  });

  it('update does not affect other experience entries', () => {
    const { result } = renderHook(() => useResumeStore());
    act(() => {
      result.current.addExperience({ ...baseExp, id: 504 });
      result.current.addExperience({ ...baseExp, id: 505, title: 'Manager' });
    });
    act(() => {
      result.current.updateExperience(504, 'company', 'NewCo');
    });
    expect(result.current.resumeData.experience.find((e) => e.id === 505)?.company).toBe(
      'Acme Corp'
    );
  });

  it('deletes an experience by id', () => {
    const { result } = renderHook(() => useResumeStore());
    act(() => {
      result.current.addExperience({ ...baseExp, id: 506 });
    });
    act(() => {
      result.current.deleteExperience(506);
    });
    expect(result.current.resumeData.experience.find((e) => e.id === 506)).toBeUndefined();
  });
});

// ─── Education ────────────────────────────────────────────────────────────────

describe('resumeStore — Education', () => {
  const baseEdu: Education = {
    id: 600,
    degree: 'B.S. Computer Science',
    school: 'State University',
    location: 'Boston, MA',
    year: '2019',
  };

  it('adds an education entry', () => {
    const { result } = renderHook(() => useResumeStore());
    const before = result.current.resumeData.education.length;
    act(() => {
      result.current.addEducation({ ...baseEdu, id: 601 });
    });
    expect(result.current.resumeData.education.length).toBe(before + 1);
  });

  it('added entry has correct data', () => {
    const { result } = renderHook(() => useResumeStore());
    act(() => {
      result.current.addEducation({ ...baseEdu, id: 602 });
    });
    const added = result.current.resumeData.education.find((e) => e.id === 602);
    expect(added?.degree).toBe('B.S. Computer Science');
    expect(added?.school).toBe('State University');
  });

  it('updates a specific field of an education entry', () => {
    const { result } = renderHook(() => useResumeStore());
    act(() => {
      result.current.addEducation({ ...baseEdu, id: 603 });
    });
    act(() => {
      result.current.updateEducation(603, 'degree', 'M.S. Computer Science');
    });
    expect(result.current.resumeData.education.find((e) => e.id === 603)?.degree).toBe(
      'M.S. Computer Science'
    );
  });

  it('deletes an education entry by id', () => {
    const { result } = renderHook(() => useResumeStore());
    act(() => {
      result.current.addEducation({ ...baseEdu, id: 604 });
    });
    act(() => {
      result.current.deleteEducation(604);
    });
    expect(result.current.resumeData.education.find((e) => e.id === 604)).toBeUndefined();
  });
});

// ─── Skills ───────────────────────────────────────────────────────────────────

describe('resumeStore — Skills', () => {
  it('addSkill appends "New Skill"', () => {
    const { result } = renderHook(() => useResumeStore());
    const before = result.current.resumeData.skills.length;
    act(() => {
      result.current.addSkill();
    });
    expect(result.current.resumeData.skills.length).toBe(before + 1);
    expect(result.current.resumeData.skills[result.current.resumeData.skills.length - 1]).toBe(
      'New Skill'
    );
  });

  it('updateSkill replaces the value at the given index', () => {
    const { result } = renderHook(() => useResumeStore());
    act(() => {
      result.current.addSkill();
    });
    const idx = result.current.resumeData.skills.length - 1;
    act(() => {
      result.current.updateSkill(idx, 'TypeScript');
    });
    expect(result.current.resumeData.skills[idx]).toBe('TypeScript');
  });

  it('updateSkill does not affect other skill indices', () => {
    const { result } = renderHook(() => useResumeStore());
    act(() => {
      result.current.addSkill(); // appends 'New Skill'
    });
    const lastIdx = result.current.resumeData.skills.length - 1;
    const prevSkill = result.current.resumeData.skills[lastIdx - 1];
    act(() => {
      result.current.updateSkill(lastIdx, 'GraphQL');
    });
    expect(result.current.resumeData.skills[lastIdx - 1]).toBe(prevSkill);
  });

  it('deleteSkill removes the skill at the given index', () => {
    const { result } = renderHook(() => useResumeStore());
    act(() => {
      result.current.addSkill();
    });
    const before = result.current.resumeData.skills.length;
    act(() => {
      result.current.deleteSkill(before - 1);
    });
    expect(result.current.resumeData.skills.length).toBe(before - 1);
  });

  it('deleteSkill preserves surrounding skills', () => {
    const { result } = renderHook(() => useResumeStore());
    // Add two known skills with unique names at the end
    act(() => {
      result.current.addSkill();
      result.current.addSkill();
    });
    const skills = result.current.resumeData.skills;
    const secondToLast = skills.length - 2;
    const last = skills.length - 1;
    // Use names that are guaranteed not to already exist
    act(() => {
      result.current.updateSkill(secondToLast, '__SKILL_TO_DELETE__');
      result.current.updateSkill(last, '__SKILL_TO_KEEP__');
    });
    act(() => {
      result.current.deleteSkill(result.current.resumeData.skills.indexOf('__SKILL_TO_DELETE__'));
    });
    expect(result.current.resumeData.skills).toContain('__SKILL_TO_KEEP__');
    expect(result.current.resumeData.skills).not.toContain('__SKILL_TO_DELETE__');
  });
});
