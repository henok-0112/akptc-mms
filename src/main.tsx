import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { OverlayProvider } from "./contexts/OverlayContext.tsx";
import "./i18n";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <OverlayProvider>
        <App />
      </OverlayProvider>
    </AuthProvider>
  </BrowserRouter>
);
