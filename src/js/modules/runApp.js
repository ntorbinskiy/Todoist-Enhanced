import activityModule from "./activity-module";
import projectModule from "./project-module";

const runApp = () => {
  const windowLink = window.location.href;
  const todoistLink = "https://todoist.com/app";
  if (
    windowLink.includes(`${todoistLink}/project`) ||
    windowLink === `${todoistLink}/today`
  ) {
    projectModule();
  } else if (windowLink.includes(`${todoistLink}/activity`)) {
    activityModule();
  }
};

export default runApp;
