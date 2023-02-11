import setupSvg from "../helpers/setupSvg";
import nodeToArray from "../helpers/nodeToArray";

const setButtonStyles = (button) => {
  button.className = "button-href";
  button.style.height = "24px";
  button.style.width = "24px";
  button.style.marginTop = "-1px";
};

const setHeaderOfProjectStyles = (headerOfProject) => {
  headerOfProject.style.display = "grid";
  headerOfProject.style.gridTemplateRows = "0fr 2fr";
  headerOfProject.style.gridTemplateColumns = "auto auto";
  headerOfProject.style.alignItems = "center";
  headerOfProject.style.gap = "21px";
};

const setTotalPointsParentStyles = (totalPointsParent) => {
  totalPointsParent.style.minWidth = "190px";
  totalPointsParent.style.justifySelf = "end";
  totalPointsParent.style.gridColumnStart = -2;
  totalPointsParent.style.gridRowStart = 2;
};

const setTotalPointsElementStyles = (totalPointsElement) => {
  totalPointsElement.textContent = "Total points left for this project: ";
  totalPointsElement.style.fontFamily = "inherit";
  totalPointsElement.style.fontSize = "12px";
};

const setTotalPointsSpanStyles = (totalPointsSpan, totalPoints) => {
  totalPointsSpan.textContent = totalPoints;
  totalPointsSpan.style.fontFamily = "inherit";
  totalPointsSpan.style.fontSize = "12px";
  totalPointsSpan.style.fontWeight = "700";
  totalPointsSpan.id = "TOTAL_POINTS_SCORE_ID";
};

const setButtonGroupStyles = (buttonsGroup) => {
  buttonsGroup.style.gridColumnStart = 2;
};

const linkLogic = () => {
  const listOfTasks = document.getElementsByClassName("items");

  nodeToArray(listOfTasks).map((task) =>
    nodeToArray(task.childNodes).map((taskChildNode) => {
      const button = document.createElement("button");
      const svgPath = "http://www.w3.org/2000/svg";

      const iconSvg = document.createElementNS(svgPath, "svg");
      const iconRect = document.createElementNS(svgPath, "rect");
      const iconLine = document.createElementNS(svgPath, "line");
      const iconPath = document.createElementNS(svgPath, "path");

      button.appendChild(setupSvg(iconSvg, iconRect, iconLine, iconPath));

      const buttonLinkParent = taskChildNode.querySelector(
        ".task_list_item__actions--active"
      )?.childNodes;

      if (!buttonLinkParent) {
        return;
      }

      setButtonStyles(button);

      taskChildNode.addEventListener("mouseenter", () => {
        if (!(buttonLinkParent[0].className === "button-href")) {
          buttonLinkParent[0].before(button);
        }
      });

      button.addEventListener("click", () => {
        window
          .open(
            `https://todoist.com/app/task/${taskChildNode.dataset.itemId}`,
            "_blank"
          )
          .focus();
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
  totalPointsElement,
  totalPointsSpan,
  buttonsGroup,
  totalPointsParent,
  headerOfProject,
  projectName,
  editProjectNameMode,
  totalPoints,
}) => {
  setHeaderOfProjectStyles(headerOfProject);

  setTotalPointsParentStyles(totalPointsParent);

  setTotalPointsElementStyles(totalPointsElement);

  setTotalPointsSpanStyles(totalPointsSpan, totalPoints);

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
  const totalPointsParent = document.createElement("div");
  const totalPointsElement = document.createElement("div");
  const totalPointsSpan = document.createElement("span");

  const namesOfTasks = document.querySelectorAll("div.task_content");
  const headerOfProject = document.querySelector("div.view_header__content");
  const buttonsGroup = headerOfProject.querySelector(
    "div.view_header__actions"
  );
  const editProjectNameMode = document.querySelector(
    "[data-testid=view_header__form]"
  );
  const projectName = document.querySelector("h1");

  const totalPointsId = "#TOTAL_POINTS_ID";
  const totalPointsScoreId = "#TOTAL_POINTS_SCORE_ID";

  const totalPointsOptions = {
    totalPointsElement,
    totalPointsSpan,
    buttonsGroup,
    totalPointsParent,
    headerOfProject,
    projectName,
    editProjectNameMode,
    totalPoints: getTotalPoints(namesOfTasks),
  };

  setTotalPointsStyle(totalPointsOptions);

  totalPointsElement.append(totalPointsSpan);
  totalPointsParent.append(totalPointsElement);

  const totalPoints = headerOfProject.querySelector(totalPointsId);
  const totalPointsSpan2 = headerOfProject.querySelector(totalPointsScoreId);

  if (
    totalPoints &&
    parseInt(totalPointsSpan2?.textContent) !== getTotalPoints(namesOfTasks)
  ) {
    totalPointsSpan2.textContent = getTotalPoints(namesOfTasks);
  } else if (totalPoints) {
    return;
  } else {
    buttonsGroup.after(totalPointsParent);
    totalPointsParent.id = "TOTAL_POINTS_ID";
  }
};

const projectModule = () => {
  linkLogic();
  totalPointsLogic();
};

export default projectModule;
