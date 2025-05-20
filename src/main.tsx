import * as Sentry from "@sentry/react";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router';
import { GrowthBookProvider } from "@growthbook/growthbook-react";
import { growthbook } from "./growthbook";

Sentry.init({
  dsn: "https://ce3ed47e85350b09e3f776221b9e7d45@o4509345132707840.ingest.us.sentry.io/4509345135263744",
  sendDefaultPii: true
});

await growthbook.init({ streaming: true });

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<GrowthBookProvider growthbook={growthbook}>
				<App />
			</GrowthBookProvider>
		</BrowserRouter>
	</StrictMode>
);