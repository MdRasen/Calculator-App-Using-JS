// Get the elements
var input = document.getElementById("input"),
  number = document.querySelectorAll(".numbers div"),
  operator = document.querySelectorAll(".operators div"),
  result = document.getElementById("result"),
  clear = document.getElementById("clear");

// Set the initial output
var resultDisplayed = false;

// Click handlers for number buttons
for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function (e) {
    // Storing current input string and its last character in variables
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // If result is not diplayed, just keep adding
    if (resultDisplayed === false) {
      input.innerHTML += e.target.innerHTML;
    } else if (
      (resultDisplayed === true && lastChar === "+") ||
      lastChar === "-" ||
      lastChar === "×" ||
      lastChar === "÷"
    ) {
      resultDisplayed = false;
      input.innerHTML += e.target.innerHTML;
    } else {
      // if result is currently displayed and user pressed a number, clear the input string and add the new input to start the new opration
      resultDisplayed = false;
      input.innerHTML = "";
      input.innerHTML += e.target.innerHTML;
    }
  });
}

// Adding click handlers to number buttons
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function (e) {
    // Storing current input string and its last character in variables - used later
    var currentString = input.innerHTML;
    var lastChar = currentString[currentString.length - 1];

    // If last character entered is an operator, replace it with the currently pressed one
    if (
      lastChar === "+" ||
      lastChar === "-" ||
      lastChar === "×" ||
      lastChar === "÷"
    ) {
      var newString =
        currentString.substring(0, currentString.length - 1) +
        e.target.innerHTML;
      input.innerHTML = newString;
    } else if (currentString.length == 0) {
      // If first key pressed is an opearator
      alert("Enter a number first");
    } else {
      // Else just add the operator pressed to the input
      input.innerHTML += e.target.innerHTML;
    }
  });
}

// On click of 'equal' button
result.addEventListener("click", function () {
  var inputString = input.innerHTML;

  // Forming an array of numbers
  var numbers = inputString.split(/\+|\-|\×|\÷/g);
  // Forming an array of operators
  var operators = inputString.replace(/[0-9]|\./g, "").split("");

  // First divide, then multiply, then subtraction and then addition
  var divide = operators.indexOf("÷");
  while (divide != -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
    operators.splice(divide, 1);
    divide = operators.indexOf("÷");
  }

  var multiply = operators.indexOf("×");
  while (multiply != -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
    operators.splice(multiply, 1);
    multiply = operators.indexOf("×");
  }

  var subtract = operators.indexOf("-");
  while (subtract != -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
    operators.splice(subtract, 1);
    subtract = operators.indexOf("-");
  }

  var add = operators.indexOf("+");
  while (add != -1) {
    // Using parseFloat is necessary, otherwise it will result in string concatenation!
    numbers.splice(
      add,
      2,
      parseFloat(numbers[add]) + parseFloat(numbers[add + 1])
    );
    operators.splice(add, 1);
    add = operators.indexOf("+");
  }

  // Displaying the output
  input.innerHTML = numbers[0];

  // Turning flag if result is displayed
  resultDisplayed = true;
});

// Clearing the input on press of clear
clear.addEventListener("click", function () {
  input.innerHTML = "";
});
