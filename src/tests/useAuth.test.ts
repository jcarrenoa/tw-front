import { renderHook } from '@testing-library/react';
import useAuth from '@/hooks/useAuth';
import { vi, expect, test, beforeEach } from 'vitest';

// Mockeamos localStorage para simular su comportamiento
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

// Reemplazamos localStorage global con nuestro mock
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Limpiamos localStorage antes de cada test
beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});

// Ahora podemos probar correctamente el comportamiento de useAuth
test('debe inicializar con isLoading=false cuando termina de verificar localStorage', () => {
  // Dado que localStorage está vacío y el efecto se ejecuta síncronamente,
  // isLoading debería ser false después del renderizado inicial
  const { result } = renderHook(() => useAuth());
  
  // Verificamos que isLoading sea false como indica la implementación actual
  expect(result.current.isLoading).toBe(false);
  expect(result.current.isLogged).toBe(false);
  expect(result.current.user).toBe(null);
});

test('debe cargar los datos del usuario si existe en localStorage', () => {
  // Configuramos localStorage con datos de un usuario
  localStorage.setItem('authToken', 'fake-token');
  localStorage.setItem('name', 'Test User');
  localStorage.setItem('username', 'testuser');
  
  const { result } = renderHook(() => useAuth());
  
  // Verificamos que se carguen los datos correctamente
  expect(result.current.isLoading).toBe(false);
  expect(result.current.isLogged).toBe(true);
  expect(result.current.user).toEqual({
    name: 'Test User',
    username: 'testuser'
  });
});