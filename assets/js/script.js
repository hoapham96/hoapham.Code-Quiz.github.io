// Home page
var mainEl = document.querySelector("#main");
var timerEl = document.querySelector("#timer");
var timeLeft = 75;
var totalPoints = 0;
var end = false;

    // Global Functions for use in questions
var points = function() {
    totalPoints = totalPoints + 10;
    console.log("You have " + totalPoints + " points!");
}
var timer = function() {
    var timeInterval = setInterval(() => {
        if(timeLeft <= 0) {
            console.log("this being called");
            points();
            removeElementsByClass("question-container"); 
            removeElementsByClass("result-message"); 
            end = true;
            enterScore();
        }

        if (end === false) {
            timerEl.textContent = timeLeft;
            timeLeft --;
            return timeLeft;
        } else {
            timerEl.textContent = timeLeft;
            clearInterval(timeInterval);
        }
    }, 1000);
    
    console.log("TIMER STARTED")
    if (end === true){
        timerEl.textContent = timeLeft;
    }
}

function removeElementsByClass(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}


var highScores = function() {
        //div
    var highScoreContainer = document.createElement("div");
    highScoreContainer.className = "hs-container";
    mainEl.appendChild(highScoreContainer);

    // high Score TITLE
    var title = document.createElement("h1");
    title.className = "high-score-title";
    title.textContent = "High Scores";
    highScoreContainer.appendChild(title);

    //displays high scores
        // displays player scores
    var initals = localStorage.getItem("initals");
    var score = localStorage.getItem("score");
    var leaderboardScore = document.createElement("p");
    leaderboardScore.className = "leaderboard-score";
    leaderboardScore.textContent = "1." + initals + " - " + score;
    highScoreContainer.appendChild(leaderboardScore);



        //div
    var leaderboard = document.createElement("div");
    leaderboard.className = "leaderboard";
    highScoreContainer.appendChild(leaderboard);
        //button "GO BACK"
    var goBack = document.createElement("button");
    goBack.className = "go-back-btn";
    goBack.textContent = "Go Back";
    goBack.addEventListener("click", event => {
        totalPoints = 0;
        end = false;
        timeLeft = 75;
        highScoreContainer.remove();
        start();
    })
    leaderboard.appendChild(goBack);
        // button "CLEAR HIGH SCORE"
    var clearHighScore = document.createElement("button");
    clearHighScore.className = "clear-highScore";
    clearHighScore.textContent = "Clear High Scores";
    clearHighScore.addEventListener("click", event => {
        //remove score from local storage
        localStorage.removeItem("initals")
        //remove initals from local storage
        localStorage.removeItem("score")
        //remove score from leaderboard
        leaderboardScore.remove();
    })
    leaderboard.appendChild(clearHighScore);
}

var enterScore = function(resultMessage) {
        // DIV
    var doneContainer = document.createElement("div");
    var resultMessageContainer = document.createElement("div");
    doneContainer.className = "done-container";
    resultMessageContainer.className = "result-message";
    mainEl.appendChild(doneContainer);
    mainEl.appendChild(resultMessageContainer);
    resultMessageContainer.textContent=resultMessage;
        // TITLE
    var done = document.createElement("h1");
    done.textContent = "All Done!";
    done.className = "done-title";
    doneContainer.appendChild(done);
        // SCORE
    var score = document.createElement("h4");
    score.textContent = "Your final score is " + totalPoints;
    score.className = "score";
    doneContainer.appendChild(score); 

        //div
    var inputContainer = document.createElement("div");
    inputContainer.className = "input-container";
    doneContainer.appendChild(inputContainer);

        // LABEL
    var label = document.createElement("label");
    label.textContent = "Enter Initials:";
    label.className = "label";
    label.setAttribute("for", "input");
    inputContainer.appendChild(label);
        // INPUT
    var initalInput = document.createElement("Input");
    initalInput.className = "score-input";
    initalInput.setAttribute("id", "input")
    initalInput.setAttribute("name", "input");
    initalInput.setAttribute("type", "text");
    inputContainer.appendChild(initalInput);
        //SUBMIT
    var submit = document.createElement("button");
    submit.textContent = "Submit";
    submit.className = "submit-btn";
    submit.addEventListener("click", event => {
            // retreives user input
        var initals = document.getElementById("input").value;
        //store score in local storage
        localStorage.setItem("initals", initals);
        //store initals in local storage
        localStorage.setItem("score", totalPoints);
            // remove page content
        doneContainer.remove();
        //move to next page
        highScores();
    })
    inputContainer.appendChild(submit);
}

