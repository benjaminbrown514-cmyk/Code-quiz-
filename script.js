//Creatign a wrapper element to process all clicks on the page.
var wrapper = document.querySelector(".wrapper");
//start Button
var startBtn = null;
// variable for putting initial message with Start button and then the multiple choice questions dynamically
var initCard = document.querySelector("#init-card");
//Timer display
var timer = document.querySelector("#timerDisp");
//variable to to display result of each question as correct or wrong
var result = document.querySelector("#result");
//variable to store user entered initials
var initials = null;
//Variable to keep track of timer.  Each round get 75 seconds
var timeLeft = 75;
//Variable to keep track of number of questions
var numQues = 0;
//Variable to keep track of the score
var score = 0;
//Array to store (initials, score) pair in Local storage
var scoreList = [ 
    

];

var timer1 = null;

//array to store all the questions, theirs choices of answers and correct answer
var questionList = [
    {ques:"Commonly used data types do NOT include: ", btn1:"1. strings", btn2:"2. boolean", btn3:"3. alerts", btn4:"4. numbers", ans:"3. alerts"},
    {ques: "Arrays in JavaScript can be used to store: ", btn1:"1. number and strings ", btn2:"2. other arrays", btn3:"3. booleans", btn4:"4. all of the above", ans: "4. all of the above "},
    {ques: "Strings values must be enclosed within when being assigned to variables:", btn1:"1. commas ", btn2:"2. curly brackets", btn3:"3. quotes", btn4: "4. paranthesis", ans:"3. quotes" },
    {ques:"A very useful tool used during development and debugging for printing content is: ", btn1: "1. Javascript", btn2:"2.terminal/bash", btn3: "3. loops", btn4: "4. console.log", ans: "4. console.log" },
    {ques:"The condition in an if/else statement is enclosed with ", btn1: "1. quotes", btn2: "2. curly brackets", btn3: "3. paranthesis", btn4: "4. square brackets", ans: "3. paranthesis"}
         //YOUR CODE
]




function sendMessage(){
    timer.textContent = "time is done" 
    
}

function  advanceQuestion(){
    console.log("hello")
    if (numQues >= questionList.length - 1){ 
        saveResults() 
        return  // end quiz
         }
    numQues += 1
    var data = [questionList[numQues].btn1, questionList[numQues].btn2, questionList[numQues].btn3, questionList[numQues].btn4]
    initCard.innerHTML = ''
    initCard.textContent = questionList[numQues].ques
    for (i = 0; i < 4; i++){
         const btn = document.createElement('button')
         btn.textContent = data[i]
         btn.className = 'btn'
         initCard.appendChild(btn)
    }   
    
    
}

 
//Timer function  - it is executed when Start button is pressed
function startTimer() {
    function timerInterval(){
        timeLeft--;
        timer.textContent = timeLeft + "time left on quiz"
    

        if(timeLeft == 0){
            stopTimer()
            numQues = 99
            advanceQuestion() 
            sendMessage(); 
        }
    };
    timer1 = setInterval(timerInterval, 1000)

}

    //YOUR CODE
function stopTimer(){
    clearInterval(timer1)
}


//Function to run the quiz
function runQuiz() {
    timeLeft = 75;
    numQues = -1;
    startTimer() 
    advanceQuestion()

    //YOUR CODE
}


// Function to save users score and initial - this is called when Timer is done or all the questions are done and timer is set to zero.
function saveResults() {
    stopTimer()
    score = timeLeft
    timer.textContent = ''
    initCard.textContent =  'You scored ' + score + 'Enter your initials'
    const textInput = document.createElement('input')
    textInput.id = "InitialsV"
    initCard.appendChild(textInput)
    const btn = document.createElement('button')
    btn.textContent = "Submit"
    initCard.appendChild(btn) 
    



    
    //YOUR CODE

}

//Get the list of Initials and score from Local Storage to display high scores from previous runs
//if link = true, we need to create a display string for alert popup when View High Score lin is clicked
//If link = false, we need to createa string to display high score on the card in the apge.
function getScoreListString(link) {
    //get stored initial/score pair from local storage
    var storedList = JSON.parse(localStorage.getItem("scoreList"));
    var values = "";

    for (var i = 0; i < storedList.length; i++) {
        var y = i+1;
        if(!link)
         values += "<span>" + y + ". " + storedList[i].initials + " - " + storedList[i].score + "</span><br>";
        else
        values +=  y + ". " + storedList[i].initials + " - " + storedList[i].score + "<br>";

    }

    return values;
}

