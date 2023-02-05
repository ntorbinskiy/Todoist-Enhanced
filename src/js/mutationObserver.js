import runApp from "./modules/runApp";

const config = {
  childList: true,
  subtree: true,
};

const callback = (mutationList, observer) => {
  //the second arg is required    ⬆️
  for (const mutation of mutationList) {
    if (mutation) {
      runApp();
    }
  }
};

const observer = new MutationObserver(callback);

const observeScript = () => {
  observer.observe(document.documentElement, config);
};

export default observeScript;
