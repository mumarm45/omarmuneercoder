import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import userEvent from '@testing-library/user-event';

jest.mock('../../../store/resumeStore');
jest.mock('../../../components/Dialog', () => {
  return function MockDialog({
    isOpen,
    children,
    title,
  }: {
    isOpen: boolean;
    children: React.ReactNode;
    title: string;
  }) {
    return isOpen ? (
      <div data-testid="dialog">
        <h2>{title}</h2>
        {children}
      </div>
    ) : null;
  };
});

import useResumeStore from '../../../store/resumeStore';
import SectionLabelsDialog from '../../../components/Dialogs/SectionLabelsDialog';
import { DEFAULT_SECTION_LABELS } from '../../../types';

const mockUseResumeStore = useResumeStore as jest.MockedFunction<typeof useResumeStore>;

function buildStore(overrides = {}) {
  return {
    resumeData: {
      sectionLabels: { ...DEFAULT_SECTION_LABELS },
    },
    updateSectionLabel: jest.fn(),
    ...overrides,
  } as any;
}

describe('SectionLabelsDialog — rendering', () => {
  it('does not render when closed', () => {
    mockUseResumeStore.mockReturnValue(buildStore());
    render(<SectionLabelsDialog isOpen={false} onClose={jest.fn()} />);
    expect(screen.queryByTestId('dialog')).not.toBeInTheDocument();
  });

  it('renders when open', () => {
    mockUseResumeStore.mockReturnValue(buildStore());
    render(<SectionLabelsDialog isOpen={true} onClose={jest.fn()} />);
    expect(screen.getByTestId('dialog')).toBeInTheDocument();
  });

  it('renders inputs for all 8 sections', () => {
    mockUseResumeStore.mockReturnValue(buildStore());
    render(<SectionLabelsDialog isOpen={true} onClose={jest.fn()} />);
    // Each default label should appear as an input value
    Object.values(DEFAULT_SECTION_LABELS).forEach((label) => {
      expect(screen.getByDisplayValue(label)).toBeInTheDocument();
    });
  });

  it('shows the section field labels', () => {
    mockUseResumeStore.mockReturnValue(buildStore());
    render(<SectionLabelsDialog isOpen={true} onClose={jest.fn()} />);
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Summary')).toBeInTheDocument();
  });
});

describe('SectionLabelsDialog — editing', () => {
  it('typing in an input updates the displayed value', async () => {
    mockUseResumeStore.mockReturnValue(buildStore());
    const user = userEvent.setup();
    render(<SectionLabelsDialog isOpen={true} onClose={jest.fn()} />);
    const expInput = screen.getByDisplayValue(DEFAULT_SECTION_LABELS.experience);
    await act(async () => {
      await user.clear(expInput);
      await user.type(expInput, 'WORK HISTORY');
    });
    expect(screen.getByDisplayValue('WORK HISTORY')).toBeInTheDocument();
  });

  it('reset button restores all default values', async () => {
    mockUseResumeStore.mockReturnValue(buildStore());
    const user = userEvent.setup();
    render(<SectionLabelsDialog isOpen={true} onClose={jest.fn()} />);
    const expInput = screen.getByDisplayValue(DEFAULT_SECTION_LABELS.experience);
    await act(async () => {
      await user.clear(expInput);
      await user.type(expInput, 'CAREER');
    });
    await act(async () => {
      await user.click(screen.getByText('Reset to defaults'));
    });
    expect(screen.getByDisplayValue(DEFAULT_SECTION_LABELS.experience)).toBeInTheDocument();
  });
});

describe('SectionLabelsDialog — save', () => {
  it('calls updateSectionLabel for each section on save', async () => {
    const updateSectionLabel = jest.fn();
    mockUseResumeStore.mockReturnValue(buildStore({ updateSectionLabel }));
    const user = userEvent.setup();
    render(<SectionLabelsDialog isOpen={true} onClose={jest.fn()} />);
    await act(async () => {
      await user.click(screen.getByText('Save Changes'));
    });
    // Should be called once per section (8 total)
    expect(updateSectionLabel).toHaveBeenCalledTimes(8);
  });

  it('saves the typed value for a modified label', async () => {
    const updateSectionLabel = jest.fn();
    mockUseResumeStore.mockReturnValue(buildStore({ updateSectionLabel }));
    const user = userEvent.setup();
    render(<SectionLabelsDialog isOpen={true} onClose={jest.fn()} />);
    const skillsInput = screen.getByDisplayValue(DEFAULT_SECTION_LABELS.skills);
    await act(async () => {
      await user.clear(skillsInput);
      await user.type(skillsInput, 'TECHNICAL SKILLS');
    });
    await act(async () => {
      await user.click(screen.getByText('Save Changes'));
    });
    expect(updateSectionLabel).toHaveBeenCalledWith('skills', 'TECHNICAL SKILLS');
  });

  it('calls onClose after saving', async () => {
    const onClose = jest.fn();
    mockUseResumeStore.mockReturnValue(buildStore());
    const user = userEvent.setup();
    render(<SectionLabelsDialog isOpen={true} onClose={onClose} />);
    await act(async () => {
      await user.click(screen.getByText('Save Changes'));
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('SectionLabelsDialog — cancel', () => {
  it('calls onClose without saving when Cancel is clicked', async () => {
    const updateSectionLabel = jest.fn();
    const onClose = jest.fn();
    mockUseResumeStore.mockReturnValue(buildStore({ updateSectionLabel }));
    const user = userEvent.setup();
    render(<SectionLabelsDialog isOpen={true} onClose={onClose} />);
    await act(async () => {
      await user.click(screen.getByText('Cancel'));
    });
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(updateSectionLabel).not.toHaveBeenCalled();
  });
});

describe('SectionLabelsDialog — sync on reopen', () => {
  it('resets to store values when re-opened', async () => {
    const updateSectionLabel = jest.fn();
    mockUseResumeStore.mockReturnValue(buildStore({ updateSectionLabel }));
    const user = userEvent.setup();
    const { rerender } = render(<SectionLabelsDialog isOpen={true} onClose={jest.fn()} />);
    // Change a value
    const eduInput = screen.getByDisplayValue(DEFAULT_SECTION_LABELS.education);
    await act(async () => {
      await user.clear(eduInput);
      await user.type(eduInput, 'ACADEMICS');
    });
    // Close and reopen without saving
    rerender(<SectionLabelsDialog isOpen={false} onClose={jest.fn()} />);
    rerender(<SectionLabelsDialog isOpen={true} onClose={jest.fn()} />);
    await waitFor(() => {
      expect(screen.getByDisplayValue(DEFAULT_SECTION_LABELS.education)).toBeInTheDocument();
    });
  });
});
