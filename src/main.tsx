import * as Sentry from "@sentry/react";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router';

Sentry.init({
  dsn: "https://ce3ed47e85350b09e3f776221b9e7d45@o4509345132707840.ingest.us.sentry.io/4509345135263744",
  sendDefaultPii: true
});

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StrictMode>
);
