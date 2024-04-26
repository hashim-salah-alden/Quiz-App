let appContainer = document.querySelector('.app-container'),
    bulletsContainer = document.querySelector('.bullets'),
    qCountSpan = document.querySelector('.questions-count span'),
    categoryNameSpan = document.querySelector('.category span'),
    questionArea = document.querySelector('.quiz-area'),
    answersArea  =document.querySelector('.answers-area'),
    submitButton = document.querySelector('.submit-button'),
    quizContainer = document.querySelector('.quiz-container'),
    choosenAnswer,
    rightAnswwers = 0,
    currentIndex = 0;

    
function getQustions(){

    document.addEventListener('click', e =>{

        if(e.target.className === 'category'){
            
            // hide the category
            e.target.parentNode.remove();
            // put the category name in app info
            categoryNameSpan.innerHTML = e.target.dataset.name;

            appContainer.style.visibility = 'visible';
            // store the chossecn category url 
            let choosenCategory = e.target.dataset.url;

            let myRequest = new XMLHttpRequest();

            myRequest.onreadystatechange = function () {
    
                if(this.readyState === 4 && this.status === 200){
                    // create object from the response text
                    let questionsObject = JSON.parse(this.responseText),
                    // the number of questions
                    questionsCount  = questionsObject.length;
                    // call the create bullets function
                    createBullets(questionsCount);
                    // call add question data function
                    addQuestionData(questionsObject[currentIndex], questionsCount);
                    // create function when submit button has clicked
                    submitButton.onclick = () => {
                        // storage the right answer in variable
                        let theRightAnswer = questionsObject[currentIndex].right_answer;

                        choosenAnswer = document.querySelector('.answers-area .choosen-answer').innerText;

                        // increase the current index
                        currentIndex ++;
                        // call hundle bullet function
                        hundleBullets(currentIndex);
                        // call the check answer function
                        checkAnswer(theRightAnswer);
                        // remove the old qustion and answers
                        questionArea.innerHTML = '';
                        answersArea.innerHTML = '';
                        // add the next qustion and answers
                        addQuestionData(questionsObject[currentIndex], questionsCount);
                        // call show result function
                        showResult(questionsCount);

                    };

                }
            }
        
            myRequest.open("GET",choosenCategory,true);
            myRequest.send();
        }
        // add chossen class on answer when it clicked
        if(e.target.classList.contains('answer')){
            
            document.querySelector('.answers-area .choosen-answer').classList.remove('choosen-answer');
            e.target.classList.add('choosen-answer');
                
        }
        



    })
}

getQustions();


// create bullets function
function createBullets(qCount){
    // add question number in app info
    qCountSpan.innerHTML = qCount;

    for(let i = 0; i < qCount; i++){
        // create bullet span 
        let bulletSpan = document.createElement('span');
        // append span in bullet container
        bulletsContainer.appendChild(bulletSpan);
        // add active class in first bullet
        if(i == 0){

            bulletSpan.className = 'on';
        }

    }
}

// create add qestion data function
function addQuestionData(obj, count){

    if(currentIndex < count ){

        questionArea.innerHTML = `<h2>${obj.title}</h2>`;

        for(let i =1; i <= 4; i++){

            answersArea.innerHTML += `
                <div class="answer">
                    ${obj[`answer_${i}`]}
                </div>
            `;
            
        }
        // set the first element as a default anser
        answersArea.firstElementChild.classList.add('choosen-answer');

    }

}

// create check answer function
function checkAnswer(rAnswer){

    if(choosenAnswer===rAnswer){

        rightAnswwers ++;

    }
};

// create show result function 
function showResult (qCount){

    if(currentIndex === qCount){
        // remove qustion and answers area
        questionArea.remove();
        answersArea.remove();
        submitButton.remove();
        
        // create result container 
        quizContainer.innerHTML = `<div class="result-container">Your score is <span> ${rightAnswwers}</span> from ${qCount}</div>`;

    }
}

// create hundle bullets function 
function hundleBullets(currentIndex) {

    let bullets = document.querySelectorAll('.bullets span');

    bullets.forEach(function(bullet,index){

        if(currentIndex === index){

            bullet.classList.add('on')

        }

    })

};