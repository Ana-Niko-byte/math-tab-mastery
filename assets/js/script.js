// javascript script for the math-tab-mastery game
document.addEventListener('DOMContentLoaded', function (){
    // on DOM content load, remove the default error message under name input field
    let initialMessage = document.getElementsByClassName('error')[0];
    initialMessage.innerText = '';

    // remove any value (except placeholder) inside the input field
    document.getElementById('name').value = '';
    // immediately direct attention to the input field
    document.getElementById('name').focus();
})
/**
 * This function validates the name the user inputs 
 * into the 'name' input field on the first page.
 * This is later used on the second page of the game 
 * as a greeting.
 */
function nameValidator(){
    let userName = document.getElementById('name').value;
    let error = document.getElementsByTagName('span')[0];
    // regex format acquired from url:https://stackoverflow.com/questions/18042133/check-if-input-is-number-or-letter-javascript
    let regex=/^[a-zA-Z]+$/;

    // if 'name' input has no value, add an error message, 
    // otherwise, remove the text in the error message
    if (!userName){
        error.innerText = 'name required to continue';
    } else if (!userName.match(regex)){
        error.innerText = 'please use letters only'
    } else {
        error.innerText = '';
        return true;
    }
}

/**
 * This function handles category selection through user interaction.
 * The selected button (category) displays the type or arithemetic game
 * on the second page.
 */
nameValidator(); 

function categorySelection(){
    // this returns an array of the category buttons
    let buttons = document.getElementsByClassName('button-category');

    // this loops through each of the buttons and attaches a 'click' event listener
    for (let button of buttons){
        // on click, it takes note of the value of the 'data-type' attribute on each of the buttons
        button.addEventListener('click', function(){
            let chosenCategory = this.getAttribute('data-type');

            // this will return either true or false depending on whether there is a value in the name input field
            let nameValidated = nameValidator();

            // the game will only begin if the name field is valid
            if (nameValidated){
                beginGame(chosenCategory);
            }

            if (chosenCategory === 'add-subtract'){
                beginGame('add-subtract');
            } else if (chosenCategory === 'multiplication'){
                console.log('we are multiplying');
            } else if (chosenCategory === 'division'){
                console.log('we are dividing');
            }
        })
    }
}

/**
 * 
 * This function begins the game with the chosen category from the user. 
 */
function beginGame(category){
    // first we need to set the display of the second screen and hide the first.
    let firstPage = document.getElementById('first-page');
    let secondPage = document.getElementById('second-page');
    // then we need to set the correct CSS displays to hide the first page and show the second
    firstPage.style.display = 'none';
    secondPage.style.display = 'block';

    // set the user's inputted name into the greeting
    let user = document.getElementById('name').value;
    let placeholder = document.getElementById('user-name');
    placeholder.innerText = `${user}`;

    // add some comfort in use (code taken from Love Maths by CodeInstitute):
    // remove any value from the box set previously
    // set the cursor into the input box to draw attention to it
    document.getElementById('answer-box').value = '';
    document.getElementById('answer-box').focus();


    // set a range for the operators in the game area
    let numOne = Math.floor(Math.random() * 30) + 1;
    let numTwo = Math.floor(Math.random() * 30) + 1;

    document.getElementById('first-operand').innerText = numOne;
    document.getElementById('second-operand').innerText = numTwo;

    // set logic for the type of game
    if (category === 'add-subtract'){
        displayAddSubtract(numOne, numTwo);
        console.log('we are adding');
    } else if (category === 'multiplication') {
        console.log('we are multiplying');
        displayMultiplication(numOne, numTwo);
    } else if (category === 'division'){
        console.log('we are dividing');
    }
}

/**
 * This function handles all necessary logic for HTML for the add-subtract question to work. 
 * This function works alongside the validateAnswer function.
 */
function displayAddSubtract(operandOne, operandTwo){
    // make sure operands don't give a negative answer during validation
    if (operandTwo > operandOne){
        // temporary variable to hold value of operandOne
        let box = operandOne;
        operandOne = operandTwo;
        operandTwo = box;
    }

    document.getElementById('first-operand').textContent = operandOne;
    document.getElementById('second-operand').textContent = operandTwo;
    
    //logic for determining whether 'operator' will be '+' or '-'
    let determined = Math.round(Math.random());
    document.getElementById('operator').textContent = (determined === 1) ? '+' :'-';
}

/**
 * This function handles all necessary logic for HTML for the multiplication question to work. 
 * This function works alongside the validateAnswer function.
 */
function displayMultiplication(operandOne, operandTwo){
    // set smaller range so sum answers are manageable - (max 13 x 13)
    operandOne = Math.floor(Math.random() * 12) + 1;
    operandTwo = Math.floor(Math.random() * 12) + 1;

    document.getElementById('first-operand').textContent = operandOne;
    document.getElementById('second-operand').textContent = operandTwo;
    document.getElementById('operator').textContent = 'x';
}

/**
 * This function establishes the logic for user actions on the 'skip' and 'submit' buttons.
 */
// skip button logic 
function userButtonActions(){
    // gets user buttons as an array
    let buttons = document.getElementsByClassName('user-control-buttons');

    for (let button of buttons){
        button.addEventListener('click', function(){
            if (this.getAttribute('data-type') === 'skip'){
                // need to set condition to check type of game before restarting the game
                let currentOperator = document.getElementById('operator').innerText;
                console.log(currentOperator);
                if ((currentOperator === '+') || (currentOperator === '-')){
                    beginGame('add-subtract');
                    console.log('restarting add-subtract');
                } else if (currentOperator === 'x'){
                    console.log('restarting multiply game');
                }
            }

            if (this.getAttribute('data-type') === 'submit'){
                console.log('submit button selected');
            }
        })
    }
}

userButtonActions();
categorySelection();