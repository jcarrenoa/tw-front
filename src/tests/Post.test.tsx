import { screen } from '@testing-library/react';
import Post from '@/components/private/Post/Post';
import { vi } from 'vitest';
import { render } from './testing.utils'; // Importamos nuestra versión personalizada

// Mock para la función like
vi.mock('@/http/tweets', () => ({
  like: vi.fn().mockResolvedValue({ success: true }),
}));

describe('Post component', () => {
  it('debe renderizar nombre de usuario y contenido', () => {
    render(
      <Post
        id="123"
        user="Juan Pérez"
        userName="juanp"
        time="2023-01-01T12:00:00Z"
        likes={10}
      >
        Este es un tweet de prueba.
      </Post>
    );

    expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
    expect(screen.getByText(/@juanp/)).toBeInTheDocument();
    expect(screen.getByText('Este es un tweet de prueba.')).toBeInTheDocument();
  });
});