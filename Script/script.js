"use strict";
const wonElement = document.querySelector("#won");

//assigning cells to variables
const firstCell = document.querySelector("#first-cell");
const secondCell = document.querySelector("#second-cell");
const thirdCell = document.querySelector("#third-cell");
const fourthCell = document.querySelector("#fourth-cell");
const fifthCell = document.querySelector("#fifth-cell");
const sixthCell = document.querySelector("#sixth-cell");
const seventhCell = document.querySelector("#seventh-cell");
const eighthCell = document.querySelector("#eighth-cell");
const ninthCell = document.querySelector("#ninth-cell");

//assigning buttons to variables
const newGameButton = document.querySelector("#new-game");
const gameModeSelector = document.querySelector("#game-mode");

//game state variables
let playerX = true;
let isPlayerXStart = true;
let isDraw = false;
let isPlayerXWon = true;
let count = 0;
let isWon = false;
let isPassAndPlay = true;
let allowToPlay = true;
let possibleOptions;

//state variables for check whether a cell is already clicked
let isFirstCellClicked;
let isSecondCellClicked;
let isThirdCellClicked;
let isFourthCellClicked;
let isFifthCellClicked;
let isSixthCellClicked;
let isSeventhCellClicked;
let isEighthCellClicked;
let isNinthCellClicked;

const removeStyleX = function () {
  firstCell.classList.remove("x");
  secondCell.classList.remove("x");
  thirdCell.classList.remove("x");
  fourthCell.classList.remove("x");
  fifthCell.classList.remove("x");
  sixthCell.classList.remove("x");
  seventhCell.classList.remove("x");
  eighthCell.classList.remove("x");
  ninthCell.classList.remove("x");
};

const removeStyleO = function () {
  firstCell.classList.remove("o");
  secondCell.classList.remove("o");
  thirdCell.classList.remove("o");
  fourthCell.classList.remove("o");
  fifthCell.classList.remove("o");
  sixthCell.classList.remove("o");
  seventhCell.classList.remove("o");
  eighthCell.classList.remove("o");
  ninthCell.classList.remove("o");
};

const clearTextContent = function () {
  firstCell.textContent = "";
  secondCell.textContent = "";
  thirdCell.textContent = "";
  fourthCell.textContent = "";
  fifthCell.textContent = "";
  sixthCell.textContent = "";
  seventhCell.textContent = "";
  eighthCell.textContent = "";
  ninthCell.textContent = "";
};

const resetIsClicked = function () {
  isFirstCellClicked = false;
  isSecondCellClicked = false;
  isThirdCellClicked = false;
  isFourthCellClicked = false;
  isFifthCellClicked = false;
  isSixthCellClicked = false;
  isSeventhCellClicked = false;
  isEighthCellClicked = false;
  isNinthCellClicked = false;
};

const newGame = function () {
  clearTextContent();
  resetIsClicked();
  removeStyleX();
  removeStyleO();
  count = 0;
  wonElement.textContent = ``;
  isWon = false;
  possibleOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  if (isDraw) {
    if (isPlayerXStart) {
      isPlayerXStart = false;
      playerX = false;
      if (gameMode() === "play-with-cpu") {
        CPUPlay();
      }
    } else {
      isPlayerXStart = true;
      playerX = true;
      allowToPlay = true;
    }
  } else if (isPlayerXWon) {
    isPlayerXStart = true;
    playerX = true;
    allowToPlay = true;
  } else {
    isPlayerXStart = false;
    playerX = false;
    if (gameMode() === "play-with-cpu") {
      CPUPlay();
    }
  }
};

