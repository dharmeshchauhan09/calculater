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
  }
}

function calculateResult() {
  try {
    let expression = display.value.replace('%', '*0.01');
    display.value = eval(expression);
    isResultShown = true;
  } catch {
    display.value = "Error";
    isResultShown = true;
  }
}
