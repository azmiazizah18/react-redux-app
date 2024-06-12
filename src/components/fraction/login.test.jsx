/**
 * Test Scenarios for LoginForm component:
 * 1. Should render the login form with email and password input fields,
 *    login button, and links for registration.
 * 2. Should handle input changes and call the onSubmit function with the correct
 *    data when the login button is clicked.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest'; // Import expect and vi from vitest
import { BrowserRouter as Router } from 'react-router-dom'; // To support Link
import { LoginForm } from '../components/login'; // Adjust the path to your component

describe('LoginForm', () => {
  it('renders the login form', () => {
    render(
      <Router>
        <LoginForm onSubmit={vi.fn()} />
      </Router>
    );

    expect(screen.getByPlaceholderText('leejeno@gmail.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('LeeJeno123')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /masuk/i })).toBeInTheDocument();
    expect(screen.getByText(/belum punya akun\?/i)).toBeInTheDocument();
    expect(screen.getByText(/daftar di sini\./i)).toBeInTheDocument();
  });

  it('handles input changes and login', () => {
    const mockOnSubmit = vi.fn();
    render(
      <Router>
        <LoginForm onSubmit={mockOnSubmit} />
      </Router>
    );

    const emailInput = screen.getByPlaceholderText('leejeno@gmail.com');
    const passwordInput = screen.getByPlaceholderText('LeeJeno123');
    const loginButton = screen.getByRole('button', { name: /masuk/i });

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('user@example.com');
    expect(passwordInput.value).toBe('password123');

    fireEvent.click(loginButton);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'password123',
    });
  });
});
