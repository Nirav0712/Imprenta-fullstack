import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { RecentlyViewedProvider } from "./context/RecentlyViewedContext";
import { TemplateProvider } from "./context/TemplateContext";

// Google Translate DOM mutation safety patch for React Virtual DOM
if (typeof Node === "function" && Node.prototype) {
  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) {
      if (console) {
        console.warn("Cannot remove a child from a different parent", child, this);
      }
      return child;
    }
    return originalRemoveChild.apply(this, arguments);
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) {
      if (console) {
        console.warn("Cannot insert before a reference node from a different parent", referenceNode, this);
      }
      return newNode;
    }
    return originalInsertBefore.apply(this, arguments);
  };
}

// Suppress Google Translate top banner and body top offset
if (typeof window !== "undefined") {
  const enforceCleanTop = () => {
    if (document.body) {
      if (document.body.style.top && document.body.style.top !== "0px") {
        document.body.style.setProperty("top", "0px", "important");
      }
      if (document.body.style.position && document.body.style.position !== "static") {
        document.body.style.setProperty("position", "static", "important");
      }
    }
    // Also hide any translate banner iframes if injected
    const frames = document.querySelectorAll(
      "iframe.skiptranslate, .goog-te-banner-frame, iframe[id*=':']"
    );
    frames.forEach((frame) => {
      frame.style.setProperty("display", "none", "important");
      frame.style.setProperty("visibility", "hidden", "important");
      frame.style.setProperty("height", "0px", "important");
      frame.style.setProperty("width", "0px", "important");
    });
  };

  if (typeof MutationObserver !== "undefined") {
    const observer = new MutationObserver(() => {
      enforceCleanTop();
    });

    const startObserving = () => {
      if (document.body) {
        observer.observe(document.body, {
          attributes: true,
          attributeFilter: ["style", "class"],
          childList: true,
        });
        enforceCleanTop();
      }
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", startObserving);
    } else {
      startObserving();
    }
  }

  // Periodic safety check during initial seconds of translation
  setInterval(enforceCleanTop, 300);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecentlyViewedProvider>
      <TemplateProvider>
        <App />
      </TemplateProvider>
    </RecentlyViewedProvider>
  </React.StrictMode>
);