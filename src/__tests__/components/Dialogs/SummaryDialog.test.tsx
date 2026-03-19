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
import SummaryDialog from '../../../components/Dialogs/SummaryDialog';

const mockUseResumeStore = useResumeStore as jest.MockedFunction<typeof useResumeStore>;

function buildStore(summary = 'Experienced developer.', overrides = {}) {
  return {
    resumeData: { summary },
    updateSummary: jest.fn(),
    ...overrides,
  } as any;
}

describe('SummaryDialog — rendering', () => {
  it('does not render when closed', () => {
    mockUseResumeStore.mockReturnValue(buildStore());
    render(<SummaryDialog isOpen={false} onClose={jest.fn()} />);
    expect(screen.queryByTestId('dialog')).not.toBeInTheDocument();
  });

  it('renders when open', () => {
    mockUseResumeStore.mockReturnValue(buildStore());
    render(<SummaryDialog isOpen={true} onClose={jest.fn()} />);
    expect(screen.getByTestId('dialog')).toBeInTheDocument();
  });

  it('displays the current summary in the textarea', () => {
    mockUseResumeStore.mockReturnValue(buildStore('A skilled engineer.'));
    render(<SummaryDialog isOpen={true} onClose={jest.fn()} />);
    expect(screen.getByDisplayValue('A skilled engineer.')).toBeInTheDocument();
  });
});

describe('SummaryDialog — editing', () => {
  it('allows typing in the textarea', async () => {
    mockUseResumeStore.mockReturnValue(buildStore('Old summary.'));
    const user = userEvent.setup();
    render(<SummaryDialog isOpen={true} onClose={jest.fn()} />);
    const textarea = screen.getByRole('textbox');
    await act(async () => {
      await user.clear(textarea);
      await user.type(textarea, 'New summary.');
    });
    expect(screen.getByDisplayValue('New summary.')).toBeInTheDocument();
  });
});

describe('SummaryDialog — save', () => {
  it('calls updateSummary with the current text and closes', async () => {
    const updateSummary = jest.fn();
    const onClose = jest.fn();
    mockUseResumeStore.mockReturnValue(buildStore('Original.', { updateSummary }));
    const user = userEvent.setup();
    render(<SummaryDialog isOpen={true} onClose={onClose} />);
    const textarea = screen.getByRole('textbox');
    await act(async () => {
      await user.clear(textarea);
      await user.type(textarea, 'Updated summary text.');
    });
    await act(async () => {
      await user.click(screen.getByText('Save Changes'));
    });
    expect(updateSummary).toHaveBeenCalledWith('Updated summary text.');
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('SummaryDialog — cancel', () => {
  it('calls onClose without saving when Cancel is clicked', async () => {
    const updateSummary = jest.fn();
    const onClose = jest.fn();
    mockUseResumeStore.mockReturnValue(buildStore('Original.', { updateSummary }));
    const user = userEvent.setup();
    render(<SummaryDialog isOpen={true} onClose={onClose} />);
    await act(async () => {
      await user.click(screen.getByText('Cancel'));
    });
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(updateSummary).not.toHaveBeenCalled();
  });
});

describe('SummaryDialog — sync on reopen', () => {
  it('resets textarea to current store value when reopened', async () => {
    mockUseResumeStore.mockReturnValue(buildStore('Store summary.'));
    const { rerender } = render(<SummaryDialog isOpen={true} onClose={jest.fn()} />);
    // Type something without saving
    const user = userEvent.setup();
    const textarea = screen.getByRole('textbox');
    await act(async () => {
      await user.clear(textarea);
      await user.type(textarea, 'Unsaved changes.');
    });
    // Close and reopen
    rerender(<SummaryDialog isOpen={false} onClose={jest.fn()} />);
    rerender(<SummaryDialog isOpen={true} onClose={jest.fn()} />);
    await waitFor(() => {
      expect(screen.getByDisplayValue('Store summary.')).toBeInTheDocument();
    });
  });
});
