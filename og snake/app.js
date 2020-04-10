document.addEventListener('DOMContentLoaded', () => {
    const squares=document.querySelectorAll('.grid div')
    const scoreDisplay=document.querySelector('span')
    const startBtn=document.querySelector('.start')

    const width=10
    let currentIndex=0 //first div in grid
    let foodIndex=0 //first div
    let currentSnake=[2,1,0] //size of snake at the start
    let direction=1
    let score=0
    let speed=0.9
    let intervalTime=0
    let interval=0

    //start/restart game
    function startGame(){
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[foodIndex].classList.remove('food')
        clearInterval(interval)
        score=0
        randomFood()
        direction=1
        scoreDisplay.innerText=score
        intervalTime=1000
        currentSnake=[2,1,0]
        currentIndex=0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval=setInterval(moveOutcomes, intervalTime)
    }

    //functions that deals with all snake outcomes
function moveOutcomes(){
    //snake hitting border
    if (
        (currentSnake[0] + width >= (width*width) && direction===width) ||  //if snake hits bottom
        (currentSnake[0] % width === width -1 && direction === 1) ||  //if snake hits right wall 
        (currentSnake[0] % width === 0 && direction === -1) ||  //if snake hits left wall 
        (currentSnake[0] - width < 0 && direction === -width) ||  //if snake hits top
        squares[currentSnake[0] + direction].classList.contains('snake')  //if snake kills itself
        ){
            return clearInterval(interval)  //will clear any interval
        }

        const tail = currentSnake.pop()  //removes last site of array 
        squares[tail].classList.remove('snake')  //removes class of snake from tail
        currentSnake.unshift(currentSnake[0] + direction)  //gives direction to head of array

    //snake getting food
    if(squares[currentSnake[0]].classList.contains('food')){
       squares[currentSnake[0]].classList.remove('food')
       squares[tail].classList.add('snake')
       currentSnake.push(tail)
       randomFood()
       score++
       scoreDisplay.textContent=score
       clearInterval(interval)
       intervalTime=intervalTime*speed
       interval=setInterval(moveOutcomes, intervalTime)
    }
    squares[currentSnake[0]].classList.add('snake')
}

    //generate new apple
    function randomFood(){
        do{
            foodIndex=Math.floor(Math.random() * squares.length)
        }
        while(squares[foodIndex].classList.contains('snake'))
        squares[foodIndex].classList.add('food')
    }

    //assign functions to keycodes
    function control(e){
        squares[currentIndex].classList.remove('snake')  
        if(e.keyCode === 39){
            direction = 1  //aim right
        }
        else if(e.keyCode === 38){
            direction = -width  //aim up
        }
        else if(e.keyCode === 37){
            direction = -1  //aim left
        }
        else if(e.keyCode === 40){
            direction = +width  //aim down
        }
    }

    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)
})