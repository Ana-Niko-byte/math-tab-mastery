// Javascript script for the math-tab-mastery game.
document.addEventListener('DOMContentLoaded', function() {
    // On DOM content load, remove the default error message under name input field.
    let initialMessage = document.getElementsByClassName('error')[0];
    initialMessage.innerText = '';

    document.getElementById('name').value = '';

    // Immediately direct attention to the input field.
    document.getElementById('name').focus();

});

// Global variable so that random category can use logic from other functions and operator can be tracked from anywhere. 
let globalOperator = '';
let timed;

/**
 * This function validates the name the user inputs into the 'name' input field on the first page.
 * This is used in the main game as a greeting in the point tracking element.
 */
function nameValidator() {
    let userName = document.getElementById('name').value;
    let error = document.getElementsByTagName('span')[0];
    // Regex format acquired from url:https://stackoverflow.com/questions/18042133/check-if-input-is-number-or-letter-javascript. 
    let regex = /^[a-zA-Z]+$/;

    // If 'name' input has no value, add an error message. 
    // Otherwise, remove the text in the error message.
    if (!userName) {
        error.innerText = 'name required';
    } else if (!userName.match(regex)) {
        // This will also show if there is a space before or after the name input.
        error.innerText = 'please use letters only';
    } else {
        error.innerText = '';
        return true;
    }
}

/**
 * This function handles category selection through user interaction.
 * The selected button (category) displays the type or arithemetic game on the second page.
 */
function categorySelection() {
    // This returns an array of the category buttons.
    let buttons = document.getElementsByClassName('button-category');

    for (let button of buttons) {
        // On click, it takes note of the value of the 'data-type' attribute on each of the buttons.
        button.addEventListener('click', function() {
            let chosenCategory = this.getAttribute('data-type');

            // This will return either true or false depending on whether there is a value in the name input field.
            let nameValidated = nameValidator();

            // The game will only begin if the name field is valid.
            if (nameValidated) {
                beginGame(chosenCategory);
                // The timer begins as soon as the main game loads. 
                timeProgress();
            }
        });
    }
}

/**
 * 
 * This function begins the game with the chosen category from the user. 
 */
function beginGame(category) {
    let firstPage = document.getElementById('first-page');
    let secondPage = document.getElementById('second-page');

    firstPage.style.display = 'none';
    secondPage.style.display = 'block';

    // Set the user's input name into the greeting + capitalise first letter and lowercase the rest.
    let user = document.getElementById('name').value;
    let capitalisedUser = user.charAt(0).toUpperCase() + user.slice(1).toLowerCase();
    let placeholder = document.getElementById('user-name');
    placeholder.innerText = `${capitalisedUser}`;

    let gameCategory = document.getElementById('category');
    gameCategory.innerText = `${category}`;

    document.getElementById('answer-box').value = '';
    document.getElementById('answer-box').focus();


    // Set a base range for the operators in the game area (these are changed in some of the categories).
    let numOne = Math.floor(Math.random() * 30) + 1;
    let numTwo = Math.floor(Math.random() * 30) + 1;

    document.getElementById('first-operand').innerText = numOne;
    document.getElementById('second-operand').innerText = numTwo;

    // Set conditional logic for the type of game.
    if (category === 'add-subtract') {
        displayAddSubtract(numOne, numTwo);
    } else if (category === 'multiplication') {
        displayMultiplication(numOne, numTwo);
    } else if (category === 'division') {
        displayDivision(numOne, numTwo);
    } else if (category === 'random') {
        displayRandom(numOne, numTwo);
    } else {
        alert('Unknown gametype. Please try again later.');
        throw ('Unknown gametype. Please try again later.');
    }
}

// Code for functionality partially taken from https://www.w3schools.com/howto/howto_js_progressbar.asp
/**
 * This function handles the logic for the time bar (30seconds). 
 * Its global variable 'timed' is also used in the exitGame function.
 */
function timeProgress() {
    // Reset the interval when the function is called - addressing a bug noticed when setting exit button logic.
    clearInterval(timed);

    let timeBar = document.getElementById('time-progress');
    // The 1% specified in CSS width.
    let width = 1;
    timed = setInterval(frame, 300);

    function frame() {
        if (width >= 100) {
            // Resets the interval if width is at 100% or more.
            clearInterval(timed);
            // Sets the new width.
            timeBar.style.width = width + "%";
            // Starts the revision game. 
            revisionSwitch();
        } else {
            width++;
            timeBar.style.width = width + "%";
        }
    }
}

