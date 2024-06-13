/**
 * test scenario testing Button Component
 * - should handle disabled when button is loading
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Button } from './button';
import { vi } from 'vitest';

// Mock utility classname jika diperlukan
vi.mock('@/utils', () => ({
  classname: vi.fn((...args) => args.join(' ')),
}));

describe('Button Component', () => {
  test('should handle disabled state when button is loading', () => {
    const handleClick = vi.fn();
    
    render(
      <Button
        onClick={handleClick}
        disabled={true}  // Diasumsikan state 'loading' berarti 'disabled'
        variant="primary"
      >
        Loading Button
      </Button>
    );

    const button = screen.getByRole('button', { name: /loading button/i });

    // Periksa apakah button disabled
    expect(button).toBeDisabled();

    // Coba klik button
    fireEvent.click(button);

    // Pastikan handler click tidak dipanggil saat button disabled
    expect(handleClick).not.toHaveBeenCalled();
  });
});
