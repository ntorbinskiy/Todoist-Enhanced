const isCompleteTask = (svgPath) =>
  svgPath === "sm1/notification_completed.svg";

const getItemScore = (name, regex) => {
  const scoreText = name.replaceAll("\n", " ").match(regex)?.groups?.["score"];
  return scoreText ? parseInt(scoreText) : undefined;
};

const getItemsScores = (tasks, getItemScore, regexForScoreAndPoints) => {
  return tasks.map((task) => {
    const taskChildNodes = [...task.childNodes];
    return taskChildNodes
      .map((taskChildNode) => {
        const svgPathOfItemChildNode =
          taskChildNode.querySelector("svg").dataset.svgsPath;

        if (isCompleteTask(svgPathOfItemChildNode)) {
          const itemScore = getItemScore(
            taskChildNode.innerText,
            regexForScoreAndPoints
          );

          return itemScore ?? 0;
        } else {
          return 0;
        }
      })
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  });
};

const setStylesForScores = (
  scoreSum,
  scoreText,
  scoreBlockParent,
  pointsCount
) => {
  scoreSum.innerHTML = pointsCount;
  scoreSum.style.fontSize = "12px";
  scoreSum.style.fontWeight = 700;
  scoreSum.style.fontFamily = "Inter";
  scoreSum.style.position = "relative";
  scoreSum.id = "scoreSum";

  scoreText.innerHTML = `Total Score For This Day: `;
  scoreText.style.fontSize = "12px";
  scoreText.style.fontWeight = 400;
  scoreText.style.fontFamily = "Inter";
  scoreText.style.position = "relative";

  scoreBlockParent.style.display = "flex";
  scoreBlockParent.style.justifyContent = "space-between";
};

const postCounterToPage = (points, numForId, parent) => {
  const scoreBlock = document.createElement("div");
  const scoreText = document.createElement("span");
  const scoreSum = document.createElement("span");

  const scoreBlockParent = parent[numForId].querySelector("h2");

  scoreBlock.append(scoreText, scoreSum);

  setStylesForScores(scoreSum, scoreText, scoreBlockParent, points);

  const scoreTextOnPage = scoreBlockParent?.querySelector("#scoreSum");

  if (
    scoreBlockParent.id === "counter" &&
    +scoreTextOnPage.textContent !== points
  ) {
    scoreTextOnPage.textContent = points;
  } else if (scoreBlockParent.id === "counter") {
    return;
  } else {
    scoreBlockParent.append(scoreBlock);
    scoreBlockParent.id = `counter`;
  }
};

const checkIsTaskCorrect = (regexForScoreAndPoints) => {
  const taskIcons = document.getElementsByClassName("avatar_event_icon");

  Array.from(taskIcons).map((taskIcon) => {
    const taskItem = taskIcon.parentElement.parentElement;

    if (!isCompleteTask(taskIcon.querySelector("svg").dataset.svgsPath)) {
      return;
    }

    const taskTime = taskItem.querySelector("span.activity_time");

    const taskName = taskItem.querySelector(".markdown_content").textContent;

    const taskText = taskItem.querySelector(".text");

    const score = getItemScore(taskName, regexForScoreAndPoints);

    if (score === undefined) {
      taskItem.style.backgroundColor = "rgba(246, 193, 4, 0.11)";
      if (taskTime?.id === "noPoints") {
        return;
      }

      const noPoints = document.createElement("span");

      noPoints.innerHTML = "No points entered for this task";
      taskTime.id = "noPoints";
      noPoints.style.fontSize = "11px";
      noPoints.style.fontWeight = 500;
      noPoints.style.fontFamily = "Inter";
      noPoints.style.color = "#BC760D";
      noPoints.style.position = "relative";
      noPoints.style.top = "0px";
      noPoints.style.left = "0px";

      if (taskName.length >= 86) {
        noPoints.style.left = "64px";
      }
      taskText.after(noPoints);
    }
  });
};

const activityModule = () => {
  const sectionsOfTasks = document.getElementsByClassName("section");
  const tasks = document.querySelectorAll("ul.items");
  const tasksArray = Array.from(tasks);
  const regexForScoreAndPoints = /^.*\[(?<score>\d+)\]\s*.*$/;

  getItemsScores(tasksArray, getItemScore, regexForScoreAndPoints).map(
    (task, index) => {
      return postCounterToPage(task, index, sectionsOfTasks);
    }
  );

  checkIsTaskCorrect(regexForScoreAndPoints);
};

export default activityModule;
