
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import userEvent from '@testing-library/user-event';
import QuickActions from '../../components/QuickActions';
import useResumeStore from '../../store/resumeStore';

// Mock the store
jest.mock('../../store/resumeStore');

// Mock the dialog components
jest.mock('../../components/Dialogs/ExperienceDialog', () => {
  return function MockExperienceDialog({ isOpen, onClose }) {
    return isOpen ? (
      <div data-testid="experience-dialog">
        <button onClick={onClose}>Close Experience Dialog</button>
      </div>
    ) : null;
  };
});

jest.mock('../../components/Dialogs/EducationDialog', () => {
  return function MockEducationDialog({ isOpen, onClose }) {
    return isOpen ? (
      <div data-testid="education-dialog">
        <button onClick={onClose}>Close Education Dialog</button>
      </div>
    ) : null;
  };
});

describe('QuickActions Component', () => {
  const mockAddSkill = jest.fn();

  beforeEach(() => {
    useResumeStore.mockReturnValue({
      addSkill: mockAddSkill
    });
    mockAddSkill.mockClear();
  });

  it('should render all quick action buttons', () => {
    render(<QuickActions />);

    expect(screen.getByText('Add Experience')).toBeInTheDocument();
    expect(screen.getByText('Add Education')).toBeInTheDocument();
    expect(screen.getByText('Add Skill')).toBeInTheDocument();
  });

  it('should open experience dialog when Add Experience is clicked', async () => {
    const user = userEvent.setup();
    render(<QuickActions />);

    const addExpButton = screen.getByText('Add Experience');
    
    await act(async () => {
      await user.click(addExpButton);
    });

    const dialog = await screen.findByTestId('experience-dialog');
    expect(dialog).toBeInTheDocument();
  });

  it('should open education dialog when Add Education is clicked', async () => {
    const user = userEvent.setup();
    render(<QuickActions />);

    const addEduButton = screen.getByText('Add Education');
    
    await act(async () => {
      await user.click(addEduButton);
    });

    const dialog = await screen.findByTestId('education-dialog');
    expect(dialog).toBeInTheDocument();
  });

  it('should call addSkill when Add Skill is clicked', async () => {
    const user = userEvent.setup();
    render(<QuickActions />);

    const addSkillButton = screen.getByText('Add Skill');
    
    await act(async () => {
      await user.click(addSkillButton);
    });

    expect(mockAddSkill).toHaveBeenCalledTimes(1);
  });

  it('should close experience dialog when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<QuickActions />);

    // Open dialog
    const addExpButton = screen.getByText('Add Experience');
    await act(async () => {
      await user.click(addExpButton);
    });
    
    const dialog = await screen.findByTestId('experience-dialog');
    expect(dialog).toBeInTheDocument();

    // Close dialog
    const closeButton = screen.getByText('Close Experience Dialog');
    await act(async () => {
      await user.click(closeButton);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('experience-dialog')).not.toBeInTheDocument();
    });
  });

  it('should close education dialog when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<QuickActions />);

    // Open dialog
    const addEduButton = screen.getByText('Add Education');
    await act(async () => {
      await user.click(addEduButton);
    });
    
    const dialog = await screen.findByTestId('education-dialog');
    expect(dialog).toBeInTheDocument();

    // Close dialog
    const closeButton = screen.getByText('Close Education Dialog');
    await act(async () => {
      await user.click(closeButton);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('education-dialog')).not.toBeInTheDocument();
    });
  });
});
