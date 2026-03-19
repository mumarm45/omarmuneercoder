import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import userEvent from '@testing-library/user-event';

jest.mock('../../../store/resumeStore');

import useResumeStore from '../../../store/resumeStore';
import SkillsSection from '../../../components/sections/SkillsSection';

const mockUseResumeStore = useResumeStore as jest.MockedFunction<typeof useResumeStore>;

function buildStore(skills: string[] = ['React', 'TypeScript', 'Node.js'], overrides = {}) {
  return {
    resumeData: { skills },
    addSkill: jest.fn(),
    updateSkill: jest.fn(),
    deleteSkill: jest.fn(),
    ...overrides,
  } as any;
}

describe('SkillsSection — rendering', () => {
  it('renders all skill chips', () => {
    mockUseResumeStore.mockReturnValue(buildStore());
    render(<SkillsSection />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('shows empty state when no skills', () => {
    mockUseResumeStore.mockReturnValue(buildStore([]));
    render(<SkillsSection />);
    expect(screen.getByText(/No skills yet/i)).toBeInTheDocument();
  });

  it('shows count badge when skills exist', () => {
    mockUseResumeStore.mockReturnValue(buildStore(['A', 'B', 'C']));
    render(<SkillsSection />);
    expect(screen.getByText('(3)')).toBeInTheDocument();
  });
});

describe('SkillsSection — add skill', () => {
  it('calls addSkill when "Add" button is clicked', async () => {
    const addSkill = jest.fn();
    mockUseResumeStore.mockReturnValue(buildStore(['React'], { addSkill }));
    const user = userEvent.setup();
    render(<SkillsSection />);
    await act(async () => {
      await user.click(screen.getByText('Add'));
    });
    expect(addSkill).toHaveBeenCalledTimes(1);
  });
});

describe('SkillsSection — inline edit', () => {
  it('clicking a skill text shows an edit input', async () => {
    mockUseResumeStore.mockReturnValue(buildStore(['React']));
    const user = userEvent.setup();
    render(<SkillsSection />);
    await act(async () => {
      await user.click(screen.getByText('React'));
    });
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByDisplayValue('React')).toBeInTheDocument();
  });

  it('pressing Enter commits the edit and calls updateSkill', async () => {
    const updateSkill = jest.fn();
    mockUseResumeStore.mockReturnValue(buildStore(['React'], { updateSkill }));
    const user = userEvent.setup();
    render(<SkillsSection />);
    await act(async () => {
      await user.click(screen.getByText('React'));
    });
    const input = screen.getByRole('textbox');
    await act(async () => {
      await user.clear(input);
      await user.type(input, 'Vue.js');
      await user.keyboard('{Enter}');
    });
    expect(updateSkill).toHaveBeenCalledWith(0, 'Vue.js');
  });

  it('pressing Escape cancels the edit without calling updateSkill', async () => {
    const updateSkill = jest.fn();
    mockUseResumeStore.mockReturnValue(buildStore(['React'], { updateSkill }));
    const user = userEvent.setup();
    render(<SkillsSection />);
    await act(async () => {
      await user.click(screen.getByText('React'));
    });
    await act(async () => {
      await user.type(screen.getByRole('textbox'), 'Angular');
      await user.keyboard('{Escape}');
    });
    expect(updateSkill).not.toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });
  });

  it('clicking the check icon commits the edit', async () => {
    const updateSkill = jest.fn();
    mockUseResumeStore.mockReturnValue(buildStore(['React'], { updateSkill }));
    const user = userEvent.setup();
    render(<SkillsSection />);
    await act(async () => {
      await user.click(screen.getByText('React'));
    });
    const input = screen.getByRole('textbox');
    await act(async () => {
      await user.clear(input);
      await user.type(input, 'Svelte');
    });
    const saveBtn = screen.getByTitle('Save');
    await act(async () => {
      await user.click(saveBtn);
    });
    expect(updateSkill).toHaveBeenCalledWith(0, 'Svelte');
  });

  it('clicking the X icon in edit mode cancels without saving', async () => {
    const updateSkill = jest.fn();
    mockUseResumeStore.mockReturnValue(buildStore(['React'], { updateSkill }));
    const user = userEvent.setup();
    render(<SkillsSection />);
    await act(async () => {
      await user.click(screen.getByText('React'));
    });
    const cancelBtn = screen.getByTitle('Cancel');
    await act(async () => {
      await user.click(cancelBtn);
    });
    expect(updateSkill).not.toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });
  });
});

describe('SkillsSection — delete skill', () => {
  it('calls deleteSkill when the remove X is clicked', async () => {
    const deleteSkill = jest.fn();
    mockUseResumeStore.mockReturnValue(buildStore(['React', 'Vue'], { deleteSkill }));
    const user = userEvent.setup();
    const { container } = render(<SkillsSection />);
    // The delete buttons are opacity-0 by default (group-hover), so we find them via title
    const deleteButtons = container.querySelectorAll('button[title="Delete"]');
    expect(deleteButtons.length).toBe(2);
    await act(async () => {
      await user.click(deleteButtons[0]);
    });
    expect(deleteSkill).toHaveBeenCalledWith(0);
  });
});
