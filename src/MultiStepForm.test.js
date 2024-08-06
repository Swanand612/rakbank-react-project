import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
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

  it('renders the dot indicators', () => {
    render(<MultiStepForm />);
    const dots = screen.getAllByRole('presentation');
    expect(dots.length).toBe(3);
    expect(dots[0]).toHaveClass('dot active');
    expect(dots[1]).toHaveClass('dot');
    expect(dots[2]).toHaveClass('dot');
  });

  it('moves to the next question when an option is selected', async () => {
    await act(async () => {
      render(<MultiStepForm />);
      fireEvent.click(screen.getByText('👍'));
    });
    expect(screen.getByText('How productive were you?')).toBeInTheDocument();
    const dots = screen.getAllByRole('presentation');
    expect(dots[0]).not.toHaveClass('dot active');
    expect(dots[1]).toHaveClass('dot active');
  });

  it('submits the response for each question', async () => {
    await act(async () => {
      render(<MultiStepForm />);
      
      // Clicking through all steps
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
    });

    await new Promise(resolve => setTimeout(resolve, 0));
    expect(screen.getByText('How was your week overall?')).toBeInTheDocument();
    const dots = screen.getAllByRole('presentation');
    expect(dots[0]).toHaveClass('dot active');
    expect(dots[1]).toHaveClass('dot');
    expect(dots[2]).toHaveClass('dot');
  });
});