var questionFive = function(resultMessage) {
    // execute if wrong answer is choosen
    var removeWrong = function() {;
        questionContainer.remove();
        resultMessageContainer.remove();
        enterScore('Wrong!');
        console.log("The answer you picked was wrong");
        end = true;
    }
        //div
        var questionContainer = document.createElement("div");
        var resultMessageContainer = document.createElement("div");
        questionContainer.className = "question-container";
        resultMessageContainer.className = "result-message";
        mainEl.appendChild(questionContainer);
        mainEl.appendChild(resultMessageContainer);
        resultMessageContainer.textContent=resultMessage;

        // question Two
    var question = document.createElement("h1");
    question.className = "question";
    question.textContent = "What's another word for case sensitive";
    questionContainer.appendChild(question);

        // question Two Answers
    var answerContainer = document.createElement("div");
    answerContainer.className = "answer-container";
    questionContainer.appendChild(answerContainer);
            // answer one
    var answerOne = document.createElement("button");
    answerOne.className = "answer-One";
    answerOne.textContent = "1. CamelCasing";
    answerContainer.appendChild(answerOne);
    answerOne.addEventListener("click", event => {
        points();
        questionContainer.remove();
        resultMessageContainer.remove();
        enterScore('Correct!');
        console.log("You picked the right answer");
        end = true;
    })
            //answer Two
    var answerTwo = document.createElement("button");
    answerTwo.className = "answer-Two";
    answerTwo.textContent = "2. Uppercase";
    answerContainer.appendChild(answerTwo);
    answerTwo.addEventListener("click", event => {
            removeWrong();
    })
            // answer Three
    var answerThree = document.createElement("button");
    answerThree.className = "answer-Three";
    answerThree.textContent = "3. Case Sensitive";
    answerContainer.appendChild(answerThree);
    answerThree.addEventListener("click", event => {
        removeWrong();
    })
            // answer Four
    var answerFour = document.createElement("button");
    answerFour.className = "answer-Four";
    answerFour.textContent = "4. No Clue";
    answerContainer.appendChild(answerFour);
    answerFour.addEventListener("click", event => {
        removeWrong();
    })
}

var questionFour = function(resultMessage) {
// execute if wrong answer is choosen
    var removeWrong = function() {
        timeLeft = timeLeft - 10;
        questionContainer.remove();
        resultMessageContainer.remove();
        questionFive('Wrong!');
        console.log("The answer you picked was wrong");
        return timeLeft;
    }
        //div
    var questionContainer = document.createElement("div");
    var resultMessageContainer = document.createElement("div");
    questionContainer.className = "question-container";
    resultMessageContainer.className = "result-message";
    mainEl.appendChild(questionContainer);
    mainEl.appendChild(resultMessageContainer);
    resultMessageContainer.textContent=resultMessage;

        // question Two
    var question = document.createElement("h1");
    question.className = "question";
    question.textContent = "What does assigning a variable null do:";
    questionContainer.appendChild(question);

        // question Two Answers
    var answerContainer = document.createElement("div");
    answerContainer.className = "answer-container";
    questionContainer.appendChild(answerContainer);
            // answer one
    var answerOne = document.createElement("button");
    answerOne.className = "answer-One";
    answerOne.textContent = "1. number";
    answerContainer.appendChild(answerOne);
    answerOne.addEventListener("click", event => {
        removeWrong();
    })
            //answer Two
    var answerTwo = document.createElement("button");
    answerTwo.className = "answer-Two";
    answerTwo.textContent = "2. string";
    answerContainer.appendChild(answerTwo);
    answerTwo.addEventListener("click", event => {
        removeWrong();
    })
            // answer Three
    var answerThree = document.createElement("button");
    answerThree.className = "answer-Three";
    answerThree.textContent = "3. undefined";
    answerContainer.appendChild(answerThree);
    answerThree.addEventListener("click", event => {
        removeWrong();
    })
            // answer Four
    var answerFour = document.createElement("button");
    answerFour.className = "answer-Four";
    answerFour.textContent = "4. nothing";
    answerContainer.appendChild(answerFour);
    answerFour.addEventListener("click", event => {
        questionContainer.remove();
        resultMessageContainer.remove();
        questionFive('Correct!');
        console.log("You picked the right answer");
        points();
    })
}

