import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; // Se falhar, tente mudar para './App.tsx'
import "./index.css"; // Certifique-se de que seu arquivo CSS global tem esse nome

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "Não foi possível encontrar o elemento root. Verifique seu index.html.",
  );
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
