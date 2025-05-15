const display = document.getElementById("display");
let isResultShown = false;

function appendValue(val) {
  if (isResultShown) {
    // If last input was '=', start fresh if number or dot is pressed
    if (!isNaN(val) || val === '.') {
      display.value = '';
    }
    isResultShown = false;
  }
  display.value += val;
}

function clearDisplay() {
  display.value = "";
  isResultShown = false;
}

function deleteLast() {
  if (!isResultShown) {
    display.value = display.value.slice(0, -1);
  } else {
    clearDisplay();
  }
}

function calculateResult() {
  try {
    let expression = display.value.replace(/%/g, '*0.01');
    // Evaluate safely: only allow numbers, operators, parentheses, dot, percent
    if (/^[0-9+\-*/().% ]+$/.test(expression)) {
      display.value = eval(expression);
    } else {
      throw new Error("Invalid characters");
    }
    isResultShown = true;
  } catch {
    display.value = "Error";
    isResultShown = true;
  }
}

// Keyboard support
window.addEventListener("keydown", (e) => {
  const allowedKeys = "0123456789+-*/.%()";
  if (allowedKeys.includes(e.key)) {
    e.preventDefault(); // Prevent unwanted behavior
    appendValue(e.key);
  } else if (e.key === "Enter") {
    e.preventDefault();
    calculateResult();
  } else if (e.key === "Backspace") {
    e.preventDefault();
    deleteLast();
  } else if (e.key === "Escape") {
    e.preventDefault();
    clearDisplay();
  }
});