const isWin = function (count) {
  if (
    (firstCell.textContent === "X" &&
      secondCell.textContent === "X" &&
      thirdCell.textContent === "X") ||
    (fourthCell.textContent === "X" &&
      fifthCell.textContent === "X" &&
      sixthCell.textContent === "X") ||
    (seventhCell.textContent === "X" &&
      eighthCell.textContent === "X" &&
      ninthCell.textContent === "X") ||
    (firstCell.textContent === "X" &&
      fourthCell.textContent === "X" &&
      seventhCell.textContent === "X") ||
    (secondCell.textContent === "X" &&
      fifthCell.textContent === "X" &&
      eighthCell.textContent === "X") ||
    (thirdCell.textContent === "X" &&
      sixthCell.textContent === "X" &&
      ninthCell.textContent === "X") ||
    (firstCell.textContent === "X" &&
      fifthCell.textContent === "X" &&
      ninthCell.textContent === "X") ||
    (thirdCell.textContent === "X" &&
      fifthCell.textContent === "X" &&
      seventhCell.textContent === "X")
  ) {
    isDraw = false;
    isPlayerXWon = true;
    wonElement.textContent = `Player X won`;
    isWon = true;
  } else if (
    (firstCell.textContent === "O" &&
      secondCell.textContent === "O" &&
      thirdCell.textContent === "O") ||
    (fourthCell.textContent === "O" &&
      fifthCell.textContent === "O" &&
      sixthCell.textContent === "O") ||
    (seventhCell.textContent === "O" &&
      eighthCell.textContent === "O" &&
      ninthCell.textContent === "O") ||
    (firstCell.textContent === "O" &&
      fourthCell.textContent === "O" &&
      seventhCell.textContent === "O") ||
    (secondCell.textContent === "O" &&
      fifthCell.textContent === "O" &&
      eighthCell.textContent === "O") ||
    (thirdCell.textContent === "O" &&
      sixthCell.textContent === "O" &&
      ninthCell.textContent === "O") ||
    (firstCell.textContent === "O" &&
      fifthCell.textContent === "O" &&
      ninthCell.textContent === "O") ||
    (thirdCell.textContent === "O" &&
      fifthCell.textContent === "O" &&
      seventhCell.textContent === "O")
  ) {
    isDraw = false;
    isPlayerXWon = false;
    if (isPassAndPlay) {
      wonElement.textContent = `Player O won`;
    } else {
      wonElement.textContent = `CPU won`;
    }
    isWon = true;
  } else if (count == 9) {
    isPlayerXWon = false;
    isDraw = true;
    wonElement.textContent = `Match draw`;
  }
};

const removeFromArray = function (cell) {
  let identifier = cell.id;
  if (identifier === "first-cell") {
    possibleOptions.splice(possibleOptions.indexOf(1), 1);
  } else if (identifier === "second-cell") {
    possibleOptions.splice(possibleOptions.indexOf(2), 1);
  } else if (identifier === "third-cell") {
    possibleOptions.splice(possibleOptions.indexOf(3), 1);
  } else if (identifier === "fourth-cell") {
    possibleOptions.splice(possibleOptions.indexOf(4), 1);
  } else if (identifier === "fifth-cell") {
    possibleOptions.splice(possibleOptions.indexOf(5), 1);
  } else if (identifier === "sixth-cell") {
    possibleOptions.splice(possibleOptions.indexOf(6), 1);
  } else if (identifier === "seventh-cell") {
    possibleOptions.splice(possibleOptions.indexOf(7), 1);
  } else if (identifier === "eighth-cell") {
    possibleOptions.splice(possibleOptions.indexOf(8), 1);
  } else if (identifier === "ninth-cell") {
    possibleOptions.splice(possibleOptions.indexOf(9), 1);
  }
};

const playing = function (cell, isClicked) {
  if (!isClicked && !isWon) {
    removeFromArray(cell);
    if (playerX) {
      cell.textContent = "X";
      playerX = false;
      cell.classList.add("x");
      count++;
      if (count > 4) {
        isWin(count);
      }
    } else {
      cell.textContent = "O";
      playerX = true;
      cell.classList.add("o");
      count++;
      if (count > 4) {
        isWin(count);
      }
    }
  }
};

//getting the game mode
const gameMode = function () {
  return document.querySelector("#game-mode").value;
};

const generateRandomNumber = function (max) {
  return Math.floor(Math.random() * max + 1);
};

const getTextContent = function (cell) {
  return cell.textContent;
};

const playRandom = function (random) {
  if (random === 1) {
    playing(firstCell, isFirstCellClicked);
    isFirstCellClicked = true;
  } else if (random === 2) {
    playing(secondCell, isSecondCellClicked);
    isSecondCellClicked = true;
  } else if (random === 3) {
    playing(thirdCell, isThirdCellClicked);
    isThirdCellClicked = true;
  } else if (random === 4) {
    playing(fourthCell, isFourthCellClicked);
    isFourthCellClicked = true;
  } else if (random === 5) {
    playing(fifthCell, isFifthCellClicked);
    isFifthCellClicked = true;
  } else if (random === 6) {
    playing(sixthCell, isSixthCellClicked);
    isSixthCellClicked = true;
  } else if (random === 7) {
    playing(seventhCell, isSeventhCellClicked);
    isSeventhCellClicked = true;
  } else if (random === 8) {
    playing(eighthCell, isEighthCellClicked);
    isEighthCellClicked = true;
  } else {
    playing(ninthCell, isNinthCellClicked);
    isNinthCellClicked = true;
  }
};

