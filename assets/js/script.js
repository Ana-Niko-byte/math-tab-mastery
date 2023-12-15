// javascript script for the math-tab-mastery game
document.addEventListener('DOMContentLoaded', function (){
    // on DOM content load, remove the default error message under name input field
    let initialMessage = document.getElementsByClassName('error')[0];
    initialMessage.innerText = '';

    // remove any value (except placeholder) inside the input field
    document.getElementById('name').value = '';
    // immediately direct attention to the input field
    document.getElementById('name').focus();

    // remove any value (except placeholder) inside the revision input field
    document.getElementById('revision-answer-box').value = '';
});

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
        error.innerText = 'name required';
    } else if (!userName.match(regex)){
        error.innerText = 'please use letters only';
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
                timeProgress();
            }
        });
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

    // set the user's inputted name into the greeting + change first letter to a capital
    let user = document.getElementById('name').value;
    let capitalisedUser = user.charAt(0).toUpperCase() + user.slice(1).toLowerCase();
    let placeholder = document.getElementById('user-name');
    placeholder.innerText = `${capitalisedUser}`;

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
    } else if (category === 'multiplication') {
        displayMultiplication(numOne, numTwo);
    } else if (category === 'division'){
        displayDivision(numOne, numTwo);
    }
}

/**
 * This function handles the logic for the time bar (30seconds). 
 * This gives an indication to the user on the amount of time they have left to play the game. 
 */
// code for functionality partially taken from https://www.w3schools.com/howto/howto_js_progressbar.asp
function timeProgress(){
    // get the time bar element.
    let timeBar = document.getElementById('time-progress');
    // the 1% specified in CSS width.
    let width = 1;
    // set interval for 30s.
    let timed = setInterval(frame, 300);
    function frame() {
      if (width >= 100) {
        clearInterval(timed);
        timeBar.style.width = width + "%";
        revisionSwitch();
      } else {
        width++;
        timeBar.style.width = width + "%";
      }
    }
}

/**
 * This function handles the UI side of the game - after 6 seconds, the opacity of the main game section will switch to 0.5.
 * This doesn't work properly for the moment as the game is still accessible, but is here for debugging purposes. 
 */
function revisionSwitch(){
    let revisionField = document.getElementById('revision-game');
    let mainField = document.getElementById('game-field');

    mainField.style.display = 'none';
    revisionField.style.display = 'block';
    // scale elements for visual emphasis of game being finished.
    mainField.style.transform = 'scale(0.75)';
    revisionField.style.transform = 'scale(1.25)';
    revisionField.style.zIndex = 99;

    // add disabled attribute to main game input field.
    document.getElementById('answer-box').setAttribute('disabled', 'disabled');
    // disable the attribute in the revision field. 
    document.getElementById('revision-answer-box').disabled = false;
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
 * This function handles all necessary logic for HTML for the division question to work. 
 * This function works alongside the validateAnswer function.
 */
function displayDivision(operandOne, operandTwo){
    // set a bigger range for a larger scope of user answers.
    operandOne = Math.floor(Math.random() * 144) + 1;
    operandTwo = Math.floor(Math.random() * 144) + 1;

    // logic ensuring operandOne will always be bigger than operandTwo
    if (operandTwo > operandOne) {
        let box = operandOne;
        operandOne = operandTwo;
        operandTwo = box;
        document.getElementById('second-operand').textContent = operandOne;
        document.getElementById('first-operand').textContent = operandTwo;
    }

    // logic for ensuring operandOne is evenly divisible by operandTwo
    if (operandOne % operandTwo !== 0) {
        for (let i = 2; i <= operandOne; i++) {
            if (operandOne % i === 0) {
                operandTwo = i; //this is a variable
                document.getElementById('second-operand').textContent = i;
                break;
            }
        }
    } 

    document.getElementById('first-operand').textContent = operandOne;
    document.getElementById('second-operand').textContent = operandTwo;
    document.getElementById('operator').textContent = '/';
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
                if ((currentOperator === '+') || (currentOperator === '-')){
                    beginGame('add-subtract');
                } else if (currentOperator === 'x'){
                    beginGame('multiplication');
                } else if (currentOperator === '/'){
                    beginGame('division');
                }
            }

            if (this.getAttribute('data-type') === 'submit'){
                validateAnswer();
            }

            if (this.getAttribute('data-type') === 'exit'){
                // reset the page displays.
                let firstPage = document.getElementById('first-page');
                let secondPage = document.getElementById('second-page');
                secondPage.style.display = 'none';
                firstPage.style.display = 'block';

                // remove the user's entered name in the 'name' input field.
                document.getElementById('name').value = '';
                document.getElementById('name').focus();

                // reset score values to 0.
                document.getElementById('right-answer').innerText = 0;
                document.getElementById('wrong-answer').innerText = 0;

                // empty tabs array
                tabValues = '';
                // remove any user value from the main game input field.
                document.getElementById('answer-box').value = '';
                // remove any user value from the revision input field.
                document.getElementById('revision-answer-box').value = '';
            }
        });
    }
}

