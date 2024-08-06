import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MultiStepForm from './MultiStepForm';

describe('MultiStepForm', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  it('renders the first question', () => {
    render(<MultiStepForm />);
    expect(screen.getByText('How was your week overall?')).toBeInTheDocument();
  });

  it('renders the options', () => {
    render(<MultiStepForm />);
    expect(screen.getByText('👍')).toBeInTheDocument();
    expect(screen.getByText('🤔')).toBeInTheDocument();
    expect(screen.getByText('👎')).toBeInTheDocument();
  });

  it('moves to the next question when an option is selected', () => {
    render(<MultiStepForm />);
    fireEvent.click(screen.getByText('👍'));
    expect(screen.getByText('How productive were you?')).toBeInTheDocument();
  });

  it('submits the response for each question', async () => {
    render(<MultiStepForm />);
    
    // Click through all steps
    fireEvent.click(screen.getByText('👍'));
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3001/responses',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.stringContaining('How was your week overall?'),
      })
    );

    fireEvent.click(screen.getByText('👍'));
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3001/responses',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.stringContaining('How productive were you?'),
      })
    );

    fireEvent.click(screen.getByText('👍'));
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3001/responses',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.stringContaining('Did you achieve your goals?'),
      })
    );

    await new Promise(resolve => setTimeout(resolve, 0)); // wait for the fetch to complete
    expect(screen.getByText('How was your week overall?')).toBeInTheDocument();
  });
});
