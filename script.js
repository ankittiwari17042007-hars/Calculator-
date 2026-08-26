let currentNumber = "";
let previousNumber = "";
let operation = undefined;

const currentDisplay = document.getElementById("current");
const previousDisplay = document.getElementById("previous");
const historyList = document.getElementById("history-list");

function appendNumber(number) {
    if (currentNumber === "Error") {
        currentNumber = "";
    }

    if (number === "." && currentNumber.includes(".")) {
        return;
    }

    currentNumber += number;
    updateDisplay();
}

function chooseOperation(operator) {
    if (currentNumber === "" && previousNumber === "") {
        return;
    }

    if (currentNumber !== "" && previousNumber !== "") {
        compute();
    }

    operation = operator;
    previousNumber = currentNumber;
    currentNumber = "";

    updateDisplay();
}

function compute() {
    if (previousNumber === "" || currentNumber === "" || !operation) {
        return;
    }

    const previous = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);

    let result;

    switch (operation) {
        case "+":
            result = previous + current;
            break;

        case "-":
            result = previous - current;
            break;

        case "×":
            result = previous * current;
            break;

        case "÷":
            if (current === 0) {
                currentNumber = "Error";
                previousNumber = "";
                operation = undefined;
                updateDisplay();
                return;
            }

            result = previous / current;
            break;

        case "%":
            result = previous % current;
            break;

        default:
            return;
    }

    const calculation =
        `${previous} ${operation} ${current} = ${result}`;

    addToHistory(calculation);

    currentNumber = result.toString();
    previousNumber = "";
    operation = undefined;

    updateDisplay();
}

function clearDisplay() {
    currentNumber = "";
    previousNumber = "";
    operation = undefined;

    updateDisplay();
}

function deleteNumber() {
    currentNumber = currentNumber.slice(0, -1);

    updateDisplay();
}

function updateDisplay() {
    currentDisplay.innerText = currentNumber || "0";

    if (operation && previousNumber !== "") {
        previousDisplay.innerText =
            previousNumber + " " + operation;
    } else {
        previousDisplay.innerText = "";
    }
}

function addToHistory(calculation) {
    const historyItem = document.createElement("div");

    historyItem.classList.add("history-item");
    historyItem.innerText = calculation;

    historyList.prepend(historyItem);
}

function toggleHistory() {
    const historyPanel = document.getElementById("history-panel");

    historyPanel.classList.toggle("show");
}

document.addEventListener("keydown", function(event) {

    if (event.key >= "0" && event.key <= "9") {
        appendNumber(event.key);
    }

    if (event.key === ".") {
        appendNumber(".");
    }

    if (event.key === "+") {
        chooseOperation("+");
    }

    if (event.key === "-") {
        chooseOperation("-");
    }

    if (event.key === "*") {
        chooseOperation("×");
    }

    if (event.key === "/") {
        event.preventDefault();
        chooseOperation("÷");
    }

    if (event.key === "Enter" || event.key === "=") {
        compute();
    }

    if (event.key === "Backspace") {
        deleteNumber();
    }

    if (event.key === "Escape") {
        clearDisplay();
    }

});
