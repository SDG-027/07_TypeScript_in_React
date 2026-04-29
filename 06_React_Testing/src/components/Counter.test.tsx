import { test, expect, describe, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Counter from './Counter';

test('Counter renders', async () => {
  render(<Counter />);

  expect(
    await screen.findByRole('heading', {
      name: 'Counter Component',
    })
  ).toBeInTheDocument();

  expect(
    await screen.findByRole('button', { name: 'Reset' })
  ).toBeInTheDocument();
});

describe('Button Functionality', () => {
  it('increments counter when + button is clicked', () => {
    // Arrange
    render(<Counter />);
    const incrementBtn = screen.getByRole('button', { name: '+' });
    // Act
    fireEvent.click(incrementBtn);
    fireEvent.click(incrementBtn);
    // Assert
    expect(screen.getByText('2')).toBeInTheDocument();
  });
  it('decrements counter when - button is clicked', () => {
    // Arrange
    render(<Counter initialValue={5} />);
    const decrementBtn = screen.getByRole('button', { name: '-' });
    // Act
    fireEvent.click(decrementBtn);
    fireEvent.click(decrementBtn);
    // Assert
    expect(screen.getByText('3')).toBeInTheDocument();
  });
  it('resets counter to initial value when reset button is clicked', () => {
    // Arrange
    render(<Counter initialValue={3} />);
    const incrementBtn = screen.getByRole('button', { name: '+' });
    const resetBtn = screen.getByRole('button', { name: /reset/i });
    // Act
    fireEvent.click(incrementBtn);
    fireEvent.click(incrementBtn);
    fireEvent.click(resetBtn);
    // Assert
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
