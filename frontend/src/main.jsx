import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrivyProvider } from '@privy-io/react-auth';
import "./index.css";
import App from "./App.jsx";

const privyAppId = import.meta.env.VITE_PRIVY_APP_ID || 'your_privy_app_id_here';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PrivyProvider
      appId={privyAppId}
      config={{
        loginMethods: ['email', 'wallet', 'apple', 'twitter', 'github'],
        appearance: {
          theme: 'light',
          accentColor: '#3B82F6',
        },
      }}
    >
      <App />
    </PrivyProvider>
  </StrictMode>
);