/**
 * This function computes the answers for each of the question categories based on the current operator visible in the question
 * game field. It returns an array that is later used in the validateAnswer function. 
 */
function computeAnswer(){
    let firstOperand = parseInt(document.getElementById('first-operand').innerText);
    let secondOperand = parseInt(document.getElementById('second-operand').innerText);
    let currentOperator = document.getElementById('operator').innerText;

    if (currentOperator === '+'){
        return [firstOperand + secondOperand, 'add-subtract'];
    } else if (currentOperator === '-'){
        return [firstOperand - secondOperand, 'add-subtract'];
    } else if (currentOperator === 'x'){
        return [firstOperand * secondOperand, 'multiplication'];
    } else if (currentOperator === '/'){
        return [firstOperand / secondOperand, 'division'];
    }
}

/**
 * This function validates the user's answer against the computed answer in the computeAnswer function. 
 */
function validateAnswer(){
    // ensures the value we get from the DOM is a number.
    let userAnswer = parseInt(document.getElementById('answer-box').value);
    // variable stores the returned value from computeAnswer() function.
    let correctAnswer = computeAnswer();
    // sets the value of correctly based on true or false evaluation.
    let correctly = userAnswer === correctAnswer[0];

    (correctly) ? addScore() : addIncorrectScore();
    beginGame(correctAnswer[1]);
    // returns a boolean indicating whether the answer was right or wrong (TRUE or FALSE).
    // this is used in the createTab function.
    return correctly;
}

/**
 * This function increments the 'Correct Answers' tab in the game if the computed answer matches the user's answer.
 * The logic for this function was partially gotten from the Love Maths walkthrough Game on Code Institute.
 */
function addScore(){
    // convert the inner string of text of right-score '0' to a number.
    let scoreTrack = parseInt(document.getElementById('right-answer').innerText);
    // convert the inner string of text of points '0' to a number.
    let points = parseInt(document.getElementById('points').innerText);
    // get the element again and change its inner text to the scoreTrack number + 1.
    document.getElementById('right-answer').innerText = ++scoreTrack;
    // get the element again and change its inner text to the points number + 100.
    document.getElementById('points').innerText = points + 100;
}

/**
 * This function increments the 'Incorrect Answers' tab in the game if the computed answer does not match the user's answer.
 * The logic for this function was partially gotten from the Love Maths walkthrough Game on Code Institute.
 */
function addIncorrectScore(){
    // incrementing the incorrect answers score 
    let incorrectScoreTrack = parseInt(document.getElementById('wrong-answer').innerText);
    document.getElementById('wrong-answer').innerText = ++incorrectScoreTrack;
    let points = parseInt(document.getElementById('points').innerText);
    document.getElementById('points').innerText = points - 50;

    createTab();
}

// From here starts the javascript code for handling the revision side of the game.
// an empty global array to hold the values of wrongly answered questions.
let tabValues = [];
/**
 * This function calculates the answer for the revision field based on the current operand.
 */
function computeRevisionAnswer(){
    let firstOperand = parseInt(document.getElementById('revision-first-operand').innerText);
    let secondOperand = parseInt(document.getElementById('revision-second-operand').innerText);
    let currentOperator = document.getElementById('revision-operator').innerText;

    if (currentOperator === '+'){
        return firstOperand + secondOperand;
    } else if (currentOperator === '-'){
        return firstOperand - secondOperand;
    } else if (currentOperator === 'x'){
        return firstOperand * secondOperand;
    } else if (currentOperator === '/'){
        return firstOperand / secondOperand;
    }
}

/**
 * This function sets the backgroundColor of the newly created tabs based on the operator.
 */
function setBackgroundColor(tab, operator){
    switch (operator){
        case '+':
            tab.style.backgroundColor = 'red';
            break;
        case '-':
            tab.style.backgroundColor = 'blue';
            break;
        case 'x':
            tab.style.backgroundColor = 'green';
            break;
        case '/':
            tab.style.backgroundColor = 'yellow';
            break;
        default:
            tab.style.backgroundColor = 'lightgrey';
    }
}

/**
 * This function creates revision tabs and appends them to the DOM element with class - 'revision-tabs'.
 */
