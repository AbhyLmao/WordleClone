window.onload = async() => {
    const res = await fetch("https://api.masoudkf.com/v1/wordle", {
    headers: {
    "x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv",
    },
    });
    const data = await res.json();
    let dictionary = data.dictionary; 

    
    

    let wordIndex = (Number.parseInt(Math.random() * dictionary.length));
    
    const startOverBtn = document.getElementById('startOver');
    const darkBtn = document.getElementById('dark');
    const finlol  = document.getElementById('finallol')
    const hinttext = document.getElementById('hintlol')
    
    const bodylol = document.getElementById("bodylmao")
    const openInfo = document.querySelectorAll('[data-modal-target]')
    const closeInfo = document.querySelectorAll('[data-close-button]')
    const overlayInfo = document.getElementById('overlay')
    
    const openHint = document.querySelectorAll('[data-modal-targetHint]')
    const closeHint = document.querySelectorAll('[data-close-buttonHint]')
    
    const imgget1 = document.getElementById('imglol1');
    const imgget2 = document.getElementById('imglol2');
    

    if (dictionary != null){
        startOverBtn.innerHTML = "Start Over";
    }
    
    let isDark = false;

    darkBtn.addEventListener('click', function () {
        if (isDark ===false){
            bodylol.classList.add("dark");
            isDark = true;
            darkBtn.innerHTML = "Light";
        } else if(isDark === true) {
            bodylol.classList.remove('dark');
            isDark = false;
            darkBtn.innerHTML = "Dark";
        }   
    });

    function openModal(modal) {
        if (modal == null) return
        modal.classList.add('active')
        overlay.classList.add('active')
      }
      
    function closeModal(modal) {
        if (modal == null) return
        modal.classList.remove('active')
        overlay.classList.remove('active')
    }

    
    openInfo.forEach(button => {
      button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
      })
    })
    
    overlayInfo.addEventListener('click', () => {
      const modals = document.querySelectorAll('.modal.active')
      modals.forEach(modal => {
        closeModal(modal)
      })
    })
    
    closeInfo.forEach(button => {
      button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
      })
    })
    




    openHint.forEach(button => {
        button.addEventListener('click', () => {
          const modal = document.getElementById("modalHint")
          openModal(modal)
        })
      })
      
      
      
      closeHint.forEach(button => {
        button.addEventListener('click', () => {
          const modal = button.closest('.modal')
          closeModal(modal)
        })
      })

      
      
    

    
let state= {
    secret: dictionary[wordIndex].word.toLowerCase(),
    hint: dictionary[wordIndex].hint,
    grid: Array(4)
    .fill()
    .map(() => Array(4).fill('')),
    currentRow: 0,
    currentCol: 0,
};

startOverBtn.addEventListener('click', function () {
    restartlol();
    finlol.innerHTML = "";
    finlol.classList.remove('fadelol');
});


function updateLol() {
    for(let i=0; i< state.grid.length; i++){
        for (let j = 0; j< state.grid[i].length; j++){
            const box = document.getElementById('box'+i+j);
            box.textContent = state.grid[i][j];
        }
    }
    
}

function boxLol(container, row, col, letters = "") {
    const box = document.createElement('div');
    box.className = 'box';
    box.id = 'box'+row+col;
    box.textContent = letters;

    container.appendChild(box);
    return box;
}

function gridLol(container){
    const grid = document.createElement('div');
    grid.className = "grid";

    for(let i = 0; i<4; i++) 
    {
        for(let j = 0; j <4; j++){
            boxLol(grid, i, j);
        }
    }

    container.appendChild(grid);
}

function setHint(){

    hinttext.innerHTML = `${state.hint}`;

}

setHint()


function keyEvent() {

    const isGameOver = state.currentRow === 4;
    guessed = false;
    

    
    document.body.onkeydown = (e) => {

        
        if(guessed) return;
        
        const key = e.key;
        if(state.currentRow<4){
        if (key === 'Enter') {
            if (state.currentCol === 4) 
            {
                const word = getWordLol();
          
                revealWord(word);
                state.currentRow++;

                
                
                state.currentCol = 0;
                
                
                const isWinner = state.secret === word;
                
                if(isWinner){
                    guessed = true;
                }
                

 
            }
            else{
            
                alert("Please enter a whole word!")
                

            }
        }
        if (key === 'Backspace') {
            removeLetter();
        }
        if (isLetter(key)) {
            addLetter(key);
        }
        if(guessed === false && state.currentRow === 4){
            finlol.classList.add('fadelol');
            finlol.style.color = '#F47174'
            finlol.innerHTML = `Better luck next time! The word was ${state.secret}.`;
            
        }
        updateLol();
        };
    }
}


function getWordLol()
{
    return state.grid[state.currentRow].reduce((prev, curr) => prev+curr);
}

function isLetter(key)
{
    return key.length === 1 && String(key).match(/[a-z]/i);
}


function addLetter(letter)
{
    if (state.currentCol === 4){
        return;
    }
    
    state.grid[state.currentRow][state.currentCol] = letter.toLowerCase();
    state.currentCol++;

}

function removeLetter() {
    if(state.currentCol === 0){
        return;
    }
    state.grid[state.currentRow][state.currentCol-1] = '';
    state.currentCol--;

}

function revealWord(guess){
    const row = state.currentRow;
    const isWinner = state.secret === guess;
    const isGameOver = state.currentRow === 4;

    
    for (let i = 0; i < 4; i++) {
        const box = document.getElementById(`box${row}${i}`);
        const letter = box.textContent;
        
        setTimeout(() => {
            
            if (letter === state.secret[i]) {
                box.classList.add('right');
            } else if (state.secret.includes(letter)) {
                box.classList.add('wrong');
            } else {
                box.classList.add('empty');
              }
            
          }, ((i + 1) * 500) / 2);
      
          box.classList.add('animated');
          box.style.animationDelay = `${(i * 500) / 2}ms`;
        }
    
    
        if (isWinner) {
            finlol.classList.add('fadelol');
            finlol.style.color = '';
            

            imgget1.classList.add('active')
            imgget2.classList.add('active')
            finlol.innerHTML = "Congratulations! You guessed the word! 	&#10084;";
            
          
        } else if (isGameOver) {

            
            
            finlol.innerHTML = `Better luck next time! The word was ${state.secret}.`;
            
        }
    


}

function restartlol(){

    clearWords();

    wordIndex = (Number.parseInt(Math.random() * dictionary.length));
    state.secret = dictionary[wordIndex].word.toLowerCase();
    state.hint = dictionary[wordIndex].hint;
    setHint();
    
    
    imgget1.classList.remove('active')
    imgget2.classList.remove('active')
    keyEvent();
    
}

function clearWords(){
    state.grid = Array(4)
        .fill()
        .map(() => Array(4).fill(''));
    state.currentCol = 0;
    state.currentRow = 0;

    for (let i = 0; i < 4; i++) {
        for(let j = 0; j < 4; j++){
            const box = document.getElementById(`box${i}${j}`);
            box.classList.remove('right');
            
            box.classList.remove('wrong');
         
            box.classList.remove('empty');
            
            box.classList.remove('animated');
        }
    }
    
    updateLol();
}

function startlol() {
    const game = document.getElementById('game')
    gridLol(game);

   keyEvent();
   
   
   
}


startlol();
}
//♡〜٩( ˃▿˂ )۶〜♡