import { createNoPoints, findNoPointsElement } from "../components/noPoints";
import {
  createScoreBlock,
  findScoreBlockElement,
  updateScore,
} from "../components/scoreBlock";
import nodeToArray from "../helpers/nodeToArray";

const isCompleteTask = (svgPath) => {
  const completedImagePath = "sm1/notification_completed.svg";

  return svgPath === completedImagePath;
};

const getItemScore = (name, regex) => {
  const scoreText = name.replaceAll("\n", " ").match(regex)?.groups?.["score"];
  return parseInt(scoreText) || undefined;
};

const getItemsScores = (tasks, getItemScore, regexForScoreAndPoints) => {
  return tasks.map((task) => {
    const taskChildNodes = nodeToArray(task.childNodes);

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

const postCounterToPage = (points, indexOfParent, parent) => {
  const scoreBlockParent = parent[indexOfParent].querySelector("h2");

  const scoreBlockElement = findScoreBlockElement(scoreBlockParent);

  if (!scoreBlockElement) {
    const scoreBlock = createScoreBlock(scoreBlockParent, points);
    scoreBlockParent.append(scoreBlock);
    return;
  }

  updateScore(scoreBlockParent, points);
};

const isTaskCorrect = (regexForScoreAndPoints) => {
  const taskIcons = document.getElementsByClassName("avatar_event_icon");

  nodeToArray(taskIcons).map((taskIcon) => {
    if (!isCompleteTask(taskIcon.querySelector("svg").dataset.svgsPath)) {
      return;
    }

    const taskItem = taskIcon.parentElement.parentElement;

    const score = getItemScore(taskName, regexForScoreAndPoints);

    const noPointsElement = findNoPointsElement(taskItem);

    if (!noPointsElement && score === undefined) {
      const taskTime = taskItem.querySelector("span.activity_time");
      const taskName = taskItem.querySelector(".markdown_content").textContent;
      const taskText = taskItem.querySelector(".text");

      const noPointsOptions = {
        taskItem,
        taskTime,
        taskName,
      };

      const noPoints = createNoPoints(noPointsOptions);
      taskText.after(noPoints);

      return;
    }
  });
};

const activityModule = () => {
  const sectionsOfTasks = document.getElementsByClassName("section");
  const tasks = document.querySelectorAll("ul.items");
  const tasksArray = nodeToArray(tasks);
  const regexForScoreAndPoints = /^.*\[(?<score>\d+)\]\s*.*$/;

  getItemsScores(tasksArray, getItemScore, regexForScoreAndPoints).map(
    (points, index) => {
      return postCounterToPage(points, index, sectionsOfTasks);
    }
  );

  isTaskCorrect(regexForScoreAndPoints);
};

export default activityModule;