function createTab(parameterOne, parameterTwo){
    // get the first element of the tabs array + add one tab at a time.
    let tabs = document.getElementsByClassName('revision-tabs')[0];
    let tab = document.createElement('div');
    tab.classList.add('tab');

    // logic for storing the incorrectly-answered question parameters.
    // step 1 : get current operator.
    let currentOperator = document.getElementById('operator').textContent;

    // step 2 : assign the innerHTML of the tab to the operator + styles.
    tab.innerText = `${currentOperator}`;
    setBackgroundColor(tab, currentOperator);

    // step 3 : assign the innerHTML of the revision field operators to the operators of the current wrong answer operators.
    parameterOne = document.getElementById('first-operand').textContent;
    parameterTwo = document.getElementById('second-operand').textContent;

    // step 4 : append the new tab to the tabs container.
    tabs.appendChild(tab);

    tab.addEventListener('click', function(){
        // class 'selected' is added to all elements so we remove it first.
        let allTabs = document.getElementsByClassName('tab');
        for (let tab of allTabs) {
            tab.classList.remove('selected');
        }
        tab.style.backgroundColor = setBackgroundColor(tab, currentOperator);

        // add the class to one element - i.e. the one that has been clicked on.
        this.classList.add('selected');
        this.style.backgroundColor = 'orange';

        // assign to innerText of the revision operands
        document.getElementById('revision-first-operand').innerText = parameterOne;
        document.getElementById('revision-second-operand').innerText = parameterTwo;
        document.getElementById('revision-operator').innerText = currentOperator;
    });
}

/**
 * This function holds event listeners for cleaner code organisation. 
 */
function eventListenerSetUp(){
    document.getElementById('answer-box').addEventListener('keypress', handleFirstAnswers);
    document.getElementById('revision-answer-box').addEventListener('keypress', handleRevision);
}
eventListenerSetUp();

/**
 * This function handles the main game's input field when a user presses the 'enter' key.
 * It will set new questions, validate, and push incorrectly answered questions into an array which will 
 * be used and iterated over in the revision game. 
 */
function handleFirstAnswers(event){
    if (event.key === 'Enter') {
        let currentOperandOne = document.getElementById('first-operand').textContent;
        let currentOperator = document.getElementById('operator').textContent;
        let currentOperandTwo = document.getElementById('second-operand').textContent;

        if (!validateAnswer()) {
            tabValues.push({
                revOperandOne: currentOperandOne,
                revOperator: currentOperator,
                revOperandTwo: currentOperandTwo
            });
        }
    }
}

/**
 * This function changes the current tab to the next tab. It is called in the handleRevision function.
 */
function changeTabColour(){
    let tabs = Array.from(document.getElementsByClassName('revision-tabs')[0].children);

    // selects the first element with class 'selected'.
    let currentSelected = document.getElementsByClassName('selected')[0];
    // gets its index.
    let currentSelectedIndex = tabs.indexOf(currentSelected);

    if (currentSelectedIndex <= tabs.length - 1){
            // gets the next element's index.
            let nextTabIndex = currentSelectedIndex + 1;
            // removes the class 'selected' from the first element. 
            tabs[currentSelectedIndex].classList.remove('selected');
            // adds the class 'selected' to the next element.
            tabs[nextTabIndex].classList.add('selected');
            tabs[nextTabIndex].style.backgroundColor = 'orange';

            let nextValues = tabValues[nextTabIndex];

            // assign to innerText of the revision operands
            document.getElementById('revision-first-operand').innerText = nextValues.revOperandOne;
            document.getElementById('revision-second-operand').innerText = nextValues.revOperandTwo;
            document.getElementById('revision-operator').innerText = nextValues.revOperator;
    } else {
        alert ('nein');
    }
}

/**
 * This function handles the revision input field when a user presses the 'enter' key.
 * It will validate, clear the revision input field value, and go onto the next tab. 
 */
function handleRevision(event){
    if (event.key === 'Enter') {
        validateRevision();
        document.getElementById('revision-answer-box').value = '';
        changeTabColour();
    }
}

/**
 * This function handles validation logic for the revision section of the game.
 */
function validateRevision(){
    let computedRevision = computeRevisionAnswer();
    let userRevision = parseInt(document.getElementById('revision-answer-box').value);
    let correctRevision = userRevision === computedRevision;

    (correctRevision) ? amendCorrectTabs() : amendIncorrectTabs();
    return correctRevision;
}

/**
 * This function handles logic for tab changes if the revision question was answered correctly.
 */
function amendCorrectTabs(){
    let selectedTab = document.getElementsByClassName('selected')[0];
    selectedTab.style.backgroundColor = 'green';
}

/**
 * This function handles logic for tab changes if the revision question was answered incorrectly.
 */
function amendIncorrectTabs(){
    let selectedTab = document.getElementsByClassName('selected')[0];
    selectedTab.style.backgroundColor = 'lightgrey';
}

userButtonActions();
categorySelection();