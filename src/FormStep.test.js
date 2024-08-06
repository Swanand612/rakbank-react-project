import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormStep from './FormStep';

describe('FormStep', () => {
  const mockOnSelect = jest.fn();
  const title = 'How was your week overall?';
  const options = [
    { icon: '👍', label: 'Good', value: 'good' },
    { icon: '🤔', label: 'Average', value: 'average' },
    { icon: '👎', label: 'Bad', value: 'bad' },
  ];

  it('renders the title', () => {
    render(<FormStep title={title} options={options} onSelect={mockOnSelect} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(<FormStep title={title} options={options} onSelect={mockOnSelect} />);
    options.forEach(option => {
      expect(screen.getByText(option.icon)).toBeInTheDocument();
    });
  });

  it('calls onSelect with the correct value when an option is clicked', () => {
    render(<FormStep title={title} options={options} onSelect={mockOnSelect} />);
    options.forEach(option => {
      fireEvent.click(screen.getByText(option.icon));
      expect(mockOnSelect).toHaveBeenCalledWith(option.value);
    });
  });
});
