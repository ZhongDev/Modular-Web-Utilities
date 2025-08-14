import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { registerSW } from "virtual:pwa-register";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker with auto-update. Prompt refresh when a new version is available.
const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    // Force refresh to get the latest modules when available
    window.location.reload();
  },
});

// Optionally, check for updates periodically while the app is open
setInterval(() => {
  updateSW && updateSW();
}, 60 * 60 * 1000);
