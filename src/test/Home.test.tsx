import { screen, waitFor } from '@testing-library/react';
import Home from '@/components/private/Home/Home';
import { vi } from 'vitest';
import { render } from './testing.utils'; // Importamos nuestra versión personalizada

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      { _id: '1', name: 'Alice', username: 'alice' },
      { _id: '2', name: 'Bob', username: 'bob' }
    ])
  })
) as unknown as typeof fetch;

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
});

describe('Home component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe renderizar FollowCard con datos de fetch', async () => {
    render(<Home mode={false} />);
    
    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });
  });
});