// Question Variables
var questions = [
    {
        title: "Which of the following is NOT a good reason for version control?",
        choices: ["1. Version control allows the codebase to be modified and tested without interrupting the user experience.", "2. Version control allows changes to the codebase to be tested individually.", "3. Version control allows teams to work on individual features synchronously.", "4. Version control allows features to ship directly to the main branch."],
        answer: "Version control allows features to ship directly to the main branch."
    },
    {
        title: "If you are currently on the develop branch. Which of the following commands does NOT switch to a new branch?",
        choices: ["1. git checkout main", "2. git checkout -b feature/header", "3. git branch feature/header"],
        answer: "git branch feature/header"
    },
    {
        title: "True or false: the * selector in CSS selects all HTML elements and applies a style to them.",
        choices: ["True", "False"],
        answer: "True"
    },
    {
        title: "How can you add more than one class to an HTML element?",
        choices: ["1. Add a second class attribute", "2. Add a comma between the class names","3. Add a space between the class names","4. Add a class-2 attribute"],
        answer: "Add a space between the class names"
    },
    {
        title: "What CSS declaration could you add to a 50%-width <div> to center it?",
        choices: ["1. text-align: center", "2. margin: 0 auto", "3. float: center", "4. align: center"],
        answer: "margin: 0 auto"
    },

];

var score = 0;
var questionIndex = 0;
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#start");
var MainDiv = document.querySelector("#MainDiv");
var wrapper = document.querySelector("#wrapper");

var secondsLeft = 90;
var holdInterval = 0;
var penalty = 5;
var ulCreate = document.createElement("ul");


timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;
            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});


function render(questionIndex) {
    MainDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // loops
    for (var i = 0; i < questions.length; i++) {
        // question titles
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        MainDiv.textContent = userQuestion;
    }
    // question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        MainDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// Comparing choices with answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct answer 
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct!"
        } else {
            // wrong answer
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong!"
        }

    }
    // question index
    questionIndex++;

    if (questionIndex >= questions.length) {
        // user results
        allDone();
        createDiv.textContent = "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    MainDiv.appendChild(createDiv)
}
// All done will append last page
function allDone() {
    MainDiv.innerHTML = "";
    currentTime.innerHTML = "";

    // Heading
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "Results"

    MainDiv.appendChild(createH1);

    // Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    MainDiv.appendChild(createP);

    // score calculations
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your score is: " + timeRemaining;

        MainDiv.appendChild(createP2);
    }

    // Label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials:";

    MainDiv.appendChild(createLabel);

    // initials
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    MainDiv.appendChild(createInput);

    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    MainDiv.appendChild(createSubmit);

    // local storage storing scores
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // redirect to last page
            window.location.replace("./scores.html");
        }
    });

}