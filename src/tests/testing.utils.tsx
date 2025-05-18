// testing-utils.tsx
import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Creamos un wrapper personalizado para incluir el MemoryRouter
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <MemoryRouter>
      {children}
    </MemoryRouter>
  );
};

// Función de render personalizada que siempre usa nuestro wrapper
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-exportamos todo de testing-library
export * from '@testing-library/react';

// Sobreescribimos la función render
export { customRender as render };