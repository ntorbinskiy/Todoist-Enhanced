const SCORE_SUM = "SCORE_SUM";

const setScoreSumStyles = (scoreSum, pointsCount) => {
  scoreSum.innerHTML = pointsCount;
  scoreSum.style.fontSize = "12px";
  scoreSum.style.fontWeight = 700;
  scoreSum.style.fontFamily = "inherit";
  scoreSum.style.position = "relative";
  scoreSum.id = SCORE_SUM;
};

const setScoreTextStyles = (scoreText) => {
  scoreText.innerHTML = "Total Score For This Day: ";
  scoreText.style.fontSize = "12px";
  scoreText.style.fontWeight = 400;
  scoreText.style.fontFamily = "inherit";
  scoreText.style.position = "relative";
};

const setScoreBlockParentStyles = (scoreBlockParent) => {
  scoreBlockParent.style.display = "flex";
  scoreBlockParent.style.justifyContent = "space-between";
};

const setStylesForScores = ({
  scoreSum,
  scoreText,
  scoreBlockParent,
  pointsCount,
}) => {
  setScoreSumStyles(scoreSum, pointsCount);
  setScoreTextStyles(scoreText);
  setScoreBlockParentStyles(scoreBlockParent);
};

export const findScoreBlockElement = (scoreBlockParent) => {
  return scoreBlockParent.querySelector(`#${SCORE_SUM}`);
};

export const updateScore = (scoreBlockParent, points) => {
  const scoreTextOnPage = scoreBlockParent.querySelector(`#${SCORE_SUM}`);

  scoreTextOnPage.textContent = points;
};

export const createScoreBlock = (scoreBlockParent, points) => {
  const scoreBlock = document.createElement("div");
  const scoreText = document.createElement("span");
  const scoreSum = document.createElement("span");

  scoreBlock.append(scoreText, scoreSum);

  const stylesForScoresOptions = {
    scoreSum,
    scoreText,
    scoreBlockParent,
    points,
  };

  setStylesForScores(stylesForScoresOptions);

  return scoreBlock;
};
