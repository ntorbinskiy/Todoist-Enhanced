import nodeToArray from "../helpers/nodeToArray";
import createOpenTaskButton from "../components/openTaskButton";
import {
  createTotalPoints,
  findTotalPointsElement,
  updateTotalPointsScore,
} from "../components/totalPoints";

const setHeaderOfProjectStyles = (headerOfProject) => {
  headerOfProject.style.display = "grid";
  headerOfProject.style.gridTemplateRows = "0fr 2fr";
  headerOfProject.style.gridTemplateColumns = "auto auto";
  headerOfProject.style.alignItems = "center";
  headerOfProject.style.gap = "21px";
};

const setButtonGroupStyles = (buttonsGroup) => {
  buttonsGroup.style.gridColumnStart = 2;
};

const linkLogic = () => {
  const listOfTasks = document.getElementsByClassName("items");

  nodeToArray(listOfTasks).map((task) =>
    nodeToArray(task.childNodes).map((taskChildNode) => {
      const buttonLinkParent = taskChildNode.querySelector(
        ".task_list_item__actions--active"
      )?.childNodes;

      if (!buttonLinkParent) {
        return;
      }

      taskChildNode.addEventListener("mouseenter", () => {
        if (buttonLinkParent[0].className !== "button-href") {
          const openTaskButton = createOpenTaskButton(
            taskChildNode.dataset.itemId
          );

          buttonLinkParent[0].before(openTaskButton);
        }
      });
    })
  );
};

const getTotalPoints = (namesOfTasks) => {
  const regexForTotalPoints = /^.*\[(?<score>\d+)\]\s*.*$/;
  const modalDialog = document.querySelector("div[role=dialog]");

  return nodeToArray(namesOfTasks)
    .filter((task) => {
      return modalDialog === null || !modalDialog.contains(task);
    })
    .map((nameOfTaskItem) => {
      const scoreText = nameOfTaskItem.textContent
        .replaceAll("\n", " ")
        .match(regexForTotalPoints)?.groups?.["score"];

      return parseInt(scoreText) || 0;
    })
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
};

const setTotalPointsStyle = ({
  buttonsGroup,
  headerOfProject,
  projectName,
  editProjectNameMode,
}) => {
  setHeaderOfProjectStyles(headerOfProject);

  setButtonGroupStyles(buttonsGroup);

  if (editProjectNameMode) {
    editProjectNameMode.style.gridRow = "span 2";
  } else if (projectName) {
    projectName.style.gridRowStart = 2;
  }

  if (
    projectName?.parentElement &&
    projectName?.parentElement !== headerOfProject
  ) {
    projectName.parentElement.style.gridRowStart = 2;
    headerOfProject.style.alignItems = "center";
  }
};

const totalPointsLogic = () => {
  const namesOfTasks = document.querySelectorAll("div.task_content");
  const headerOfProject = document.querySelector("div.view_header__content");
  const buttonsGroup = headerOfProject.querySelector(
    "div.view_header__actions"
  );
  const editProjectNameMode = document.querySelector(
    "[data-testid=view_header__form]"
  );
  const projectName = document.querySelector("h1");

  const totalPointsOptions = {
    buttonsGroup,
    headerOfProject,
    projectName,
    editProjectNameMode,
  };

  setTotalPointsStyle(totalPointsOptions);

  const totalPointsScore = getTotalPoints(namesOfTasks);

  const totalPointsElement = findTotalPointsElement();

  if (!totalPointsElement) {
    const totalPoints = createTotalPoints(totalPointsScore);
    buttonsGroup.after(totalPoints);
    return;
  }

  updateTotalPointsScore(totalPointsElement, totalPointsScore);
};

const projectModule = () => {
  linkLogic();
  totalPointsLogic();
};

export default projectModule;
