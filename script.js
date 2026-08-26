let currentNumber = "";
let previousNumber = "";
let operation = undefined;

const currentDisplay = document.getElementById("current");
const previousDisplay = document.getElementById("previous");
const historyList = document.getElementById("history-list");
const historyPanel = document.getElementById("history-panel");

let history = JSON.parse(localStorage.getItem("calculatorHistory")) || [];

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

    history.unshift(calculation);

    localStorage.setItem(
        "calculatorHistory",
        JSON.stringify(history)
    );

    displayHistory();

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

function displayHistory() {
    historyList.innerHTML = "";

    if (history.length === 0) {
        historyList.innerHTML = "<p>No history yet</p>";
        return;
    }

    history.forEach(function(calculation) {
        const item = document.createElement("div");

        item.className = "history-item";
        item.innerText = calculation;

        historyList.appendChild(item);
    });
}

function toggleHistory() {
    historyPanel.classList.toggle("show");

    displayHistory();
}
function clearHistory() {
    history = [];

    localStorage.removeItem("calculatorHistory");

    displayHistory();
}

displayHistory();

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
    function clearHistory() {
    history = [];

    localStorage.removeItem("calculatorHistory");

    displayHistory();
    }

});
