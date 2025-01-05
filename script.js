let numbers = [];
let operators = [];
let currentNumber = '';
let result = 0;
const resultMessage = document.querySelector('#finalResult');
const buttons = document.querySelectorAll('.numButton');
console.log(buttons);
const resultRow = document.querySelector('#resultRow');
const history = document.createElement('h2');
history.innerHTML = '';
resultRow.prepend(history);
const AC = document.querySelector('#AC');

buttons.forEach((button) => {
    button.addEventListener('click', function (click) {
        click.preventDefault();
        handleInput(click.target.value);
    });
});

document.addEventListener('keydown',(keydown)=>{
    keydown.preventDefault();
    console.log(keydown);
    if(keydown.key>=0 && keydown.key<=9){
        handleInput(keydown.key);
    }
    else if (keydown.key === '+' || keydown.key === '-' || keydown.key === '/' || keydown.key === 'X'){
        handleInput(keydown.key);
    }
    else if(keydown.key==='Enter'){
        handleInput('=');
    }
    else if(keydown.key==='Backspace' || keydown.key==='AC'){
        handleInput('AC');
    }
})

function handleInput(value){
    // If it's a number, keep adding digits to currentNumber
    if (!isNaN(value)) {
        currentNumber += value;
        console.log("Current Number: " + currentNumber);
    }
    // When an operator is pressed, push the current number and the operator
    else if (value === '+' || value === '-' || value === '/' || value === 'X') {
        if (currentNumber !== '') { // Only push the current number if it's not empty
            numbers.push(currentNumber);
            currentNumber = ''; // Reset current number for the next input
        }
        operators.push(value);
        console.log("Operators: " + operators);
    }
    // Calculate the result when '=' is pressed
    else if (value === '=') {
        if (currentNumber !== '') { // Push the last number if it's not empty
            numbers.push(currentNumber);
            currentNumber = '';
        }
        result = parseFloat(numbers[0]); // Set the first number as the result
        for (let i = 0; i < operators.length; i++) {
            let currentOperator = operators[i];
            let currentNum = parseFloat(numbers[i + 1]);
            switch (currentOperator) {
                case '+':
                    result += currentNum;
                    break;
                case '-':
                    result -= currentNum;
                    break;
                case '/':
                    result /= currentNum;
                    break;
                case 'X':
                    result *= currentNum;
                    break;
            }
        }
        // Display the result and reset the arrays for the next calculation
        resultMessage.innerHTML = result;
        numbers = [];
        operators = [];
    }
    // Clear everything when 'AC' is pressed
    else if (value === 'AC') {
        numbers = [];
        operators = [];
        currentNumber = '';
        resultMessage.innerHTML = '';
    }
}