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

function solveMath () {
  let answer = null
  if (number1 && number2) {
    if (operator === '+') {
      answer = Number(number1) + Number(number2)
    } else if (operator === '-') {
      answer = Number(number1) - Number(number2)
    } else if (operator === '*') {
      answer = Number(number1) * Number(number2)
    } else if (operator === '/') {
      answer = Number(number1) / Number(number2)
    } 
  } else {
    answer = 'error';
  }
  problemSolved = true;
  display.value = ''
  display.value = answer;
  number1 = '';
  number2 = '';
  operator = '';
}




// numbers click logic
for (let i = 0; i < keypad.length; i++) {
  keypad[i].addEventListener('click', function () {
    if (problemSolved) {
      display.value = '';
      problemSolved = false;
    }
    if (keypad[i].value !== 'delete' && keypad[i].value !== 'clear' ) {
      if (number1.length <= 9 && !operator) {
        number1 += keypad[i].value 
        display.value += keypad[i].value
      } else if (number2.length <= 9 && operator) {
        number2 += keypad[i].value 
        display.value += keypad[i].value
      }
    } 
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
    if (keypad[i].value === 'clear') {
      number1 = '';
      number2 = '';
      operator = '';
      display.value = ''
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
equal.addEventListener('click', solveMath);

