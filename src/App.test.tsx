import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock für localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock für Supabase mit besserer Typisierung
jest.mock('./lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        order: jest.fn(() => Promise.resolve({ data: [], error: null }))
      }))
    }))
  },
  testSupabaseConnection: jest.fn(() => Promise.resolve({ success: true, error: null }))
}));

// Mock für console.log um Debug-Output zu reduzieren
const originalConsoleLog = console.log;
beforeAll(() => {
  console.log = jest.fn();
});

afterAll(() => {
  console.log = originalConsoleLog;
});

test('renders LA OLA Technik-Doku', () => {
  render(<App />);
  const titleElement = screen.getByText(/LA OLA/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders login form initially', () => {
  render(<App />);
  const loginElement = screen.getByText(/Anmelden/i);
  expect(loginElement).toBeInTheDocument();
});
