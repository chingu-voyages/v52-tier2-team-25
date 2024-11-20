import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthContextProvider } from "./hooks/useAuth";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <StrictMode>
        <App />
      </StrictMode>
      <ReactQueryDevtools initialIsOpen={false} />
    </AuthContextProvider>
  </QueryClientProvider>
);