/**
 * This function handles the UI side of the game - after 30 seconds, the revision field is displayed and the main game field hidden.
 */

function revisionSwitch() {
    let revisionField = document.getElementById('revision-game');
    let mainField = document.getElementById('game-field');
    document.getElementById('revision-answer-box').value = '';
    // Get the length of the tabValues array storing all the wrongly-answered questions.
    let tabLength = tabValues.length;
    // If it is empty (i.e. all answers were correct or user didn't play).
    if (tabLength === 0) {
        alert('Well done! Now have a go at a different category :)');
        // Brings the user back to the intro page straight away to encourage them to play again.
        exitGame();
    } else {
        mainField.style.display = 'none';
        revisionField.style.display = 'flex';

        // Scale elements for visual emphasis of game being finished.
        mainField.style.transform = 'scale(0.75)';
        revisionField.style.transform = 'scale(1.25)';
        revisionField.style.zIndex = 99;

        // Set the first question to be the first wrongly-answered question.
        let firstWrongQuestion = tabValues[0];
        let firstTab = document.getElementsByClassName('tab')[0];

        firstTab.classList.add('selected');
        firstTab.style.backgroundColor = '#EAE2B7';

        // Set the values of the object firstWrongQuestion to the revision field operands.
        document.getElementById('revision-first-operand').innerText = firstWrongQuestion.revOperandOne;
        document.getElementById('revision-second-operand').innerText = firstWrongQuestion.revOperandTwo;
        document.getElementById('revision-operator').innerText = firstWrongQuestion.revOperator;
    }
}

/**
 * This function handles all necessary logic for HTML for the add-subtract question to work. 
 * This function works alongside the validateAnswer function.
 */
function displayAddSubtract(operandOne, operandTwo) {
    // Make sure operands don't give a negative answer during validation.
    if (operandTwo > operandOne) {
        let box = operandOne;
        operandOne = operandTwo;
        operandTwo = box;
    }

    document.getElementById('first-operand').textContent = operandOne;
    document.getElementById('second-operand').textContent = operandTwo;

    //Logic for determining whether 'operator' will be '+' or '-'.
    let determined = Math.round(Math.random());
    document.getElementById('operator').textContent = (determined === 1) ? '+' : '-';
}

/**
 * This function handles all necessary logic for HTML for the multiplication question to work. 
 * This function works alongside the validateAnswer function.
 */
