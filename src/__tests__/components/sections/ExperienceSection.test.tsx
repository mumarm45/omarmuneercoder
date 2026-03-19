import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import userEvent from '@testing-library/user-event';

jest.mock('../../../store/resumeStore');
jest.mock('../../../components/Dialogs/ExperienceDialog', () => {
  return function MockExperienceDialog({
    isOpen,
    onClose,
    experience,
  }: {
    isOpen: boolean;
    onClose: () => void;
    experience?: { title: string } | null;
  }) {
    return isOpen ? (
      <div data-testid="exp-dialog">
        <span data-testid="dialog-exp-title">{experience?.title ?? 'new'}</span>
        <button onClick={onClose}>Close</button>
      </div>
    ) : null;
  };
});

import useResumeStore from '../../../store/resumeStore';
import ExperienceSection from '../../../components/sections/ExperienceSection';

const mockUseResumeStore = useResumeStore as jest.MockedFunction<typeof useResumeStore>;

const mockExperience = [
  { id: 1, title: 'Software Engineer', company: 'Acme', location: 'NY', startDate: '2021', endDate: 'Present', description: 'Built stuff' },
  { id: 2, title: 'Intern', company: 'BigCo', location: 'Remote', startDate: '2020', endDate: '2021', description: 'Learned stuff' },
];

function buildStore(overrides = {}) {
  return {
    resumeData: { experience: mockExperience },
    deleteExperience: jest.fn(),
    ...overrides,
  } as any;
}

describe('ExperienceSection', () => {
  beforeEach(() => {
    mockUseResumeStore.mockReturnValue(buildStore());
  });

  it('renders all experience items', () => {
    render(<ExperienceSection />);
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Intern')).toBeInTheDocument();
  });

  it('shows company and date range', () => {
    render(<ExperienceSection />);
    expect(screen.getByText(/Acme/)).toBeInTheDocument();
    // Use getAllByText since "2021" appears in both experience items
    const matches = screen.getAllByText(/2021/);
    expect(matches.length).toBeGreaterThan(0);
  });

  it('shows empty state when there are no experiences', () => {
    mockUseResumeStore.mockReturnValue(buildStore({ resumeData: { experience: [] } }));
    render(<ExperienceSection />);
    expect(screen.getByText(/No experience yet/i)).toBeInTheDocument();
  });

  it('opens dialog for adding when "Add" is clicked', async () => {
    const user = userEvent.setup();
    render(<ExperienceSection />);
    await act(async () => {
      await user.click(screen.getByText('Add'));
    });
    expect(await screen.findByTestId('exp-dialog')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-exp-title').textContent).toBe('new');
  });

  it('opens dialog with experience data when edit button is clicked', async () => {
    const user = userEvent.setup();
    render(<ExperienceSection />);
    const editButtons = screen.getAllByTitle('Edit');
    await act(async () => {
      await user.click(editButtons[0]);
    });
    expect(await screen.findByTestId('exp-dialog')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-exp-title').textContent).toBe('Software Engineer');
  });

  it('calls deleteExperience after confirm when delete is clicked', async () => {
    const deleteExperience = jest.fn();
    mockUseResumeStore.mockReturnValue(buildStore({ deleteExperience }));
    jest.spyOn(window, 'confirm').mockReturnValue(true);
    const user = userEvent.setup();
    render(<ExperienceSection />);
    const deleteButtons = screen.getAllByTitle('Delete');
    await act(async () => {
      await user.click(deleteButtons[0]);
    });
    expect(deleteExperience).toHaveBeenCalledWith(1);
    (window.confirm as jest.Mock).mockRestore();
  });

  it('does not call deleteExperience when confirm is cancelled', async () => {
    const deleteExperience = jest.fn();
    mockUseResumeStore.mockReturnValue(buildStore({ deleteExperience }));
    jest.spyOn(window, 'confirm').mockReturnValue(false);
    const user = userEvent.setup();
    render(<ExperienceSection />);
    const deleteButtons = screen.getAllByTitle('Delete');
    await act(async () => {
      await user.click(deleteButtons[0]);
    });
    expect(deleteExperience).not.toHaveBeenCalled();
    (window.confirm as jest.Mock).mockRestore();
  });

  it('closes dialog when onClose fires', async () => {
    const user = userEvent.setup();
    render(<ExperienceSection />);
    await act(async () => {
      await user.click(screen.getByText('Add'));
    });
    await act(async () => {
      await user.click(screen.getByText('Close'));
    });
    await waitFor(() => {
      expect(screen.queryByTestId('exp-dialog')).not.toBeInTheDocument();
    });
  });

  it('shows the count badge when items exist', () => {
    render(<ExperienceSection />);
    expect(screen.getByText('(2)')).toBeInTheDocument();
  });
});