const CPUPlay = function () {
  if (
    getTextContent(firstCell) === "O" &&
    getTextContent(fourthCell) === "O" &&
    !isSeventhCellClicked
  ) {
    playing(seventhCell, isSeventhCellClicked);
    isSeventhCellClicked = true;
  } else if (
    getTextContent(firstCell) === "O" &&
    getTextContent(seventhCell) === "O" &&
    !isFourthCellClicked
  ) {
    playing(fourthCell, isFourthCellClicked);
    isFourthCellClicked = true;
  } else if (
    getTextContent(fourthCell) === "O" &&
    getTextContent(seventhCell) === "O" &&
    !isFirstCellClicked
  ) {
    playing(firstCell, isFirstCellClicked);
    isFirstCellClicked = true;
  } else if (
    getTextContent(secondCell) === "O" &&
    getTextContent(fifthCell) === "O" &&
    !isEighthCellClicked
  ) {
    playing(eighthCell, isEighthCellClicked);
    isEighthCellClicked = true;
  } else if (
    getTextContent(secondCell) === "O" &&
    getTextContent(eighthCell) === "O" &&
    !isFifthCellClicked
  ) {
    playing(fifthCell, isFifthCellClicked);
    isFifthCellClicked = true;
  } else if (
    getTextContent(fifthCell) === "O" &&
    getTextContent(eighthCell) === "O" &&
    !isSecondCellClicked
  ) {
    playing(secondCell, isSecondCellClicked);
    isSecondCellClicked = true;
  } else if (
    getTextContent(thirdCell) === "O" &&
    getTextContent(sixthCell) === "O" &&
    !isNinthCellClicked
  ) {
    playing(ninthCell, isNinthCellClicked);
    isNinthCellClicked = true;
  } else if (
    getTextContent(thirdCell) === "O" &&
    getTextContent(ninthCell) === "O" &&
    !isSixthCellClicked
  ) {
    playing(sixthCell, isSixthCellClicked);
    isSixthCellClicked = true;
  } else if (
    getTextContent(sixthCell) === "O" &&
    getTextContent(ninthCell) === "O" &&
    !isThirdCellClicked
  ) {
    playing(thirdCell, isThirdCellClicked);
    isThirdCellClicked = true;
  } else if (
    getTextContent(firstCell) === "O" &&
    getTextContent(secondCell) === "O" &&
    !isThirdCellClicked
  ) {
    playing(thirdCell, isThirdCellClicked);
    isThirdCellClicked = true;
  } else if (
    getTextContent(firstCell) === "O" &&
    getTextContent(thirdCell) === "O" &&
    !isSecondCellClicked
  ) {
    playing(secondCell, isSecondCellClicked);
    isSecondCellClicked = true;
  } else if (
    getTextContent(secondCell) === "O" &&
    getTextContent(thirdCell) === "O" &&
    !isFirstCellClicked
  ) {
    playing(firstCell, isFirstCellClicked);
    isFirstCellClicked = true;
  } else if (
    getTextContent(fourthCell) === "O" &&
    getTextContent(fifthCell) === "O" &&
    !isSixthCellClicked
  ) {
    playing(sixthCell, isSixthCellClicked);
    isSixthCellClicked = true;
  } else if (
    getTextContent(fourthCell) === "O" &&
    getTextContent(sixthCell) === "O" &&
    !isFifthCellClicked
  ) {
    playing(fifthCell, isFifthCellClicked);
    isFifthCellClicked = true;
  } else if (
    getTextContent(fifthCell) === "O" &&
    getTextContent(sixthCell) === "O" &&
    !isFourthCellClicked
  ) {
    playing(fourthCell, isFourthCellClicked);
    isFourthCellClicked = true;
  } else if (
    getTextContent(seventhCell) === "O" &&
    getTextContent(eighthCell) === "O" &&
    !isNinthCellClicked
  ) {
    playing(ninthCell, isNinthCellClicked);
    isNinthCellClicked = true;
  } else if (
    getTextContent(seventhCell) === "O" &&
    getTextContent(ninthCell) === "O" &&
    !isEighthCellClicked
  ) {
    playing(eighthCell, isEighthCellClicked);
    isEighthCellClicked = true;
  } else if (
    getTextContent(eighthCell) === "O" &&
    getTextContent(ninthCell) === "O" &&
    !isSeventhCellClicked
  ) {
    playing(seventhCell, isSeventhCellClicked);
    isSeventhCellClicked = true;
  } else if (
    getTextContent(firstCell) === "O" &&
    getTextContent(fifthCell) === "O" &&
    !isNinthCellClicked
  ) {
    playing(ninthCell, isNinthCellClicked);
    isNinthCellClicked = true;
  } else if (
    getTextContent(firstCell) === "O" &&
    getTextContent(ninthCell) === "O" &&
    !isFifthCellClicked
  ) {
    playing(fifthCell, isFifthCellClicked);
    isFifthCellClicked = true;
  } else if (
    getTextContent(fifthCell) === "O" &&
    getTextContent(ninthCell) === "O" &&
    !isFirstCellClicked
  ) {
    playing(firstCell, isFirstCellClicked);
    isFirstCellClicked = true;
  } else if (
    getTextContent(thirdCell) === "O" &&
    getTextContent(fifthCell) === "O" &&
    !isSeventhCellClicked
  ) {
    playing(seventhCell, isSeventhCellClicked);
    isSeventhCellClicked = true;
  } else if (
    getTextContent(thirdCell) === "O" &&
    getTextContent(seventhCell) === "O" &&
    !isFifthCellClicked
  ) {
    playing(fifthCell, isFifthCellClicked);
    isFifthCellClicked = true;
  } else if (
    getTextContent(fifthCell) === "O" &&
    getTextContent(seventhCell) === "O" &&
    !isThirdCellClicked
  ) {
    playing(thirdCell, isThirdCellClicked);
    isThirdCellClicked = true;
  } else if (
    getTextContent(firstCell) === "X" &&
    getTextContent(fourthCell) === "X" &&
    !isSeventhCellClicked
  ) {
    playing(seventhCell, isSeventhCellClicked);
    isSeventhCellClicked = true;
  } else if (
    getTextContent(firstCell) === "X" &&
    getTextContent(seventhCell) === "X" &&
    !isFourthCellClicked
  ) {
    playing(fourthCell, isFourthCellClicked);
    isFourthCellClicked = true;
  } else if (
    getTextContent(fourthCell) === "X" &&
    getTextContent(seventhCell) === "X" &&
    !isFirstCellClicked
  ) {
    playing(firstCell, isFirstCellClicked);
    isFirstCellClicked = true;
  } else if (
    getTextContent(secondCell) === "X" &&
    getTextContent(fifthCell) === "X" &&
    !isEighthCellClicked
  ) {
    playing(eighthCell, isEighthCellClicked);
    isEighthCellClicked = true;
  } else if (
    getTextContent(secondCell) === "X" &&
    getTextContent(eighthCell) === "X" &&
    !isFifthCellClicked
  ) {
    playing(fifthCell, isFifthCellClicked);
    isFifthCellClicked = true;
  } else if (
    getTextContent(fifthCell) === "X" &&
    getTextContent(eighthCell) === "X" &&
    !isSecondCellClicked
  ) {
    playing(secondCell, isSecondCellClicked);
    isSecondCellClicked = true;
  } else if (
    getTextContent(thirdCell) === "X" &&
    getTextContent(sixthCell) === "X" &&
    !isNinthCellClicked
  ) {
    playing(ninthCell, isNinthCellClicked);
    isNinthCellClicked = true;
  } else if (
    getTextContent(thirdCell) === "X" &&
    getTextContent(ninthCell) === "X" &&
    !isSixthCellClicked
  ) {
    playing(sixthCell, isSixthCellClicked);
    isSixthCellClicked = true;
  } else if (
    getTextContent(sixthCell) === "X" &&
    getTextContent(ninthCell) === "X" &&
    !isThirdCellClicked
  ) {
    playing(thirdCell, isThirdCellClicked);
    isThirdCellClicked = true;
  } else if (
    getTextContent(firstCell) === "X" &&
    getTextContent(secondCell) === "X" &&
    !isThirdCellClicked
  ) {
    playing(thirdCell, isThirdCellClicked);
    isThirdCellClicked = true;
  } else if (
    getTextContent(firstCell) === "X" &&
    getTextContent(thirdCell) === "X" &&
    !isSecondCellClicked
  ) {
    playing(secondCell, isSecondCellClicked);
    isSecondCellClicked = true;
  } else if (
    getTextContent(secondCell) === "X" &&
    getTextContent(thirdCell) === "X" &&
    !isFirstCellClicked
  ) {
    playing(firstCell, isFirstCellClicked);
    isFirstCellClicked = true;
  } else if (
    getTextContent(fourthCell) === "X" &&
    getTextContent(fifthCell) === "X" &&
    !isSixthCellClicked
  ) {
    playing(sixthCell, isSixthCellClicked);
    isSixthCellClicked = true;
  } else if (
    getTextContent(fourthCell) === "X" &&
    getTextContent(sixthCell) === "X" &&
    !isFifthCellClicked
  ) {
    playing(fifthCell, isFifthCellClicked);
    isFifthCellClicked = true;
  } else if (
    getTextContent(fifthCell) === "X" &&
    getTextContent(sixthCell) === "X" &&
    !isFourthCellClicked
  ) {
    playing(fourthCell, isFourthCellClicked);
    isFourthCellClicked = true;
  } else if (
    getTextContent(seventhCell) === "X" &&
    getTextContent(eighthCell) === "X" &&
    !isNinthCellClicked
  ) {
    playing(ninthCell, isNinthCellClicked);
    isNinthCellClicked = true;
  } else if (
    getTextContent(seventhCell) === "X" &&
    getTextContent(ninthCell) === "X" &&
    !isEighthCellClicked
  ) {
    playing(eighthCell, isEighthCellClicked);
    isEighthCellClicked = true;
  } else if (
    getTextContent(eighthCell) === "X" &&
    getTextContent(ninthCell) === "X" &&
    !isSeventhCellClicked
  ) {
    playing(seventhCell, isSeventhCellClicked);
    isSeventhCellClicked = true;
  } else if (
    getTextContent(firstCell) === "X" &&
    getTextContent(fifthCell) === "X" &&
    !isNinthCellClicked
  ) {
    playing(ninthCell, isNinthCellClicked);
    isNinthCellClicked = true;
  } else if (
    getTextContent(firstCell) === "X" &&
    getTextContent(ninthCell) === "X" &&
    !isFifthCellClicked
  ) {
    playing(fifthCell, isFifthCellClicked);
    isFifthCellClicked = true;
  } else if (
    getTextContent(fifthCell) === "X" &&
    getTextContent(ninthCell) === "X" &&
    !isFirstCellClicked
  ) {
    playing(firstCell, isFirstCellClicked);
    isFirstCellClicked = true;
  } else if (
    getTextContent(thirdCell) === "X" &&
    getTextContent(fifthCell) === "X" &&
    !isSeventhCellClicked
  ) {
    playing(seventhCell, isSeventhCellClicked);
    isSeventhCellClicked = true;
  } else if (
    getTextContent(thirdCell) === "X" &&
    getTextContent(seventhCell) === "X" &&
    !isFifthCellClicked
  ) {
    playing(fifthCell, isFifthCellClicked);
    isFifthCellClicked = true;
  } else if (
    getTextContent(fifthCell) === "X" &&
    getTextContent(seventhCell) === "X" &&
    !isThirdCellClicked
  ) {
    playing(thirdCell, isThirdCellClicked);
    isThirdCellClicked = true;
  } else if (count === 0) {
    let random = generateRandomNumber(4);
    if (random === 1) {
      playing(firstCell, isFirstCellClicked);
      isFirstCellClicked = true;
    } else if (random === 2) {
      playing(thirdCell, isThirdCellClicked);
      isThirdCellClicked = true;
    } else if (random === 3) {
      playing(seventhCell, isSeventhCellClicked);
      isSeventhCellClicked = true;
    } else {
      playing(ninthCell, isNinthCellClicked);
      isNinthCellClicked = true;
    }
  } else if (count === 1) {
    if (
      getTextContent(firstCell) === "X" ||
      getTextContent(thirdCell) === "X" ||
      getTextContent(seventhCell) === "X" ||
      getTextContent(ninthCell) === "X"
    ) {
      playing(fifthCell, isFifthCellClicked);
      isFifthCellClicked = true;
    } else {
      let random = generateRandomNumber(4);
      if (random === 1) {
        playing(firstCell, isFirstCellClicked);
        isFirstCellClicked = true;
      } else if (random === 2) {
        playing(thirdCell, isThirdCellClicked);
        isThirdCellClicked = true;
      } else if (random === 3) {
        playing(seventhCell, isSeventhCellClicked);
        isSeventhCellClicked = true;
      } else {
        playing(ninthCell, isNinthCellClicked);
        isNinthCellClicked = true;
      }
    }
  } else if (count === 2) {
    let tempArray = [];
    if (!isFirstCellClicked) {
      tempArray.push(1);
    }
    if (!isThirdCellClicked) {
      tempArray.push(3);
    }
    if (!isSeventhCellClicked) {
      tempArray.push(7);
    }
    if (!isNinthCellClicked) {
      tempArray.push(9);
    }
    let random = tempArray[generateRandomNumber(tempArray.length) - 1];
    if (random === 1) {
      playing(firstCell, isFirstCellClicked);
      isFirstCellClicked = true;
    } else if (random === 3) {
      playing(thirdCell, isThirdCellClicked);
      isThirdCellClicked = true;
    } else if (random === 7) {
      playing(seventhCell, isSeventhCellClicked);
      isSeventhCellClicked = true;
    } else {
      playing(ninthCell, isNinthCellClicked);
      isNinthCellClicked = true;
    }
  } else if (count === 3) {
    if (getTextContent(firstCell) === "X") {
      if (getTextContent(eighthCell) === "X") {
        let random = generateRandomNumber(4);
        if (random === 1) {
          playing(thirdCell, isThirdCellClicked);
          isThirdCellClicked = true;
        } else if (random === 2) {
          playing(fourthCell, isFourthCellClicked);
          isFourthCellClicked = true;
        } else if (random === 3) {
          playing(sixthCell, isSixthCellClicked);
          isSixthCellClicked = true;
        } else {
          playing(seventhCell, isSeventhCellClicked);
          isSeventhCellClicked = true;
        }
      } else if (getTextContent(ninthCell) === "X") {
        let random = generateRandomNumber(6);
        if (random === 1) {
          playing(secondCell, isSecondCellClicked);
          isSecondCellClicked = true;
        } else if (random === 2) {
          playing(thirdCell, isThirdCellClicked);
          isThirdCellClicked = true;
        } else if (random === 3) {
          playing(fourthCell, isFourthCellClicked);
          isFourthCellClicked = true;
        } else if (random === 4) {
          playing(sixthCell, isSixthCellClicked);
          isSixthCellClicked = true;
        } else if (random === 5) {
          playing(seventhCell, isSeventhCellClicked);
          isSeventhCellClicked = true;
        } else {
          playing(eighthCell, isEighthCellClicked);
          isEighthCellClicked = true;
        }
      } else if (getTextContent(sixthCell) === "X") {
        let random = generateRandomNumber(4);
        if (random === 1) {
          playing(secondCell, isSecondCellClicked);
          isSecondCellClicked = true;
        } else if (random === 2) {
          playing(thirdCell, isThirdCellClicked);
          isThirdCellClicked = true;
        } else if (random === 3) {
          playing(seventhCell, isSeventhCellClicked);
          isSeventhCellClicked = true;
        } else {
          playing(eighthCell, isEighthCellClicked);
          isEighthCellClicked = true;
        }
      }
    } else if (getTextContent(thirdCell) === "X") {
      if (getTextContent(eighthCell) === "X") {
        let random = generateRandomNumber(4);
        if (random === 1) {
          playing(firstCell, isFirstCellClicked);
          isFirstCellClicked = true;
        } else if (random === 2) {
          playing(fourthCell, isFourthCellClicked);
          isFourthCellClicked = true;
        } else if (random === 3) {
          playing(sixthCell, isSixthCellClicked);
          isSixthCellClicked = true;
        } else {
          playing(ninthCell, isNinthCellClicked);
          isNinthCellClicked = true;
        }
      } else if (getTextContent(seventhCell) === "X") {
        let random = generateRandomNumber(6);
        if (random === 1) {
          playing(firstCell, isFirstCellClicked);
          isFirstCellClicked = true;
        } else if (random === 2) {
          playing(secondCell, isSecondCellClicked);
          isSecondCellClicked = true;
        } else if (random === 3) {
          playing(fourthCell, isFourthCellClicked);
          isFourthCellClicked = true;
        } else if (random === 4) {
          playing(sixthCell, isSixthCellClicked);
          isSixthCellClicked = true;
        } else if (random === 5) {
          playing(eighthCell, isEighthCellClicked);
          isEighthCellClicked = true;
        } else {
          playing(ninthCell, isNinthCellClicked);
          isNinthCellClicked = true;
        }
      } else if (getTextContent(fourthCell) === "X") {
        let random = generateRandomNumber(4);
        if (random === 1) {
          playing(firstCell, isFirstCellClicked);
          isFirstCellClicked = true;
        } else if (random === 2) {
          playing(secondCell, isSecondCellClicked);
          isSecondCellClicked = true;
        } else if (random === 3) {
          playing(eighthCell, isEighthCellClicked);
          isEighthCellClicked = true;
        } else {
          playing(ninthCell, isNinthCellClicked);
          isNinthCellClicked = true;
        }
      }
    } else if (getTextContent(seventhCell) === "X") {
      if (getTextContent(secondCell) === "X") {
        let random = generateRandomNumber(4);
        if (random === 1) {
          playing(firstCell, isFirstCellClicked);
          isFirstCellClicked = true;
        } else if (random === 2) {
          playing(fourthCell, isFourthCellClicked);
          isFourthCellClicked = true;
        } else if (random === 3) {
          playing(sixthCell, isSixthCellClicked);
          isSixthCellClicked = true;
        } else {
          playing(ninthCell, isNinthCellClicked);
          isNinthCellClicked = true;
        }
      } else if (getTextContent(thirdCell) === "X") {
        let random = generateRandomNumber(6);
        if (random === 1) {
          playing(firstCell, isFirstCellClicked);
          isFirstCellClicked = true;
        } else if (random === 2) {
          playing(secondCell, isSecondCellClicked);
          isSecondCellClicked = true;
        } else if (random === 3) {
          playing(fourthCell, isFourthCellClicked);
          isFourthCellClicked = true;
        } else if (random === 4) {
          playing(sixthCell, isSixthCellClicked);
          isSixthCellClicked = true;
        } else if (random === 5) {
          playing(eighthCell, isEighthCellClicked);
          isEighthCellClicked = true;
        } else {
          playing(ninthCell, isNinthCellClicked);
          isNinthCellClicked = true;
        }
      } else if (getTextContent(sixthCell) === "X") {
        let random = generateRandomNumber(4);
        if (random === 1) {
          playing(firstCell, isFirstCellClicked);
          isFirstCellClicked = true;
        } else if (random === 2) {
          playing(secondCell, isSecondCellClicked);
          isSecondCellClicked = true;
        } else if (random === 3) {
          playing(eighthCell, isEighthCellClicked);
          isEighthCellClicked = true;
        } else {
          playing(ninthCell, isNinthCellClicked);
          isNinthCellClicked = true;
        }
      }
    } else if (getTextContent(ninthCell) === "X") {
      if (getTextContent(secondCell) === "X") {
        let random = generateRandomNumber(4);
        if (random === 1) {
          playing(thirdCell, isThirdCellClicked);
          isThirdCellClicked = true;
        } else if (random === 2) {
          playing(fourthCell, isFourthCellClicked);
          isFourthCellClicked = true;
        } else if (random === 3) {
          playing(sixthCell, isSixthCellClicked);
          isSixthCellClicked = true;
        } else {
          playing(seventhCell, isSeventhCellClicked);
          isSeventhCellClicked = true;
        }
      } else if (getTextContent(firstCell) === "X") {
        let random = generateRandomNumber(6);
        if (random === 1) {
          playing(secondCell, isSecondCellClicked);
          isSecondCellClicked = true;
        } else if (random === 2) {
          playing(thirdCell, isThirdCellClicked);
          isThirdCellClicked = true;
        } else if (random === 3) {
          playing(fourthCell, isFourthCellClicked);
          isFourthCellClicked = true;
        } else if (random === 4) {
          playing(sixthCell, isSixthCellClicked);
          isSixthCellClicked = true;
        } else if (random === 5) {
          playing(seventhCell, isSeventhCellClicked);
          isSeventhCellClicked = true;
        } else {
          playing(eighthCell, isEighthCellClicked);
          isEighthCellClicked = true;
        }
      } else if (getTextContent(sixthCell) === "X") {
        let random = generateRandomNumber(4);
        if (random === 1) {
          playing(secondCell, isSecondCellClicked);
          isSecondCellClicked = true;
        } else if (random === 2) {
          playing(thirdCell, isThirdCellClicked);
          isThirdCellClicked = true;
        } else if (random === 3) {
          playing(seventhCell, isSeventhCellClicked);
          isSeventhCellClicked = true;
        } else {
          playing(eighthCell, isEighthCellClicked);
          isEighthCellClicked = true;
        }
      }
    } else {
      let random =
        possibleOptions[generateRandomNumber(possibleOptions.length) - 1];
      playRandom(random);
    }
  } else if (count === 4) {
    let tempArray = [];
    if (!isFirstCellClicked) {
      tempArray.push(1);
    }
    if (!isThirdCellClicked) {
      tempArray.push(3);
    }
    if (!isSeventhCellClicked) {
      tempArray.push(7);
    }
    if (!isNinthCellClicked) {
      tempArray.push(9);
    }
    let random = tempArray[generateRandomNumber(tempArray.length) - 1];
    if (random === 1) {
      playing(firstCell, isFirstCellClicked);
      isFirstCellClicked = true;
    } else if (random === 3) {
      playing(thirdCell, isThirdCellClicked);
      isThirdCellClicked = true;
    } else if (random === 7) {
      playing(seventhCell, isSeventhCellClicked);
      isSeventhCellClicked = true;
    } else if (random === 9) {
      playing(ninthCell, isNinthCellClicked);
      isNinthCellClicked = true;
    }
  } else if (count === 5) {
    let random =
      possibleOptions[generateRandomNumber(possibleOptions.length) - 1];
    playRandom(random);
  } else if (count === 6) {
    let random =
      possibleOptions[generateRandomNumber(possibleOptions.length) - 1];
    playRandom(random);
  } else if (count === 7) {
    let random =
      possibleOptions[generateRandomNumber(possibleOptions.length) - 1];
    playRandom(random);
  } else if (count === 8) {
    let random =
      possibleOptions[generateRandomNumber(possibleOptions.length) - 1];
    playRandom(random);
  }
  allowToPlay = true;
};

