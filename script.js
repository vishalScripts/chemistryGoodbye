let selected = [];
const equationDisplay = document.getElementById("equation-display");
const result = document.getElementById("reaction-result");
const explosionSound = document.getElementById("explosion-sound");
const bdSound = document.getElementById("bd-sound")
const jar = document.getElementById("jar");

const correctCombinations = [
  ["H2", "O2"],
  ["Na", "Cl2"]
];

document.querySelectorAll(".chemical").forEach(elem => {
  elem.setAttribute("draggable", true);
  elem.addEventListener("dragstart", event => {
    event.dataTransfer.setData("text/plain", event.target.dataset.name);
  });
});

jar.addEventListener("dragover", event => {
  event.preventDefault();
  jar.classList.add("jar-hover");
});

jar.addEventListener("dragleave", () => {
  jar.classList.remove("jar-hover");
});

jar.addEventListener("drop", event => {
  event.preventDefault();
  jar.classList.remove("jar-hover");
  const chem = event.dataTransfer.getData("text/plain");
  if (!selected.includes(chem)) {
    selected.push(chem);
    updateEquationDisplay();
  }

  if (selected.length === 2) {
    if (isCorrectCombination(selected)) {
      triggerExplosion();
    } else {
      equationDisplay.textContent = "⚠️ Nothing happened. Try another combo!";
      selected = [];
    }
  }
});

function updateEquationDisplay() {
  equationDisplay.textContent = "Equation: " + selected.join(" + ");
}

function isCorrectCombination(combo) {
  return correctCombinations.some(
    correct => correct.includes(combo[0]) && correct.includes(combo[1])
  );
}

function triggerExplosion() {
  document.body.classList.add("explode");
  explosionSound.play();
  bdSound.play();
  result.classList.remove("hidden");
  equationDisplay.textContent = "💥 Reaction: " + selected.join(" + ");
}


