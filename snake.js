const gameBoard = document.getElementById('gameBoard');
const ctx = gameBoard.getContext('2d');
const resetButton = document.getElementById('button');
const scoreText = document.getElementById('scoreText');
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
let score = 0
const unitSize = 25;
const backgroundColor = 'lightgreen'
const snakeColor = 'lightblue'
const snakeOutline = 'midnightblue'
const snake = [
    {x:unitSize*3, y:0},
    {x:unitSize*2, y:0},
    {x:unitSize, y:0},
    {x:0 ,y:0}
    ]
let velocityX = unitSize;
let velocityY = 0;
let movement = 'right'
let foodX;
let foodY;
let foodColor = 'red'
let running = false;

document.addEventListener('keydown',changeDirection) 

startGame()

function startGame(){
    running = true;
    scoreText.textContent = score
    nextTick()
    createFood()
    drawFood()
    drawSnake()
    
}

function createFood(){
    randomIndex1 = Math.floor(Math.random()*gameHeight/unitSize)*unitSize
    randomIndex2 = Math.floor(Math.random()*gameHeight/unitSize)*unitSize
    foodX = randomIndex1 
    foodY = randomIndex2
    const pom = `Coordinate is ${foodX},${foodY}`
    console.log(pom)
}

function drawFood(){
    ctx.fillStyle = foodColor
    ctx.fillRect(foodX,foodY,unitSize,unitSize)
}

function nextTick(){
    if(running){
        setTimeout(function(){
            clearBoard()
            drawFood();
            drawSnake()
            nextTick();
            moveSnake(); 
            checkGameOver() 
        }
        , 100);
    }
    else{
        displayGameOver();
    }
}

function clearBoard(){
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0,0,gameWidth,gameHeight)
    ctx.strokeStyle = 'darkgreen'
    ctx.lineWidth = 10
    ctx.strokeRect(0,0,gameWidth,gameHeight)
}

function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeOutline;
    ctx.lineWidth = 4;
    snake.forEach(function(snakePart){
        ctx.fillRect(snakePart.x,snakePart.y,unitSize,unitSize)
        ctx.strokeRect(snakePart.x,snakePart.y,unitSize,unitSize)
    })
}

function moveSnake(){
    const head = {x: snake[0].x + velocityX , y: snake[0].y + velocityY} 
    snake.unshift(head);


    if(snake[0].x === foodX && snake[0].y ===foodY){
        console.log('Food is eaten')
        score++
        scoreText.textContent = score
        createFood()

    }
    else{
        snake.pop()
    }
}

function changeDirection(event){
    const keyy = event.key
    console.log(keyy)

    if(keyy ==='ArrowLeft' && velocityX !== unitSize ){
        velocityX = -unitSize
        velocityY = 0
    }
    if(keyy ==='ArrowUp' && velocityY !== unitSize ){
        velocityX = 0
        velocityY = -unitSize
    }
    if(keyy ==='ArrowRight' && velocityX !== -unitSize){
        velocityX = unitSize
        velocityY = 0
    }
    if(keyy ==='ArrowDown' && velocityY !== -unitSize){
        velocityX = 0
        velocityY = unitSize
    }
    /*
    if(keyy === 'ArrowLeft' && movement !== 'right'){
        movement = 'left'
        snake[0].x -= unitSize 
    }
    if(keyy === 'ArrowUp' && movement !== 'down'){
        movement = 'up'
        snake[0].y += unitSize 
    }
    if(keyy === 'ArrowRight' && movement !== 'left'){
        snake[0].x += unitSize 
    }
    if(keyy === 'ArrowDown' && movement !== 'up'){
        snake[0].y -= unitSize 
    }*/
}

function checkGameOver(){
    if(snake[0].x< 0 || snake[0].x >gameWidth|| snake[0].y< 0 || snake[0].y > gameHeight){
        running = false;
    }

    for(let i = 1 ; i < snake.length ; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            running = false
        }
    }
 
}

function displayGameOver(){
    ctx.font = '50px monospace'
    ctx.fillStyle = 'black'

    ctx.textAlign = 'center'
    ctx.fillText('You Lost',gameWidth/2,gameHeight/2)
}

resetButton.onclick = function(){
    location.reload()
}

document.addEventListener('keydown', function(event){
    if(event.key === 'Enter'){
	location.reload()
    }
    else return
}