//not allowing to play after the user's turn
const notAllow = function () {
  if (!isPassAndPlay) {
    allowToPlay = false;
    setTimeout(CPUPlay, 1000);
  }
};

firstCell.addEventListener("click", function () {
  if (isPassAndPlay || allowToPlay) {
    playing(firstCell, isFirstCellClicked);
    isFirstCellClicked = true;
    notAllow();
  }
});

secondCell.addEventListener("click", function () {
  if (isPassAndPlay || allowToPlay) {
    playing(secondCell, isSecondCellClicked);
    isSecondCellClicked = true;
    notAllow();
  }
});

thirdCell.addEventListener("click", function () {
  if (isPassAndPlay || allowToPlay) {
    playing(thirdCell, isThirdCellClicked);
    isThirdCellClicked = true;
    notAllow();
  }
});

fourthCell.addEventListener("click", function () {
  if (isPassAndPlay || allowToPlay) {
    playing(fourthCell, isFourthCellClicked);
    isFourthCellClicked = true;
    notAllow();
  }
});

fifthCell.addEventListener("click", function () {
  if (isPassAndPlay || allowToPlay) {
    playing(fifthCell, isFifthCellClicked);
    isFifthCellClicked = true;
    notAllow();
  }
});

sixthCell.addEventListener("click", function () {
  if (isPassAndPlay || allowToPlay) {
    playing(sixthCell, isSixthCellClicked);
    isSixthCellClicked = true;
    notAllow();
  }
});

seventhCell.addEventListener("click", function () {
  if (isPassAndPlay || allowToPlay) {
    playing(seventhCell, isSeventhCellClicked);
    isSeventhCellClicked = true;
    notAllow();
  }
});

eighthCell.addEventListener("click", function () {
  if (isPassAndPlay || allowToPlay) {
    playing(eighthCell, isEighthCellClicked);
    isEighthCellClicked = true;
    notAllow();
  }
});

ninthCell.addEventListener("click", function () {
  if (isPassAndPlay || allowToPlay) {
    playing(ninthCell, isNinthCellClicked);
    isNinthCellClicked = true;
    notAllow();
  }
});

newGameButton.addEventListener("click", newGame);

gameModeSelector.addEventListener("change", function () {
  if (gameMode() === "pass-and-play") {
    isPassAndPlay = true;
    playerX = true;
    isPlayerXStart = true;
  } else {
    isPassAndPlay = false;
  }
  newGame();
});

newGame();