function displayMultiplication(operandOne, operandTwo) {
    // Set smaller range so sum answers are manageable - (max 13 x 13).
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
function displayDivision(operandOne, operandTwo) {
    // Set a bigger range for a larger scope of user answers.
    operandOne = Math.floor(Math.random() * 144) + 1;
    operandTwo = Math.floor(Math.random() * 144) + 1;

    // Logic ensuring operandOne will always be bigger than operandTwo.
    if (operandTwo > operandOne) {
        let box = operandOne;
        operandOne = operandTwo;
        operandTwo = box;
        document.getElementById('second-operand').textContent = operandOne;
        document.getElementById('first-operand').textContent = operandTwo;
    }

    // Logic for ensuring operandOne is evenly divisible by operandTwo.
    if (operandOne % operandTwo !== 0) {
        for (let i = 2; i <= operandOne; i++) {
            if (operandOne % i === 0) {
                operandTwo = i;
                document.getElementById('second-operand').textContent = i;
                break;
            }
        }
    }

    document.getElementById('first-operand').textContent = operandOne;
    document.getElementById('second-operand').textContent = operandTwo;
    document.getElementById('operator').textContent = '/';
}

function displayRandom(operandOne, operandTwo) {
    // To determine the operator and game type.
    let determined = Math.floor(Math.random() * 4);

    switch (determined) {
        case 0:
            // Update global operator variable.
            globalOperator = '+';
            // Use existing game logic.
            displayAddSubtract(operandOne, operandTwo);
            break;
        case 1:
            globalOperator = '-';
            displayAddSubtract(operandOne, operandTwo);
            break;
        case 2:
            globalOperator = 'x';
            displayMultiplication(operandOne, operandTwo);
            break;
        case 3:
            globalOperator = '/';
            displayDivision(operandOne, operandTwo);
            break;
        default:
            alert('Unable to determine operator. Aborting! :(');
            throw ('Unable to determined operator. Aborting!');
    }
}

/**
 * This function establishes the logic for user actions on the 'skip' and 'submit' buttons.
 * These vary slightly depending on whether the user is playing 'main game' or 'revision'.
 */
function userButtonActions() {
    // Gets user buttons as an array.
    let buttons = document.getElementsByClassName('user-control-buttons');

    for (let button of buttons) {
        button.addEventListener('click', function() {
            // Gets states of current games.
            let mainGameActive = document.getElementById('game-field').style.display !== 'none';
            let revisionActive = document.getElementById('revision-game').style.display === 'flex';
            // Skip button logic. 
            if (this.getAttribute('data-type') === 'skip') {
                // If main game, the skip button will generate new questions. 
                if (mainGameActive) {
                    skipQuestion();
                    // If revision game, the skip button moves onto the next tab.
                } else if (revisionActive) {
                    changeTab();
                    document.getElementById('revision-answer-box').value = '';
                }
            }

            if (this.getAttribute('data-type') === 'submit') {
                // If main game, submit will validate answer and make tabs.
                if (mainGameActive) {
                    validateAnswer();
                    // If revision, tabs will change states based on user answer.  
                } else if (revisionActive) {
                    validateRevision();
                }
            }

            if (this.getAttribute('data-type') === 'exit') {
                // Separate function which works the same everywhere.
                exitGame();
            }
        });
    }
}

/**
 * This function handles logic for skipping a question when the main game is active. 
 * It is called in the userButtonActions function. 
 */
function skipQuestion() {
    // Need to set condition to check type of game before restarting the game (generating next question).
    let category = document.getElementById('category').innerText;

    // To update points system. 
    let points = parseInt(document.getElementById('points').innerText);
    document.getElementById('points').innerText = points - 25;
    if (category === 'random') {
        beginGame(category);
    } else {
        if (category === 'add-subtract') {
            beginGame('add-subtract');
        } else if (category === 'multiplication') {
            beginGame('multiplication');
        } else if (category === 'division') {
            beginGame('division');
        }
    }
}

/**
 * This function exits the second page of the application, resets values, and brings the user to the first page of the game. 
 */
function exitGame() {
    // Reset the page displays.
    let firstPage = document.getElementById('first-page');
    let secondPage = document.getElementById('second-page');
    secondPage.style.display = 'none';
    firstPage.style.display = 'flex';

    let revisionGame = document.getElementById('revision-game');
    let mainGame = document.getElementById('game-field');
    revisionGame.style.display = 'none';
    mainGame.style.display = 'flex';
    // Reset scaled elements.
    mainGame.style.transform = 'scale(1.10)';
    revisionGame.style.transform = 'scale(0.75)';

    // Remove the user's entered name in the 'name' input field.
    document.getElementById('name').value = '';
    document.getElementById('name').focus();
    // Remove any user value from the main game input field.
    document.getElementById('answer-box').value = '';
    // Remove any user value from the revision input field.
    document.getElementById('revision-answer-box').value = '';

    // Reset score and points to 0.
    document.getElementById('right-answer').innerText = 0;
    document.getElementById('wrong-answer').innerText = 0;
    document.getElementById('points').innerText = 0;

    // Empty tabs array.
    tabValues = [];
    // Empty tabs appearing in UI side too (live HTML).
    let tabContainer = document.getElementsByClassName('revision-tabs')[0];
    // While there is a child in the tabContainer element, delete the element. 
    while (tabContainer.firstChild) {
        tabContainer.removeChild(tabContainer.firstChild);
    }

    // Reset timebar width + clear global 'timed' variable.
    clearInterval(timed);
    document.getElementById('time-progress').style.width = '1%';
}

/**
 * This function computes the answers for each of the question categories based on the current operator visible in the question
 * game field. It returns an array that is later used in the validateAnswer function. 
 */
function computeAnswer() {
    let firstOperand = parseInt(document.getElementById('first-operand').innerText);
    let secondOperand = parseInt(document.getElementById('second-operand').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator === '+') {
        return [firstOperand + secondOperand, 'add-subtract'];
    } else if (operator === '-') {
        return [firstOperand - secondOperand, 'add-subtract'];
    } else if (operator === 'x') {
        return [firstOperand * secondOperand, 'multiplication'];
    } else if (operator === '/') {
        return [firstOperand / secondOperand, 'division'];
    }
}

/**
 * This function validates the user's answer against the computed answer in the computeAnswer function. 
 */
function validateAnswer() {
    // Ensures the value we get from the DOM is a number.
    let userAnswer = parseInt(document.getElementById('answer-box').value);
    // Variable stores the returned value from computeAnswer() function.
    let correctAnswer = computeAnswer();

    let correctly = userAnswer === correctAnswer[0];

    // Boolean 
    (correctly) ? addScore(): addIncorrectScore();

    // Check which category the user is playing to know which game to display.
    let category = document.getElementById('category').innerText;
    if (category === 'random') {
        beginGame('random');
    } else {
        beginGame(correctAnswer[1]);
    }
    // Returns a boolean indicating whether the answer was right or wrong. Used in the createTab function.
    return correctly;
}

/**
 * This function increments the 'Correct Answers' tab in the game if the computed answer matches the user's answer.
 * The logic for this function was partially taken from the Love Maths walkthrough Game on Code Institute.
 */
function addScore() {
    let scoreTrack = parseInt(document.getElementById('right-answer').innerText);
    let points = parseInt(document.getElementById('points').innerText);

    document.getElementById('right-answer').innerText = ++scoreTrack;
    document.getElementById('points').innerText = points + 100;
}

/**
 * This function increments the 'Incorrect Answers' tab in the game if the computed answer does not match the user's answer.
 * The logic for this function was partially gotten from the Love Maths walkthrough Game on Code Institute.
 */
function addIncorrectScore() {
    let incorrectScoreTrack = parseInt(document.getElementById('wrong-answer').innerText);
    document.getElementById('wrong-answer').innerText = ++incorrectScoreTrack;

    let points = parseInt(document.getElementById('points').innerText);
    document.getElementById('points').innerText = points - 50;

    // Create a new tab for the revision section when a user gives a wrong answer. 
    createTab();
}

// ______________ From here starts the javascript code for handling the revision side of the game.
// An empty global array to hold the values of wrongly answered questions.
let tabValues = [];
/**
 * This function calculates the answer for the revision field based on the current operand.
 */
function computeRevisionAnswer() {
    let firstOperand = parseInt(document.getElementById('revision-first-operand').innerText);
    let secondOperand = parseInt(document.getElementById('revision-second-operand').innerText);
    let currentOperator = document.getElementById('revision-operator').innerText;

    if (currentOperator === '+') {
        return firstOperand + secondOperand;
    } else if (currentOperator === '-') {
        return firstOperand - secondOperand;
    } else if (currentOperator === 'x') {
        return firstOperand * secondOperand;
    } else if (currentOperator === '/') {
        return firstOperand / secondOperand;
    }
}

/**
 * This function sets the backgroundColor of the newly created tabs based on the operator. 
 * It is called in the createTabs function.
 */
function setBackgroundColor(tab, operator) {
    switch (operator) {
        case '+':
            tab.style.backgroundColor = 'rgb(249, 189, 116)';
            break;
        case '-':
            tab.style.backgroundColor = 'rgb(253, 83, 83)';
            break;
        case 'x':
            tab.style.backgroundColor = 'rgb(242, 242, 64)';
            break;
        case '/':
            tab.style.backgroundColor = 'rgb(43, 227, 218)';
            break;
        default:
            tab.style.backgroundColor = 'rgb(104, 104, 104)';
    }
}

/**
 * This function creates revision tabs and appends them to the DOM element with class - 'revision-tabs'.
 */
function createTab() {
    // Get the first element of the tabs array + add one tab at a time.
    let tabs = document.getElementsByClassName('revision-tabs')[0];
    let tab = document.createElement('div');
    tab.classList.add('tab');

    // Logic for storing the incorrectly-answered question parameters.
    // Step 1 : get current operator.
    let currentOperator = document.getElementById('operator').textContent;

    // Step 2 : assign the innerHTML of the tab to the operator + styles.
    tab.innerText = `${currentOperator}`;
    // Sets the background colour as the tab is created.
    setBackgroundColor(tab, currentOperator);

    // Step 3 : assign the innerHTML of the revision field operators to the operators of the current wrong answer operators.
    let parameterOne = document.getElementById('first-operand').textContent;
    let parameterTwo = document.getElementById('second-operand').textContent;

    // Step 4 : append the new tab to the tabs container.
    tabs.appendChild(tab);

    // Add an event listener property to each created tab. 
    tab.addEventListener('click', function() {
        let allTabs = document.getElementsByClassName('tab');
        // Class 'selected' is added to all elements on click so we iterate through them and remove it first.
        for (let tab of allTabs) {
            tab.classList.remove('selected');
        }
        tab.style.backgroundColor = setBackgroundColor(tab, currentOperator);

        // Add the class to one element - i.e. the one that has been clicked on.
        this.classList.add('selected');
        this.style.backgroundColor = '#EAE2C4';

        // Assign to innerText of the revision operands
        document.getElementById('revision-first-operand').innerText = parameterOne;
        document.getElementById('revision-second-operand').innerText = parameterTwo;
        document.getElementById('revision-operator').innerText = currentOperator;
    });
}

/**
 * This function holds event listeners for cleaner code organisation. 
 */
function eventListenerSetUp() {
    document.getElementById('answer-box').addEventListener('keypress', handleFirstAnswers);
    document.getElementById('revision-answer-box').addEventListener('keypress', handleRevision);
}
eventListenerSetUp();

/**
 * This function handles the main game's input field when a user presses the 'enter' key.
 * It will set new questions, validate, and push incorrectly answered questions into an array which will 
 * be used and iterated over in the revision game. 
 */
function handleFirstAnswers(event) {
    if (event.key === 'Enter') {
        // Gets the current values of the question being displayed and stores them in a variable. 
        let currentOperandOne = document.getElementById('first-operand').textContent;
        let currentOperator = document.getElementById('operator').textContent;
        let currentOperandTwo = document.getElementById('second-operand').textContent;

        if (!validateAnswer()) {
            // If the answer is wrong, these values are pushed into the global array tabValues. 
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
function changeTab() {
    let tabs = Array.from(document.getElementsByClassName('revision-tabs')[0].children);
    // Selects the first element with class 'selected'.
    let currentSelected = document.getElementsByClassName('selected')[0];
    // Gets its index.
    let currentSelectedIndex = tabs.indexOf(currentSelected);
    if (currentSelectedIndex === tabs.length - 1) {
        alert('Revision complete! Well done, try a different category! The game will automatically exit in 2 seconds :)');
        // Apply a small delay of 2 secs so the user can see if their tab validated correctly or not.
        setTimeout(function() {
            exitGame();
        }, 2000);
    } else {
        // Gets the next element's index.
        let nextTabIndex = currentSelectedIndex + 1;
        // Removes the class 'selected' from the first element. 
        tabs[currentSelectedIndex].classList.remove('selected');
        // Adds the class 'selected' to the next element.
        tabs[nextTabIndex].classList.add('selected');
        tabs[nextTabIndex].style.backgroundColor = 'rgb(173, 38, 71)';

        let tabLength = tabValues.length - 1;
        let nextValues;

        // Ensure nextValues has a set index to fall on. 
        if (tabValues[tabLength] == nextValues){
            nextValues = tabValues[tabLength];
        } else {
            nextValues = tabValues[nextTabIndex];
        }

        // Assign to innerText of the revision operands
        document.getElementById('revision-first-operand').innerText = nextValues.revOperandOne;
        document.getElementById('revision-second-operand').innerText = nextValues.revOperandTwo;
        document.getElementById('revision-operator').innerText = nextValues.revOperator;
    }
}

/**
 * This function handles the revision input field when a user presses the 'enter' key.
 * It will validate, clear the revision input field value, and go onto the next tab. 
 */
function handleRevision(event) {
    if (event.key === 'Enter') {
        validateRevision();
    }
}

/**
 * This function handles validation logic for the revision section of the game.
 */
function validateRevision() {
    let computedRevision = computeRevisionAnswer();
    let userRevision = parseInt(document.getElementById('revision-answer-box').value);
    let correctRevision = userRevision === computedRevision;

    (correctRevision) ? amendCorrectTabs(): amendIncorrectTabs();
    changeTab();
    document.getElementById('revision-answer-box').value = '';
    document.getElementById('revision-answer-box').focus();
    return correctRevision;
}

/**
 * This function handles logic for tab changes if the revision question was answered correctly.
 */
function amendCorrectTabs() {
    let selectedTab = document.getElementsByClassName('selected')[0];
    selectedTab.style.backgroundColor = 'rgb(48, 145, 48)';
}

/**
 * This function handles logic for tab changes if the revision question was answered incorrectly.
 */
function amendIncorrectTabs() {
    let selectedTab = document.getElementsByClassName('selected')[0];
    selectedTab.style.backgroundColor = 'rgb(166, 166, 166)';
    // Tell the user the correct answer.
    let computedRevision = computeRevisionAnswer();
    alert(`The correct answer was ${computedRevision}`);
}

userButtonActions();
categorySelection();