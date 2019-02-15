document.addEventListener("DOMContentLoaded", function(event) { 
    var main            = document.getElementById('main');
    var input           = document.getElementById('timeAmount');
    var userScore       = document.getElementsByClassName('userScore')[0];
    var computerScore   = document.getElementsByClassName('computerScore')[0];
    var buttonStart     = document.getElementsByClassName('startGame')[0];
    var buttonNewStart  = document.getElementsByClassName('startNewGame')[0];
    var modal           = document.getElementById('modalWindow');
    var modalContent    = document.getElementsByClassName('modal-content')[0];

    for (var i = 0; i < 100; i++) {
        var gameBlock = document.createElement('div');
        gameBlock.classList.add('gameBlock');
        gameBlock.style.backgroundColor = 'blue';
        main.appendChild(gameBlock);
    }
    
    var allBlocks = document.getElementsByClassName('gameBlock');
    
    function updateScore(_player) {
        switch(_player) {
            case 'user':
                userScore.innerHTML = Number(userScore.innerHTML) + 1;
                if (Number(userScore.innerHTML) >= 10) {
                    disableAllDivs();
                    callPopup('User');
                } else {
                    pickRandomElement();
                }
            break;
            case 'computer':
                computerScore.innerHTML = Number(computerScore.innerHTML) + 1;
                if (Number(computerScore.innerHTML) >= 10) {
                    disableAllDivs();
                    callPopup('Computer');
                } else {
                    pickRandomElement();
                }
            break;
        }
    }

    function pickRandomElement() {
        var randomNumber = Math.floor(Math.random() * allBlocks.length);

        var timer = setTimeout(function() { 
            allBlocks[randomNumber].style.backgroundColor = 'red';
            allBlocks[randomNumber].style.pointerEvents = 'none';
            allBlocks[randomNumber].classList.add('played');

            
            clearTimeout(timer);
            updateScore('computer');
        }, input.value);

        if (allBlocks[randomNumber].classList.contains('played')) {
            clearTimeout(timer);
            pickRandomElement();
        } else {
            allBlocks[randomNumber].style.backgroundColor = 'yellow';
            allBlocks[randomNumber].onclick = function() {
                console.log('Click just happened');
                allBlocks[randomNumber].style.backgroundColor = 'green';
                allBlocks[randomNumber].style.pointerEvents = 'none';
                allBlocks[randomNumber].classList.add('played');
    
                clearTimeout(timer);
                updateScore('user');
            };
        }
        
        
        
    };

    function checkTimeValue() {
        if (isNaN(input.value) || input.value == '' ) {
            alert ('Please enter just a number');
        } else {
            console.log('game is starting');
            pickRandomElement();
            buttonStart.disabled = 'true';
        }
    };

    function callPopup(_winner) {
        //modal.style.display = "flex";
        modal.classList.add('visible');
        var paragraph = document.createElement('p');
        paragraph.textContent = _winner + ' ' + 'has won this game with score ' + userScore.innerText + ' : ' + computerScore.innerText;
        modalContent.appendChild(paragraph);
    }

    function disableAllDivs() {
        for (var i = 0; i < allBlocks.length; i++) {
            allBlocks[i].style.pointerEvents = 'none';
        }
    }

    function startNewGame() {
        window.location.reload();
    }

    buttonStart.addEventListener('click', checkTimeValue);

    buttonNewStart.addEventListener('click', startNewGame);

    var closeButton = document.getElementsByClassName("close")[0];

    closeButton.onclick = function() {
        //modal.style.display = 'none';
        modal.classList.remove('visible');
        buttonNewStart.style.visibility = 'visible';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            //modal.style.display = 'none';
            modal.classList.remove('visible');
            buttonNewStart.style.visibility = 'visible';
        }
    }
});