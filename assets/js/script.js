// javascript script for the math-tab-mastery game

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
            console.log(chosenCategory);

            // this will return either true or false depending on whether there is a value in the name input field
            let nameValidated = nameValidator();

            // the game will only begin if the name field is valid
            if (nameValidated){
                beginGame(chosenCategory);
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


    // set a range for the operators
    let numOne = document.getElementById('first-operand');
    let numTwo = document.getElementById('second-operand');
    let operator = document.getElementById('operator');

    numOne.innerText = Math.floor(Math.random() * 30) + 1;
    numTwo.innerText = Math.floor(Math.random() * 30) + 1;

    // set logic for the type of game
    if (category === 'add-subtract'){
        console.log('we are adding');
    } else if (category === 'multiplication') {
        console.log('we are multiplying');
    } else if (category === 'division'){
        console.log('we are dividing');
    }
}

categorySelection();
