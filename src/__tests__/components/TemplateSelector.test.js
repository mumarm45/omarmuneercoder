
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TemplateSelector from '../../components/TemplateSelector';
import useResumeStore from '../../store/resumeStore';

// Mock the store
jest.mock('../../store/resumeStore');

describe('TemplateSelector Component', () => {
  const mockSetTemplate = jest.fn();

  beforeEach(() => {
    useResumeStore.mockReturnValue({
      selectedTemplate: 'modern',
      setTemplate: mockSetTemplate
    });
    mockSetTemplate.mockClear();
  });

  it('should render all template options', () => {
    render(<TemplateSelector />);

    expect(screen.getByText('Modern')).toBeInTheDocument();
    expect(screen.getByText('Classic')).toBeInTheDocument();
    expect(screen.getByText('Minimal')).toBeInTheDocument();
  });

  it('should highlight the selected template', () => {
    render(<TemplateSelector />);

    const modernButton = screen.getByText('Modern').closest('button');
    expect(modernButton).toHaveClass('border-blue-500');
  });

  it('should call setTemplate when a template is clicked', async () => {
    const user = userEvent.setup();
    render(<TemplateSelector />);

    const classicButton = screen.getByText('Classic').closest('button');
    await user.click(classicButton);

    expect(mockSetTemplate).toHaveBeenCalledWith('classic');
  });

  it('should update highlight when different template is selected', () => {
    const { rerender } = render(<TemplateSelector />);

    useResumeStore.mockReturnValue({
      selectedTemplate: 'minimal',
      setTemplate: mockSetTemplate
    });

    rerender(<TemplateSelector />);

    const minimalButton = screen.getByText('Minimal').closest('button');
    expect(minimalButton).toHaveClass('border-blue-500');
  });
});