var questionThree = function(resultMessage) {
// execute if wrong answer is choosen
    var removeWrong = function() {
        timeLeft = timeLeft - 10;
        questionContainer.remove();
        resultMessageContainer.remove();
        questionFour('Wrong!');
        console.log("The answer you picked was wrong");
    }
        //div
        var questionContainer = document.createElement("div");
        var resultMessageContainer = document.createElement("div");
        questionContainer.className = "question-container";
        resultMessageContainer.className = "result-message";
        mainEl.appendChild(questionContainer);
        mainEl.appendChild(resultMessageContainer);
        resultMessageContainer.textContent=resultMessage;

        // question Two
    var question = document.createElement("h1");
    question.className = "question";
    question.textContent = "Arrays in JavaScript can be used to store __________.";
    questionContainer.appendChild(question);

        // question Two Answers
    var answerContainer = document.createElement("div");
    answerContainer.className = "answer-container";
    questionContainer.appendChild(answerContainer);
            // answer one
    var answerOne = document.createElement("button");
    answerOne.className = "answer-One";
    answerOne.textContent = "1. numbers & strings";
    answerContainer.appendChild(answerOne);
    answerOne.addEventListener("click", event => {
        removeWrong();
    })
            //answer Two
    var answerTwo = document.createElement("button");
    answerTwo.className = "answer-Two";
    answerTwo.textContent = "2. other arrays";
    answerContainer.appendChild(answerTwo);
    answerTwo.addEventListener("click", event => {
        removeWrong();
    })
            // answer Three
    var answerThree = document.createElement("button");
    answerThree.className = "answer-Three";
    answerThree.textContent = "3. booleans";
    answerContainer.appendChild(answerThree);
    answerThree.addEventListener("click", event => {
        removeWrong();
    })
            // answer Four
    var answerFour = document.createElement("button");
    answerFour.className = "answer-Four";
    answerFour.textContent = "4. all of the above";
    answerContainer.appendChild(answerFour);
    answerFour.addEventListener("click", event => {
        questionContainer.remove();
        resultMessageContainer.remove();
        questionFour('Correct!');
        console.log("You picked the right answer");
        points();
    })
}

var questionTwo = function(resultMessage) {
        // execute if wrong answer is choosen
    var removeWrong = function() {
        questionContainer.remove();
        resultMessageContainer.remove();
        questionThree('Wrong!');
        timeLeft = timeLeft - 10;
        console.log("The answer you picked was wrong");
    }
        //div
    var questionContainer = document.createElement("div");
    var resultMessageContainer = document.createElement("div");
    resultMessageContainer.className = "result-message";
    questionContainer.className = "question-container";
    mainEl.appendChild(questionContainer);
    mainEl.appendChild(resultMessageContainer);
    resultMessageContainer.textContent=resultMessage;

        // question Two
    var question = document.createElement("h1");
    question.className = "question";
    question.textContent = "The condition in an if / else statement is enclosed with ________.";
    questionContainer.appendChild(question);

        // question Two Answers
    var answerContainer = document.createElement("div");
    answerContainer.className = "answer-container";
    questionContainer.appendChild(answerContainer);
            // answer one
    var answerOne = document.createElement("button");
    answerOne.className = "answer-One";
    answerOne.textContent = "1. quotes";
    answerContainer.appendChild(answerOne);
    answerOne.addEventListener("click", event => {
        removeWrong();
    });
            //answer Two
    var answerTwo = document.createElement("button");
    answerTwo.className = "answer-Two";
    answerTwo.textContent = "2. curly brackets";
    answerContainer.appendChild(answerTwo);
    answerTwo.addEventListener("click", event => {
        removeWrong();
    });
            // answer Three
    var answerThree = document.createElement("button");
    answerThree.className = "answer-Three";
    answerThree.textContent = "3. parenthesis";
    answerContainer.appendChild(answerThree);
    answerThree.addEventListener("click", event => {
        questionContainer.remove();
        resultMessageContainer.remove();
        questionThree('Correct!');
        console.log("You picked the right answer");
        points();
    });
            // answer Four
    var answerFour = document.createElement("button");
    answerFour.className = "answer-Four";
    answerFour.textContent = "4. square brackets";
    answerContainer.appendChild(answerFour);
    answerFour.addEventListener("click", event => {
        removeWrong();
    });
}

