'use strict';

const keypad = document.querySelectorAll('.keypad');
const keypadOperators = document.querySelectorAll('.keypad-operator');
const display = document.getElementById('display');
const equal = document.getElementById('solve-problem');

let operator = '';
let number1 = '';
let number2 = '';
display.value = ''

let problemSolved = false;

function solveProblem () {
  let answer = null
  if (number1 && number2) {
    if (operator === '+') {
      answer = Number(number1) + Number(number2)
    } else if (operator === '-') {
      answer = Number(number1) - Number(number2)
    } else if (operator === '*') {
      answer = Number(number1) * Number(number2)
    } else if (operator === '/') {
      if (Number(number2) !== 0) {
        answer = Number(number1) / Number(number2)
      } else {
        answer = 'error'
      }
    } 
  } else {
    answer = 'error';
  }
  
  problemSolved = true;
  display.value = answer;
}




// numbers click logic
for (let i = 0; i < keypad.length; i++) {
  keypad[i].addEventListener('click', function () {

    // check to see if a calculation was made and resets 
    if (problemSolved) {
      problemSolved = false;
      display.value = '';
      number1 = '';
      number2 = '';
      operator = '';
    }

    // decimal logic - allows only one decimal per number
    if (keypad[i].value === '.' && number1.includes('.') && !operator) {
      return;
    }
    if (keypad[i].value === '.' && number2.includes('.') && operator) {
      return;
    }


    // keypad logic - logs numbers and operators to desired variable and displays it to screen
    if (keypad[i].value !== 'delete' && keypad[i].value !== 'clear' ) {
      if (number1.length <= 9 && !operator) {
        number1 += keypad[i].value
        display.value += keypad[i].value
      } else if (number2.length <= 9 && operator) {
        number2 += keypad[i].value 
        display.value += keypad[i].value
      }
    }

    // keypad logic - delete button removes the last character from string and screen
    if (keypad[i].value === 'delete') {
      console.log('You pressed delete');
      if (number2) {
        number2 = number2.slice(0, -1);
      } else if (operator) {
        operator = operator.slice(0, -1);
      } else if (number1) {
        number1 = number1.slice(0, -1);
      }
      display.value = display.value.slice(0, -1);
    }

    // keypad logic - clear button clears all variables and screen output
    if (keypad[i].value === 'clear') {
      number1 = '';
      number2 = '';
      operator = '';
      display.value = ''
    }

    // alert to new features yet to be added
    if (keypad[i].textContent === '+/-' || keypad[i].textContent === '%') {
      alert('Feature coming soon...')
    }
    
  });

}



// operator click logic
for (let i = 0; i < keypadOperators.length; i++) {
  keypadOperators[i].addEventListener('click', function () {
    // operator = keypadOperators[i].value;
    // console.log(`You pressed ${operator}`)
    // display.value += operator;

    if (number1 && operator.length < 1 && operator !== '=') {
      operator = keypadOperators[i].value;
      display.value += keypadOperators[i].value
    }

  });

}


// solve event 
equal.addEventListener('click', solveProblem);

