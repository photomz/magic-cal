import { createApp } from "vue";
import App from "./App.vue";
// import "./index.css";

const ROOT = "div.JAPqpe.K0NPx"; // 'div.dwlvNd.Hrn1mc';

console.log("Cal: Hello from content.js!");

// Function to inject a new div into the Google Calendar DOM
function injectAppDiv() {
  const appDiv = document.createElement("div");
  appDiv.setAttribute("id", "vue-app-container");
  document.querySelector(ROOT).prepend(appDiv); // append first child

  return appDiv;
}

function waitForElementAndInject() {
  const rootNode = document.querySelector(ROOT);
  if (document.readyState === "complete" && rootNode) {
    console.log("Cal: Element found, injecting button");
    const appContainer = injectAppDiv();
    createApp(App).mount("#vue-app-container");
  } else {
    // Use setTimeout to periodically check the condition
    console.log("Cal: Element not found, waiting");
    setTimeout(waitForElementAndInject, 500);
  }
}

// Start the waiting process
try {
  waitForElementAndInject();
} catch (error) {
  console.error("Cal error: ", error);
}