var questionOne = function() {
    var timeOut = function (){}

        // execute if wrong answer is choosen
    var removeWrong = function() {
        timeLeft = timeLeft - 10;
        questionContainer.remove();
        questionTwo('Wrong!');
        console.log("The answer you picked was wrong");
    }
        //div
    var questionContainer = document.createElement("div");
    questionContainer.className = "question-container";
    mainEl.appendChild(questionContainer);

        //question One
    var question = document.createElement("h1");
    question.className = "question";
    question.textContent = "Commonly Used data types DO NOT Include:";
    questionContainer.appendChild(question);

        //question One Answers
    var answerContainer = document.createElement("div");
    answerContainer.className = "answer-container";
    questionContainer.appendChild(answerContainer);
            // answer One
    var answerOne = document.createElement("button");
    answerOne.className = "answer-One";
    answerOne.textContent = "1. strings";
    answerContainer.appendChild(answerOne);
    answerOne.addEventListener("click", event => {

        removeWrong();
    })
            // answer Two
    var answerTwo = document.createElement("button");
    answerTwo.className = "answer-Two";
    answerTwo.textContent = "2. booleans";
    answerContainer.appendChild(answerTwo);
    answerTwo.addEventListener("click", event => {

        removeWrong();
    })
            // answer Three
    var answerThree = document.createElement("button");
    answerThree.className = "answer-Three";
    answerThree.textContent = "3. alerts";
    answerContainer.appendChild(answerThree);
    answerThree.addEventListener("click", event => {
        questionContainer.remove();
        questionTwo('Correct!');
        console.log("You picked the right answer");
        points();
    })
            // answer Four
    var answerFour = document.createElement("button");
    answerFour.className = "answer-Four";
    answerFour.textContent = "4. numbers";
    answerContainer.appendChild(answerFour);
    answerFour.addEventListener("click", event => {
        removeWrong();
    })
    console.log("Question One");
}

var start = function() {
        //div
    var container = document.createElement("div");
    container.className = "home-container"
    mainEl.appendChild(container);

        // start page title
    var homeHeader = document.createElement("h1");
    homeHeader.className = "home-title";
    homeHeader.textContent = "Coding Quiz Challenge";
    container.appendChild(homeHeader);

        // start page paragraph
    var homeParagraph = document.createElement("p");
    homeParagraph.className = "home-text-p";
    homeParagraph.textContent = "Try to answer the following code-related" +
    " questions within the time limit. Keep in mind that incorrect answer will" +
    " penalize your score/time by ten seconds!"
    container.appendChild(homeParagraph);

        // start quick button
    var startQuizBtn = document.createElement("button");
    startQuizBtn.className = "home-btn";
    startQuizBtn.textContent = "Start Quiz";
    container.appendChild(startQuizBtn);

        // removes home page elements
    startQuizBtn.addEventListener("click", event => {
        timer();
        startQuizBtn.remove();
        homeHeader.remove();
        homeParagraph.remove();
        questionOne();
    });
}
start();