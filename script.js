let game = document.querySelector('#area');
let result = document.querySelector('.result');
let buttonGame = document.querySelector('.new-game');
let boxes = document.querySelectorAll('.box');
let step = false;
let circle = `<svg class="circle">
<circle r="30" cx="50" cy="50" stroke="blue"
stroke-width="10" fill="none" stroke-linecap="round"></circle>
</svg>`;
let cross = `<svg class="cross">
<line class="first" x1="15" y1="15" x2="75" y2="75" stroke="red"
stroke-width="10" stroke-linecap="round"></line>
<line class="second" x1="75" y1="15" x2="15" y2="75" stroke="red"
stroke-width="10" stroke-linecap="round"></line>
</svg>`;
let count = 0;

function stepCross(target) {
    target.innerHTML = cross;
    target.classList.add('x');
    count++;
}

function stepZero(target) {
    target.innerHTML = circle;
    target.classList.add('o');
    count++;
}

function init(event) {
    if(!step) stepCross(event.target);
    else stepZero(event.target);
    step = !step;
    win();
}

function newGame() {
    step = false;
    count = 0;
    result.innerText = '';
    boxes.forEach(item => {
        item.innerHTML = '';
        item.classList.remove('x', 'o', 'activ')
    })
    game.addEventListener('click', init);
}

function win() {
    let comb = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < comb.length; i++) {
        if(boxes[comb[i][0]].classList.contains('x') && 
            boxes[comb[i][1]].classList.contains('x') &&
            boxes[comb[i][2]].classList.contains('x')) {
                setTimeout(()=> {
                    boxes[comb[i][0]].classList.add('activ');
                    boxes[comb[i][1]].classList.add('activ');
                    boxes[comb[i][2]].classList.add('activ');
                    result.innerText = 'Выиграли Х';
                },500);
                game.removeEventListener('click', init)
            }
        if(boxes[comb[i][0]].classList.contains('o') && 
            boxes[comb[i][1]].classList.contains('o') &&
            boxes[comb[i][2]].classList.contains('o')) {
                setTimeout(()=> {
                    boxes[comb[i][0]].classList.add('activ');
                    boxes[comb[i][1]].classList.add('activ');
                    boxes[comb[i][2]].classList.add('activ');
                    result.innerText = 'Выиграли O';
                }, 500);
                game.removeEventListener('click', init);
            }

        else if(count == 9) {
            setTimeout(()=> {
                result.innerText = "Ничья";
                game.removeEventListener('click', init);
            }, 500);
        }
    }
}

buttonGame.addEventListener('click', newGame);
game.addEventListener('click', init);
