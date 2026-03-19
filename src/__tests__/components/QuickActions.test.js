import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import userEvent from '@testing-library/user-event';
import QuickActions from '../../components/QuickActions';

// Mock the three dialogs opened by QuickActions
jest.mock('../../components/Dialogs/PersonalInfoDialog', () => {
  return function MockPersonalInfoDialog({ isOpen, onClose }) {
    return isOpen ? (
      <div data-testid="personal-info-dialog">
        <button onClick={onClose}>Close Personal Info</button>
      </div>
    ) : null;
  };
});

jest.mock('../../components/Dialogs/SummaryDialog', () => {
  return function MockSummaryDialog({ isOpen, onClose }) {
    return isOpen ? (
      <div data-testid="summary-dialog">
        <button onClick={onClose}>Close Summary</button>
      </div>
    ) : null;
  };
});

jest.mock('../../components/Dialogs/SectionLabelsDialog', () => {
  return function MockSectionLabelsDialog({ isOpen, onClose }) {
    return isOpen ? (
      <div data-testid="section-labels-dialog">
        <button onClick={onClose}>Close Section Labels</button>
      </div>
    ) : null;
  };
});

describe('QuickActions', () => {
  it('renders the three action buttons', () => {
    render(<QuickActions />);
    expect(screen.getByText('Edit Heading')).toBeInTheDocument();
    expect(screen.getByText('Edit Summary')).toBeInTheDocument();
    expect(screen.getByText('Edit Section Labels')).toBeInTheDocument();
  });

  it('opens PersonalInfoDialog when "Edit Heading" is clicked', async () => {
    const user = userEvent.setup();
    render(<QuickActions />);
    await act(async () => {
      await user.click(screen.getByText('Edit Heading'));
    });
    expect(await screen.findByTestId('personal-info-dialog')).toBeInTheDocument();
  });

  it('closes PersonalInfoDialog when its onClose fires', async () => {
    const user = userEvent.setup();
    render(<QuickActions />);
    await act(async () => {
      await user.click(screen.getByText('Edit Heading'));
    });
    await act(async () => {
      await user.click(screen.getByText('Close Personal Info'));
    });
    await waitFor(() => {
      expect(screen.queryByTestId('personal-info-dialog')).not.toBeInTheDocument();
    });
  });

  it('opens SummaryDialog when "Edit Summary" is clicked', async () => {
    const user = userEvent.setup();
    render(<QuickActions />);
    await act(async () => {
      await user.click(screen.getByText('Edit Summary'));
    });
    expect(await screen.findByTestId('summary-dialog')).toBeInTheDocument();
  });

  it('closes SummaryDialog when its onClose fires', async () => {
    const user = userEvent.setup();
    render(<QuickActions />);
    await act(async () => {
      await user.click(screen.getByText('Edit Summary'));
    });
    await act(async () => {
      await user.click(screen.getByText('Close Summary'));
    });
    await waitFor(() => {
      expect(screen.queryByTestId('summary-dialog')).not.toBeInTheDocument();
    });
  });

  it('opens SectionLabelsDialog when "Edit Section Labels" is clicked', async () => {
    const user = userEvent.setup();
    render(<QuickActions />);
    await act(async () => {
      await user.click(screen.getByText('Edit Section Labels'));
    });
    expect(await screen.findByTestId('section-labels-dialog')).toBeInTheDocument();
  });

  it('closes SectionLabelsDialog when its onClose fires', async () => {
    const user = userEvent.setup();
    render(<QuickActions />);
    await act(async () => {
      await user.click(screen.getByText('Edit Section Labels'));
    });
    await act(async () => {
      await user.click(screen.getByText('Close Section Labels'));
    });
    await waitFor(() => {
      expect(screen.queryByTestId('section-labels-dialog')).not.toBeInTheDocument();
    });
  });

  it('only one dialog is open at a time', async () => {
    const user = userEvent.setup();
    render(<QuickActions />);
    await act(async () => {
      await user.click(screen.getByText('Edit Heading'));
    });
    // Summary and Labels dialogs should not be open
    expect(screen.queryByTestId('summary-dialog')).not.toBeInTheDocument();
    expect(screen.queryByTestId('section-labels-dialog')).not.toBeInTheDocument();
  });
});
