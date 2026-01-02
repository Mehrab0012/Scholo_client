import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router";
import router from "./router/router.jsx";
import AuthProvider from './provider/AuthProvider.jsx';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from './stripe/stripe.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>

    <AuthProvider>
      <Elements stripe={stripePromise}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider>
      </Elements>
    </AuthProvider>

  </StrictMode>,
)
