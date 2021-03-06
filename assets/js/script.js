var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    }
];

var questionIndex= 0;
var time = questions.length * 15;
var timer = document.getElementById("time");
var start = document.getElementById("start");
var main = document.getElementById("main-content");
var questionEl = document.getElementById("questions-div");

var answers = document.getElementById("answers");
var clockId;
var scores = [];
var scoreIdCounter = 0;

function startGame() {
    main.setAttribute("class", "hide");
    questionEl.removeAttribute("class");
    clockId = setInterval(clock, 1000);
    timer.textContent = time;
    questionRender();
}

var rightWrong = document.createElement("div")
    rightWrong.setAttribute("id", "right-wrong")

var buttonHandler = function(event) {
    var answer = event.target;
    
    if (answer.textContent == questions[questionIndex].answer) {
        rightWrong.textContent = "Correct!";
    } else {
        time = time - 10;
        rightWrong.textContent = "Wrong!";
    }
    questionIndex++;
    if (questionIndex >= questions.length) {
        quizStop();

    } else {
        questionRender(questionIndex);
    }
    questionEl.appendChild(rightWrong);
}

function quizStop() {
    clearInterval(clockId);
    questionEl.innerHTML = "";
    timer.innerHTML = "";

    var endHeader = document.createElement("h1")
    endHeader.setAttribute("id", "end-header");
    endHeader.textContent = "All Done!"
    questionEl.appendChild(endHeader);

    var pScore = document.createElement("p");
    pScore.setAttribute("id", "final-score");
    if (time >= 0) {
        var finalScore = time;
        pScore.textContent = "Your final score is " + finalScore;
    }
    questionEl.appendChild(pScore);

    var inputForm = document.createElement("div");
    inputForm.setAttribute("id", "input-form")
    questionEl.appendChild(inputForm);
    
    var initialLabel = document.createElement("label");
    initialLabel.setAttribute("id", "initial-label");
    initialLabel.textContent = "Enter you initials: ";
    inputForm.appendChild(initialLabel);
    
    var initalForm = document.createElement("input");
    initalForm.setAttribute("type", "text");
    initalForm.setAttribute("id", "initial-form");
    inputForm.appendChild(initalForm);

    var submitBtn = document.createElement("button");
    submitBtn.setAttribute("type", "submit");
    submitBtn.setAttribute("id", "form-submit");
    submitBtn.textContent = "Submit";
    inputForm.appendChild(submitBtn);

    submitBtn.onclick = function () {
        var initals = initalForm.value;
        console.log(initals);
        if (initals === "") {
            window.alert("Please enter your initials!")
        } else {
            var endScore = {
                initals: initals,
                score: finalScore,
                id: scoreIdCounter
            }

            scores.push(endScore)
            localStorage.setItem("scores", JSON.stringify(scores));
            scoreIdCounter++
        }
        
    }
}

function questionRender() {
    var questionName = document.getElementById("question");
    var currentQuestion = questions[questionIndex];
    questionName.textContent = currentQuestion.title;
    answers.innerHTML = "";
    currentQuestion.choices.forEach(function (choice, i) {
        var choiceButton = document.createElement("button");
        choiceButton.setAttribute("value", choice);
        choiceButton.setAttribute("id", "choice")
        choiceButton.textContent = choice;
        answers.appendChild(choiceButton);
        choiceButton.addEventListener("click", buttonHandler);
    });
}

function clock() {
    time--;
    timer.textContent = time;
    if (time <= 0) {
        quizStop();
    }
}

var loadScores = function() {
    scores.localStorage.getItem("scores");
}

start.onclick = startGame; 

loadScores();