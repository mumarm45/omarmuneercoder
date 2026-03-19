import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import userEvent from '@testing-library/user-event';

jest.mock('../../../store/resumeStore');
jest.mock('../../../components/Dialogs/EducationDialog', () => {
  return function MockEducationDialog({
    isOpen,
    onClose,
    education,
  }: {
    isOpen: boolean;
    onClose: () => void;
    education?: { degree: string } | null;
  }) {
    return isOpen ? (
      <div data-testid="edu-dialog">
        <span data-testid="dialog-edu-degree">{education?.degree ?? 'new'}</span>
        <button onClick={onClose}>Close</button>
      </div>
    ) : null;
  };
});

import useResumeStore from '../../../store/resumeStore';
import EducationSection from '../../../components/sections/EducationSection';

const mockUseResumeStore = useResumeStore as jest.MockedFunction<typeof useResumeStore>;

const mockEducation = [
  { id: 1, degree: 'B.S. Computer Science', school: 'MIT', location: 'Boston', year: '2019' },
  { id: 2, degree: 'M.S. Software Engineering', school: 'Stanford', location: 'Palo Alto', year: '2021' },
];

function buildStore(overrides = {}) {
  return {
    resumeData: { education: mockEducation },
    deleteEducation: jest.fn(),
    ...overrides,
  } as any;
}

describe('EducationSection', () => {
  beforeEach(() => {
    mockUseResumeStore.mockReturnValue(buildStore());
  });

  it('renders all education entries', () => {
    render(<EducationSection />);
    expect(screen.getByText('B.S. Computer Science')).toBeInTheDocument();
    expect(screen.getByText('M.S. Software Engineering')).toBeInTheDocument();
  });

  it('shows school and year', () => {
    render(<EducationSection />);
    expect(screen.getByText(/MIT/)).toBeInTheDocument();
    expect(screen.getByText(/2019/)).toBeInTheDocument();
  });

  it('shows empty state when there are no entries', () => {
    mockUseResumeStore.mockReturnValue(buildStore({ resumeData: { education: [] } }));
    render(<EducationSection />);
    expect(screen.getByText(/No education yet/i)).toBeInTheDocument();
  });

  it('opens dialog for adding when "Add" is clicked', async () => {
    const user = userEvent.setup();
    render(<EducationSection />);
    await act(async () => {
      await user.click(screen.getByText('Add'));
    });
    expect(await screen.findByTestId('edu-dialog')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-edu-degree').textContent).toBe('new');
  });

  it('opens dialog with education data when edit is clicked', async () => {
    const user = userEvent.setup();
    render(<EducationSection />);
    const editButtons = screen.getAllByTitle('Edit');
    await act(async () => {
      await user.click(editButtons[0]);
    });
    expect(await screen.findByTestId('edu-dialog')).toBeInTheDocument();
    expect(screen.getByTestId('dialog-edu-degree').textContent).toBe('B.S. Computer Science');
  });

  it('calls deleteEducation after confirm when delete is clicked', async () => {
    const deleteEducation = jest.fn();
    mockUseResumeStore.mockReturnValue(buildStore({ deleteEducation }));
    jest.spyOn(window, 'confirm').mockReturnValue(true);
    const user = userEvent.setup();
    render(<EducationSection />);
    const deleteButtons = screen.getAllByTitle('Delete');
    await act(async () => {
      await user.click(deleteButtons[0]);
    });
    expect(deleteEducation).toHaveBeenCalledWith(1);
    (window.confirm as jest.Mock).mockRestore();
  });

  it('does not call deleteEducation when confirm is cancelled', async () => {
    const deleteEducation = jest.fn();
    mockUseResumeStore.mockReturnValue(buildStore({ deleteEducation }));
    jest.spyOn(window, 'confirm').mockReturnValue(false);
    const user = userEvent.setup();
    render(<EducationSection />);
    await act(async () => {
      await user.click(screen.getAllByTitle('Delete')[0]);
    });
    expect(deleteEducation).not.toHaveBeenCalled();
    (window.confirm as jest.Mock).mockRestore();
  });

  it('closes dialog when onClose fires', async () => {
    const user = userEvent.setup();
    render(<EducationSection />);
    await act(async () => {
      await user.click(screen.getByText('Add'));
    });
    await act(async () => {
      await user.click(screen.getByText('Close'));
    });
    await waitFor(() => {
      expect(screen.queryByTestId('edu-dialog')).not.toBeInTheDocument();
    });
  });

  it('shows count badge when entries exist', () => {
    render(<EducationSection />);
    expect(screen.getByText('(2)')).toBeInTheDocument();
  });
});