//Function to calculate if the user selected correct response
function getResults(btnValue) {
    console.log('no')
    var getResults = JSON.parse(localStorage.getItem("Results"))
    var values = "";
    if(questionList[numQues].ans == btnValue){
         console.log("correct answer")
         result.textContent = 'correct'  
         return true 
                        
    }
    else{
        console.log("false answer")
        result.textContent = 'false' 
        return false 
        
    }
        
    
    

    //YOUR CODE
}


//Function to show results list in the card on the page
function showResults(event) {
    score = timeLeft 
    initCard.innerHTML = ''
    result.textContent = ''
    initCard.textContent = "High Scores:"
    const table = document.createElement('p')
    table.className = 'span'
    table.innerHTML = getScoreListString(false)
    initCard.appendChild(table)
    const btn = document.createElement('button')
    btn.textContent = "Go Back"
    btn.className = 'btn'
    initCard.appendChild(btn) 
    const btn1 = document.createElement('button')
    btn1.textContent = "Clear High Scores"
    btn1.className = 'btn'
    initCard.appendChild(btn1) 
    
    


 //YOUR CODE
}

//main Event listener for warpper element - it will parse all the clicks for links and various buttons on the page
wrapper.addEventListener("click", function (event) {
    var element = event.target;
    var answer = false;
    console.log(element);
    event.preventDefault();
    if (element.id === "InitialsV"){
        console.log("initials input clicked")
    }
    else if (element.innerHTML === "View High Scores") {  //View High Scores
        console.log("View high score clicked");

        //YOUR CODE

        alert(newValues);

    } else if (element.innerHTML === "Start") { //Start Button
        console.log("Start button clicked");

        //start the timer when start button is clicked
        runQuiz();

    } else if (element.innerHTML === "Submit") { //Submit Button

        console.log("Submit clicked");
        initials = document.getElementById("InitialsV")
        //userScore object to store scores in local storage
        var userScore = {
            initials: initials.value.trim(),
            score: score
        };
        console.log(userScore)
        //add the latest userScore to the ScoreList
        scoreList[scoreList.length] = userScore;

        //weite scoreList to local storage
        localStorage.setItem("scoreList", JSON.stringify(scoreList));

        //show all the scores stored in local storage so far
        showResults();

    } else if (element.innerHTML === "Go Back") { //Go back

        console.log("Go Back clicked");

        //This will go back to the beginning and sets all the variables to their initial value before reloading the page

        //YOUR CODE

       location.reload();

    } else if (element.innerHTML === "Clear High Scores") {  //Clear High Score Button
 
        console.log("Clear High Score clicked");

       //empty out the scoreList
        scoreList.splice(0, scoreList.length);
        //store in local storage
        localStorage.setItem("scoreList", JSON.stringify(scoreList));
        //clear out the display on page
        initCard.innerHTML = "<b>High Scores:</b><br><span></span>\n <button id=\"goBack\" class=\"btn\">Go Back</button><button id=\"clearScores\" class=\"btn\">Clear High Scores</button>";

    } else if (element.innerHTML !== "Start") {       //Any of the Answer Button 

        console.log("One of the answer button clicked");

        //Return if all questions are done
        if(numQues == 4){
            saveResults()
            return;
        }
        //check if answer is correct or wrong
        answer = getResults(element.innerHTML);

        //answer is wrong
        if (answer == false) {
            timeLeft -= 5
            
            //YOUR CODE

        }  
           advanceQuestion()
            //YOUR CODE
            
        

    } else {
        console.log("Ignore redundant clicks.");
    }
})


//Main fucntion
//It setups up the start message
//Also initialize the scoreList for the session with any initial/scores pairs stored in local storage from previous sessions
function init() {
    initCard.innerHTML = "Click Start button to start the timed quiz. Remember a wrong answer will detect time from the timer.<br><button id=\"start\" class\=\"btn\">Start</button>";
    startBtn = document.querySelector("#start");

    //get stored scores
    var storedList = JSON.parse(localStorage.getItem("scoreList"));
    if (storedList !== null) {
        scoreList = storedList;
    }
}

//Call init
init();



