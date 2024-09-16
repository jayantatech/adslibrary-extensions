import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const Options = () => {
  return <div className="text-red-400">Options page</div>;
};

const optionsRootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(optionsRootElement);

root.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>
);
