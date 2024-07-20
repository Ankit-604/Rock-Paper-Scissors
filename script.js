// Close the rules
const closeRules = () => {
  const gameRule = document.getElementById("gameRule");

  if (gameRule.style.display === "flex") {
    gameRule.style.display = "none";
  } else {
    gameRule.style.display = "flex";
  }
};

window.onload = () => {
  if (localStorage.getItem("userScore")) {
    var userScore = localStorage.getItem("userScore");
    var pcScore = localStorage.getItem("pcScore");
  } else {
    userScore = 0;
    pcScore = 0;
  }

  document.getElementById("userScore").innerHTML = userScore;
  document.getElementById("pcScore").innerHTML = pcScore;
};

// Playing

const playagain = () => {
  document.getElementById("choiceMaker").style.display = "flex";
  document.getElementById("choiceResult").style.display = "none";
};

if (localStorage.getItem("userScore")) {
  var userScore = localStorage.getItem("userScore");
  var pcScore = localStorage.getItem("pcScore");
} else {
  userScore = 0;
  pcScore = 0;
}

const letsPlay = (userChoice) => {
  localStorage.setItem("userScore", userScore);
  localStorage.setItem("pcScore", pcScore);

  const resultLoad = document.createElement("div");
  resultLoad.classList.add("winner");
  if (userChoice === "rock") {
    document.getElementById("myChoice").style.border = "20px solid #0074b6";
    document.getElementById("userChoice").src = "/images/stone.png";
  } else if (userChoice === "paper") {
    document.getElementById("myChoice").style.border = "20px solid #ffa943";
    document.getElementById("userChoice").src = "/images/paper.png";
  } else if (userChoice === "scissor") {
    document.getElementById("myChoice").style.border = "20px solid #bd00ff";
    document.getElementById("userChoice").src = "/images/scissor.png";
  }

  document.getElementById("choiceMaker").style.display = "none";
  document.getElementById("choiceResult").style.display = "flex";
  document.getElementById("choiceResultDetails").style.transform = "scale(0)";
  document.getElementById("loadingDone").style.display = "none";

  const elements = document.querySelectorAll(`.winner`);
  elements.forEach((element) => {
    element.remove();
  });

  // Get the parent elements

  let interval = setInterval(() => {
    clearInterval(interval);
    play(userChoice);
  }, 0);
};

const play = (userChoice) => {
  document.getElementById("choiceResultDetails").style.transform = "scale(1)";
  document.getElementById("loadingDone").style.display = "inherit";

  const choices = ["rock", "paper", "scissor"];
  const randomIndex = Math.floor(Math.random() * 3);
  const computerChoice = choices[randomIndex];

  // Set User Choice
  const resultLoad = document.createElement("div");
  resultLoad.classList.add("winner");

  // Set Computer Choice

  if (computerChoice === "rock") {
    document.getElementById("pcChoice").style.border = "20px solid #0074b6";
    document.getElementById("loadingDone").src = "/images/stone.png";
  } else if (computerChoice === "paper") {
    document.getElementById("pcChoice").style.border = "20px solid #ffa943";
    document.getElementById("loadingDone").src = "/images/paper.png";
  } else if (computerChoice === "scissor") {
    document.getElementById("pcChoice").style.border = "20px solid #bd00ff";
    document.getElementById("loadingDone").src = "/images/scissor.png";
  }

  let result = "";

  if (userChoice === computerChoice) {
    result = "It's a tie!";
    document.getElementById("yourTitle").innerHTML = "TIE UP  ";
    document.getElementById("resultTie").innerHTML = "";
  } else if (
    (userChoice === "rock" && computerChoice === "scissor") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissor" && computerChoice === "paper")
  ) {
    result = "You win!";
    userScore++;
    localStorage.setItem("userScore", userScore);
    let localUserScore = localStorage.getItem("userScore");

    document.getElementById("userScore").innerHTML = localUserScore;
    document.getElementById("yourTitle").innerHTML = "You Win ";
    document.getElementById("resultTie").innerHTML = "against pc";
    document.getElementById("myChoice").appendChild(resultLoad);
  } else {
    result = "You lose!";
    pcScore++;
    localStorage.setItem("pcScore", pcScore);
    let localPCScore = localStorage.getItem("pcScore");

    document.getElementById("pcScore").innerHTML = localPCScore;
    document.getElementById("yourTitle").innerHTML = "You Lost ";
    document.getElementById("resultTie").innerHTML = "against pc";
    document.getElementById("pcChoice").appendChild(resultLoad);
  }

  if (result === "You win!") {
    document.getElementById("next").style.display = "inherit";
  } else {
    document.getElementById("next").style.display = "none";
  }
};
