'use strict';

const keypad = document.querySelectorAll('.keypad');
const keypadOperators = document.querySelectorAll('.keypad-operator');
const display = document.getElementById('display');
const equal = document.getElementById('solve-problem');

const handle = document.querySelector('.container');




// Calculator Movability //
let newX = 0, newY = 0, startX = 0, startY = 0;

function mouseMove (e) {
  newX = startX - e.clientX;
  newY = startY - e.clientY;
  
  startX = e.clientX;
  startY = e.clientY;
  
  handle.style.top = (handle.offsetTop - newY) + 'px';
  handle.style.left = (handle.offsetLeft - newX) + 'px';
  
  console.log({newX, newY})
  console.log({startX, startY})
  
}

function mouseUp (e) {
  document.removeEventListener('mousemove', mouseMove)
}


function mouseDown (e) {
  startX = e.clientX;
  startY = e.clientY;
  console.log(startX, startY);
  
  document.addEventListener('mousemove', mouseMove);
  
  document.addEventListener('mouseup', mouseUp);
}


handle.addEventListener('mousedown', mouseDown)








// Calculator Operations //
let operator = '';
let number1 = '';
let number2 = '';
display.value = '';

let answer = '';

let problemSolved = false;


// check for percent sign
function checkPercent () {
  if (number1.includes('%')) {
    let newNumber1 = ''
    for (let i = 0; i < number1.length; i++ ) {
      if (number1[i] != '%') {
        newNumber1 += number1[i];
      }
    }
    number1 = Number(newNumber1) / 100;
  }
  if (number2.includes('%')) {
    let newNumber2 = ''
    for (let i = 0; i < number2.length; i++ ) {
      if (number2[i] != '%') {
        newNumber2 += number2[i];
      }
    }
    number2 = Number(newNumber2) / 100;
  }
}

// equal function 
function solveProblem () {
  if (number1 && number2) {
    if (operator === '+') {
      checkPercent()
      answer = Number(number1) + Number(number2)
    } else if (operator === '-') {
      checkPercent()
      answer = Number(number1) - Number(number2)
    } else if (operator === '*') {
      checkPercent()
      answer = Number(number1) * Number(number2)
    } else if (operator === '/') {
      if (Number(number2) !== 0) {
        checkPercent()
        answer = Number(number1) / Number(number2)
      } else {
        answer = 'error';
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

    // percentage sign - allows only one percent character per number 
    if (keypad[i].value === '%' && number1.includes('%') && !operator) {
      return;
    }
    if (keypad[i].value === '%' && number2.includes('%') && operator) {
      return;
    }


    // keypad logic - logs numbers and operators to desired variable and displays it to screen
    if (keypad[i].value !== 'delete' && keypad[i].value !== 'clear' ) {
      if (number1.length <= 9 && !operator) {
        number1 += keypad[i].value
        display.value += keypad[i].value
        console.log(`number1 is ${number1}`)
      } else if (number2.length <= 9 && operator) {
        number2 += keypad[i].value 
        display.value += keypad[i].value
        console.log(`number2 is ${number2}`)
      }
    }

    // keypad logic - delete button removes the last character from string and display
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


    // keypad logic - clear button clears all variables and display output
    if (keypad[i].value === 'clear') {
      number1 = '';
      number2 = '';
      operator = '';
      display.value = ''
    }


    // alert to new features yet to be added
    if (keypad[i].textContent === '+/-') {
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
      display.value += operator
    }

    if (problemSolved) {
      problemSolved = false
      operator = '';
      number2 = '';
      number1 = String(answer);
      display.value = number1
      operator = keypadOperators[i].value;
      display.value += operator
    }

  });

}


// solve event 
equal.addEventListener('click', solveProblem);

console.log(answer);

