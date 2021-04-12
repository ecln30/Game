const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('.score')
const text = document.querySelector('.text')
const blockWidth =  100
const blockHeight = 20
const bordWidth = 560
const ballsize = 20
const bordHeight = 300

const userStart = [230, 10]
let currentPosition = userStart
let timer
let xDir = -2 
let yDir = 2
let score = 0

const ballStart = [270, 30]
let ballPosition = ballStart

// create element
function mkel(tag, className ){
    const el = document.createElement(tag)
    if(className)el.classList.add(className)
    return el
}

// draw the user 
class Block {
    constructor( x, y){
        this.bottomLeft = [x,y]
        this.bottomRight = [x + blockWidth, y]
        this.topLeft = [x , y + blockHeight]
        this.topRight = [x + blockWidth, y + blockHeight]
    }
}

const blocks = [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),
]    

function addBlock(){
    for (var s of blocks) {
        const block = document.createElement('div')
        block.classList.add('block') 
        block.style.left = s.bottomLeft[0] + 'px'
        block.style.bottom = s.bottomLeft[1] + 'px'
        grid.append(block)
    }
}

addBlock()

// add user

const user = mkel('div')
user.classList.add('user')
drawUser()
grid.append(user)

function drawUser(){
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

function drawBall(){
    ball.style.left = ballPosition[0] + "px"
    ball.style.bottom = ballPosition[1] + 'px'
}

// move user
function moveUser(e){
    switch(e.key) {
        case 'ArrowLeft':
            if(currentPosition[0] > 0)
            currentPosition[0] -= 10
            drawUser()
            break
        // case 'ArrowRight'
        case 'ArrowRight':
            if(currentPosition[0] < bordWidth - blockWidth)
            currentPosition[0] += 10
            drawUser()
            break
    }
}

document.addEventListener('keydown', moveUser)

const ball = mkel('div', 'ball')
drawBall()
grid.append(ball)

function moveBall(){
    ballPosition[0] += xDir 
    ballPosition[1] += yDir
    drawBall()
    checkForball()
}

// check for collisions
function checkForball(){
     //check for block collision
    for(let s in blocks ){
        if(ballPosition[0] > blocks[s].bottomLeft[0] && ballPosition[0] < blocks[s].bottomRight[0] && ballPosition[1] + ballsize > blocks[s].bottomLeft[1] && ballPosition[1] < blocks[s].topLeft[1] ){
            const allBlocks = Array.from (document.querySelectorAll('.block'))
            allBlocks[s].classList.remove('block')
            blocks.splice(s, 1)
            changeDir()
            score++
            scoreDisplay.innerHTML = "Score: " + score
            if(blocks.length == 0) {
                scoreDisplay.innerHTML = 'You Win'
                clearInterval(timer)
                document.removeEventListener('keydown', moveUser)
                setTimeout(e => scoreDisplay.innerHTML = '', 2000)
                grid.style.display = 'none'
                button.innerHTML = `Start Game`
                button.addEventListener('click', StartGame)
                setTimeout(e =>{ 
                    document.body.append(button)
                }, 3000)
                document.body.style.textAlign = 'center'
                document.body.style.display = 'flex'
                document.body.style.justifyContent = 'center'
                document.body.style.marginTop = '100px'
            }

            //check for win
        }
    }

    // check for wall collision
    if(ballPosition[0] >= (bordWidth - ballsize) || ballPosition[1] >= (bordHeight - ballsize) || ballPosition[0] <= 0)changeDir()

    //check for user collision
    if
    (
      (ballPosition[0] > currentPosition[0] && ballPosition[0] < currentPosition[0] + blockWidth) &&
      (ballPosition[1] > currentPosition[1] && ballPosition[1] < currentPosition[1] + blockHeight ) 
    ) changeDir()

    // check for game over
    if (ballPosition[1] <= 0) {
        clearInterval(timer)
        scoreDisplay.innerHTML = 'You lose'
        document.removeEventListener('keydown', moveUser)
        setTimeout(e => scoreDisplay.innerHTML = '', 2000)
        grid.style.display = 'none'
        button.innerHTML = `Start Game`
        button.addEventListener('click', StartGame)
        setTimeout(e =>{ 
            document.body.append(button)
        }, 3000)
        document.body.style.textAlign = 'center'
        document.body.style.display = 'flex'
        document.body.style.justifyContent = 'center'
        document.body.style.marginTop = '100px'
        
    }
}

timer = setInterval(moveBall, 30)

const button = mkel('button', 'start')
function StartGame(){
  window.location.reload(); 
}

function changeDir(){
    if(xDir === 2 && yDir === 2) return yDir = -2 
    if(xDir === 2 && yDir === -2) return xDir = -2 
    if(xDir === -2 && yDir === -2) return yDir = 2
    if(xDir === -2 && yDir === 2) return xDir = 2 
}
















