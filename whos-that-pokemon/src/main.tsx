import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PokemonProvider } from "./contexts/PokemonContext.tsx";
import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Analytics/>
    <PokemonProvider>
      <App />
    </PokemonProvider>
  </StrictMode>
);
