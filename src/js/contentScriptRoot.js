import mutationObserver from "./mutationObserver";
import runApp from "./modules/runApp";
import "../icons/icon128.png";
import "../icons/icon48.png";
import "../icons/icon32.png";
import "../icons/icon16.png";

const bootstrapApp = () => {
  runApp();
  mutationObserver();
};

const interval = setInterval(() => {
  const homeButton = document.querySelector("button.home_btn");
  if (homeButton) {
    bootstrapApp();
    clearInterval(interval);
  }
}, 100);
