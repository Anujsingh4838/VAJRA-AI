import { StrictMode } from "react";
import { Toaster } from "react-hot-toast";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Toaster
  position="top-right"
  toastOptions={{
    duration: 3500,
    style: {
      background: "#12213d",
      color: "#ffffff",
      border: "1px solid #2b4d7f",
    },
  }}
/>
  </StrictMode>,
);