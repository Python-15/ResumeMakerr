import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import SigninPage from './auth/signin';
import Home from './home/Home';
import Edit from './home/dshaboard/resume/[resumeid]/Edit';
import {
  createHashRouter,  // Use HashRouter instead of BrowserRouter
  RouterProvider,
} from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import DahsBoard from './home/dshaboard/DahsBoard';

const PUBLISHABLE_KEY = 'pk_test_Y29uY3JldGUtdG9hZC04OC5jbGVyay5hY2NvdW50cy5kZXYk';

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

const resumeRoute = createHashRouter([  // Change to createHashRouter
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'dashboard',
        element: <DahsBoard />,
      },
      {
        path: 'dashboard/resume/:resumeId/edit',
        element: <Edit />,
      },
    ],
  },
  {
    path: 'auth/signpage',
    element: <SigninPage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={resumeRoute} />
    </ClerkProvider>
  </StrictMode>
);
