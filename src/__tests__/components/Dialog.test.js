
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dialog from '../../components/Dialog';

describe('Dialog Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('should not render when isOpen is false', () => {
    render(
      <Dialog isOpen={false} onClose={mockOnClose} title="Test Dialog">
        <div>Test Content</div>
      </Dialog>
    );

    expect(screen.queryByText('Test Dialog')).not.toBeInTheDocument();
  });

  it('should render when isOpen is true', () => {
    render(
      <Dialog isOpen={true} onClose={mockOnClose} title="Test Dialog">
        <div>Test Content</div>
      </Dialog>
    );

    expect(screen.getByText('Test Dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <Dialog isOpen={true} onClose={mockOnClose} title="Test Dialog">
        <div>Test Content</div>
      </Dialog>
    );

    const closeButton = screen.getByRole('button');
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when backdrop is clicked', async () => {
    const user = userEvent.setup();
    
    const { container } = render(
      <Dialog isOpen={true} onClose={mockOnClose} title="Test Dialog">
        <div>Test Content</div>
      </Dialog>
    );

    const backdrop = container.querySelector('.fixed.inset-0.bg-black');
    await user.click(backdrop);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should render with different sizes', () => {
    const { rerender } = render(
      <Dialog isOpen={true} onClose={mockOnClose} title="Test Dialog" size="sm">
        <div>Test Content</div>
      </Dialog>
    );

    let dialog = screen.getByText('Test Content').closest('.relative');
    expect(dialog).toHaveClass('max-w-md');

    rerender(
      <Dialog isOpen={true} onClose={mockOnClose} title="Test Dialog" size="lg">
        <div>Test Content</div>
      </Dialog>
    );

    dialog = screen.getByText('Test Content').closest('.relative');
    expect(dialog).toHaveClass('max-w-4xl');
  });

  it('should not call onClose when dialog content is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <Dialog isOpen={true} onClose={mockOnClose} title="Test Dialog">
        <div>Test Content</div>
      </Dialog>
    );

    const content = screen.getByText('Test Content');
    await user.click(content);

    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
