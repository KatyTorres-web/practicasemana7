import { StrictMode, Profiler } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import "./index.css";

function handleRender() {
  // Las métricas se analizarán con React DevTools Profiler.
  // No usamos console.log para medir rendimiento.
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <Profiler id="CozyQuest" onRender={handleRender}>
        <App />
      </Profiler>
    </ThemeProvider>
  </StrictMode>,
);
