const setupSvg = (iconSvg, iconRect, iconLine, iconPath) => {
  iconSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  iconSvg.setAttribute("x", "0px");
  iconSvg.setAttribute("y", "0px");
  iconSvg.setAttribute("width", "20px");
  iconSvg.setAttribute("height", "20px");
  iconSvg.setAttribute("viewBox", "0 0 20 20");
  iconSvg.setAttribute("fill", "none");

  iconRect.setAttribute("x", "0.5");
  iconRect.setAttribute("y", "0.5");
  iconRect.setAttribute("width", "19");
  iconRect.setAttribute("height", "19");
  iconRect.setAttribute("rx", "1.5");
  iconRect.setAttribute("stroke", "#808080");

  iconLine.setAttribute("x1", "3");
  iconLine.setAttribute("y1", "5.5");
  iconLine.setAttribute("x2", "17");
  iconLine.setAttribute("y2", "5.5");
  iconLine.setAttribute("stroke", "#808080");

  iconPath.setAttribute(
    "d",
    "M10.9028 15.56C10.7401 15.3973 10.7265 15.1419 10.8621 14.9637L10.9028 14.9172L15.1388 10.6817L11.0648 10.69C10.8138 10.6905 10.6098 10.4875 10.6093 10.2364C10.6088 10.0082 10.7766 9.81891 10.9957 9.78598L11.0628 9.7809L16.2372 9.76976C16.2702 9.76969 16.3025 9.77316 16.3336 9.7798C16.3427 9.78203 16.3521 9.78433 16.3613 9.78692C16.3695 9.78894 16.3775 9.79144 16.3855 9.79416C16.3969 9.7983 16.4084 9.80277 16.4198 9.80773C16.4287 9.81143 16.4371 9.81538 16.4452 9.81957C16.4553 9.82487 16.4657 9.83074 16.476 9.83706C16.4833 9.84138 16.49 9.84579 16.4966 9.85037C16.5064 9.85727 16.5162 9.86467 16.5258 9.87252C16.5332 9.87842 16.5402 9.88456 16.5471 9.8909C16.5512 9.89484 16.5554 9.89895 16.5596 9.90315L16.5719 9.91576C16.578 9.92232 16.5839 9.92905 16.5895 9.93595L16.5596 9.90315C16.5799 9.92343 16.5979 9.94516 16.6135 9.96799C16.6173 9.97342 16.621 9.97913 16.6246 9.98493C16.632 9.99688 16.6387 10.0088 16.6448 10.021C16.6478 10.027 16.6509 10.0336 16.6539 10.0403C16.6598 10.0537 16.6649 10.067 16.6694 10.0805C16.6716 10.0868 16.6737 10.0936 16.6756 10.1004C16.6787 10.1115 16.6814 10.1225 16.6836 10.1335C16.6852 10.1412 16.6866 10.1495 16.6879 10.1579L16.6888 10.1644C16.6914 10.1843 16.6928 10.2044 16.6928 10.2246L16.682 15.4C16.6814 15.651 16.4775 15.8541 16.2265 15.8536C15.9983 15.8531 15.8097 15.6845 15.7777 15.4653L15.7729 15.3981L15.7808 11.3253L11.5456 15.56C11.3681 15.7375 11.0803 15.7375 10.9028 15.56Z"
  );

  iconPath.setAttribute("fill", "#808080");

  iconSvg.append(iconRect, iconLine, iconPath);

  return iconSvg;
};

const setButtonStyles = (button) => {
  button.className = "button-href";
  button.style.height = "24px";
  button.style.width = "24px";
  button.style.marginTop = "-1px";
};

const nodeToArray = (node) => {
  return Array.from(node);
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

  return Array.from(namesOfTasks)
    .filter((task) => {
      return modalDialog === null || !modalDialog.contains(task);
    })
    .map((nameOfTaskItem) => {
      const scoreText = nameOfTaskItem.textContent
        .replaceAll("\n", " ")
        .match(regexForTotalPoints)?.groups?.["score"];

      return scoreText ? parseInt(scoreText) : 0;
    })
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
};

const setTotalPointsStyle = (
  totalPointsElement,
  totalPointsSpan,
  buttonsGroup,
  totalPointsParent,
  headerOfProject,
  projectName,
  editProjectName,
  totalPoints
) => {
  headerOfProject.style.display = "grid";
  headerOfProject.style.gridTemplateRows = "0fr 2fr";
  headerOfProject.style.gridTemplateColumns = "auto auto";
  headerOfProject.style.alignItems = "center";
  headerOfProject.style.gap = "21px";

  totalPointsParent.style.minWidth = "190px";
  totalPointsParent.style.justifySelf = "end";
  totalPointsParent.style.gridColumnStart = -2;
  totalPointsParent.style.gridRowStart = 2;

  if (editProjectName) {
    editProjectName.style.gridRow = "span 2";
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

  buttonsGroup.style.gridColumnStart = 2;

  totalPointsElement.textContent = "Total points left for this project: ";
  totalPointsElement.style.fontFamily = "Inter";
  totalPointsElement.style.fontSize = "12px";

  totalPointsSpan.textContent = totalPoints;
  totalPointsSpan.style.fontFamily = "Inter";
  totalPointsSpan.style.fontSize = "12px";
  totalPointsSpan.style.fontWeight = "700";
  totalPointsSpan.id = "TOTAL_POINTS_SCORE_ID";
};

const totalPointsLogic = () => {
  const namesOfTasks = document.querySelectorAll("div.task_content");
  const headerOfProject = document.querySelector("div.view_header__content");
  const totalPointsParent = document.createElement("div");
  const totalPointsElement = document.createElement("div");
  const totalPointsSpan = document.createElement("span");
  const buttonsGroup = headerOfProject.querySelector(
    "div.view_header__actions"
  );
  const editProjectName = document.querySelector(
    "[data-testid=view_header__form]"
  );
  const projectName = document.querySelector("h1");
  const totalPointsId = "#TOTAL_POINTS_ID";
  const totalPointsScoreId = "#TOTAL_POINTS_SCORE_ID";

  setTotalPointsStyle(
    totalPointsElement,
    totalPointsSpan,
    buttonsGroup,
    totalPointsParent,
    headerOfProject,
    projectName,
    editProjectName,
    getTotalPoints(namesOfTasks)
  );

  totalPointsElement.append(totalPointsSpan);
  totalPointsParent.append(totalPointsElement);

  const totalPoints = headerOfProject.querySelector(totalPointsId);
  const totalPointsSpan2 = headerOfProject.querySelector(totalPointsScoreId);
  if (
    totalPoints &&
    +totalPointsSpan2?.textContent !== getTotalPoints(namesOfTasks)
  ) {
    totalPointsSpan2.textContent = getTotalPoints(namesOfTasks);
  } else if (totalPoints) {
    return;
  } else {
    headerOfProject.childNodes[1].after(totalPointsParent);
    totalPointsParent.id = "TOTAL_POINTS_ID";
  }
};

const projectModule = () => {
  linkLogic();
  totalPointsLogic();
};

export default projectModule;
