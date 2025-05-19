import { ErrorBoundary } from '@sentry/react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function SentryErrorBoundary({ children }: Props) {
  return (
    <ErrorBoundary
      fallback={
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h1>Algo salió mal.</h1>
          <p>Estamos trabajando para solucionarlo.</p>
        </div>
      }
      showDialog
    >
      {children}
    </ErrorBoundary>
  );
}