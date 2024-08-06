import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MultiStepForm from './MultiStepForm';

describe('MultiStepForm', () => {
  it('renders the first step', () => {
    render(<MultiStepForm />);
    expect(screen.getByText('How was your week overall?')).toBeInTheDocument();
  });

  it('renders the options for the first step', () => {
    render(<MultiStepForm />);
    expect(screen.getByText('👍')).toBeInTheDocument();
    expect(screen.getByText('🤔')).toBeInTheDocument();
    expect(screen.getByText('👎')).toBeInTheDocument();
  });

  it('moves to the next step when an option is selected', () => {
    render(<MultiStepForm />);
    fireEvent.click(screen.getByText('👍'));
    expect(screen.getByText('How productive were you?')).toBeInTheDocument();
  });

  it('submits the form after the last step', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );

    render(<MultiStepForm />);
    fireEvent.click(screen.getByText('👍'));
    fireEvent.click(screen.getByText('👍'));
    fireEvent.click(screen.getByText('👍'));

    await new Promise(resolve => setTimeout(resolve, 0)); // wait for the fetch to complete

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/responses', expect.any(Object));
    expect(screen.getByText('How was your week overall?')).toBeInTheDocument(); // to ensure form reset
  });
});
