import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import AddRemoveLayout from "./AddRemoveLayout";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    {/* <AddRemoveLayout /> */}
  </StrictMode>
);
