const grid = [20, 20];

let snake = [];
let x = 9;
let y = 7;
let offsetX = 0;
let offsetY = 0;
let direccion = 'ArrowRight';

let manzana;
let manzanaX = 3;
let manzanaY = 3;

let puntos = 0;
let record = 0;

let gameOver = false;

window.onload = () => {
    
    window.board = document.getElementById('game_board');
    window.mostrarGameOver = document.getElementById('game_over');
    window.rejugar = document.getElementById('rejugar');
    
    window.mostrarPtos = document.getElementById('ptos');
    window.mostrarHi = document.querySelector('.score_board hi');

    //snake[0] = document.getElementById('snake');
    
    snake.push(document.getElementById('snake')); //lo mismo que arriba
    manzana = document.getElementById('manzana');

    setInterval(() => {
        if (!gameOver) {
            x += offsetX;
            y += offsetY;

            for (let i = snake.length -1; i > 0; i --) {
                snake[i].style.gridArea = snake[i-1].style.gridArea
            }

            let newPos = `${y}/${x}`;
            snake[0].style.gridArea = newPos;

            let autoColision = checkAutoColision();

            if (x > grid[0] || x < 1 || y > grid[1] || y < 1 || autoColision) {
                gameOver = true;
                board.style.display = 'none';
                mostrarGameOver.style.display = 'grid';
            }
            
            if (x === manzanaX && y === manzanaY) {
                //console.log('colision');
                manzanaX = Math.floor(Math.random() * grid[0]) +1;
                manzanaY = Math.floor(Math.random() * grid[1]) +1;
                manzana.style.gridArea = `${manzanaY}/${manzanaX}`;
                
                creaNuevoSegmento('div', 'class', 'sprite snake', newPos);
                
                puntos ++;
                mostrarPtos.innerHTML = `Puntos: ${puntos}`;
                
            }
        }
    }, 175);
}

function checkAutoColision() { 
    for (let i = 1; i < snake.length; i ++) {
        if (snake[i].style.gridArea === snake[0].style.gridArea) {
            return true
        }
    }
    return false;
}

function creaNuevoSegmento(tipoELemento, attr, nombreAttr, newPos) {
    let nuevoSegmento = document.createElement(tipoELemento);
    nuevoSegmento.setAttribute(attr, nombreAttr);
    nuevoSegmento.style.gridArea = newPos;
    board.appendChild(nuevoSegmento);
    snake.push(nuevoSegmento);
}

document.addEventListener('keydown', (event) => {
   // console.log(event, event.key);
    
    let leerTecladoArray = {
        ArrowUp: [0, -1, 'ArrowDown'],
        ArrowDown: [0, 1, 'ArrowUp'],
        ArrowLeft: [-1, 0, 'ArrowRight'],
        ArrowRight: [1, 0, 'ArrowLeft'] 
    };
    
    let teclaPulsada = event.key;

    if (Object.keys(leerTecladoArray).includes(teclaPulsada)) {

        if (direccion != leerTecladoArray[teclaPulsada][2]) {
            offsetX = leerTecladoArray[teclaPulsada][0];
            offsetY = leerTecladoArray[teclaPulsada][1];
            direccion = teclaPulsada;
        }
    }

    if (teclaPulsada === 'Enter' && gameOver) location.reload();
});


document.addEventListener('click', (event) => {
    console.log(event.target.id);
    
    let clicksArray = {
        up: [0, -1, 'do', 'do2'],
        do: [0, 1, 'up', 'up2'],
        le: [-1, 0, 'ri', 'ri2'],
        ri: [1, 0, 'le', 'le2'], 
        up2: [0, -1, 'do', 'do2'],
        do2: [0, 1, 'up', 'up2'],
        le2: [-1, 0, 'ri', 'ri2'],
        ri2: [1, 0, 'le', 'le2'] 
    };
    
    let clickboton = event.target.id;

    if (Object.keys(clicksArray).includes(clickboton)) {

        if (direccion != clicksArray[clickboton][2] && direccion != clicksArray[clickboton][3]) {
            offsetX = clicksArray[clickboton][0];
            offsetY = clicksArray[clickboton][1];
            direccion = clickboton
        }
    }

    if (clickboton === 'rejugar' ) location.reload();
});

