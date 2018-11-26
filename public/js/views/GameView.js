import BaseView from "./BaseView.js"
import Block from "../components/block/block.mjs"


export default class GameViewView extends BaseView {
    constructor(el) {
        super(el)
    }

    render() {
        this.el.clear()
        const logo = Block.Create("canvas", {
            "id": "myCanvas",
            "width": "1024",
            "height": "768"
        }, [])
        this.el.append(logo)
        let canvas = document.getElementById("myCanvas")
        let car = new Image()
        let enemy2 = new Image()
        let enemy3 = new Image()
        let enemy4 = new Image()
        let enemy = new Image()
        let enemy21 = new Image()
        let enemy22 = new Image()
        let enemy23 = new Image()
        let enemy24 = new Image()
        let img = ["../../img/textures/1.png", "../../img/textures/2.png", "../../img/textures/3.png"]
        let ctx = canvas.getContext("2d")
        let background = new Image()
        let paddleHeight = 50
        let paddleWidth = 50
        let paddleX = (canvas.width - paddleWidth) / 2
        let paddleY = (canvas.height) - 50
        let x = 0
        let x2 = canvas.width
        let y = canvas.height - 300
        let dx = 1
        let rightPressed = false
        let leftPressed = false
        let upPressed = false
        let downPressed = false
        let tick = 0
        let level = 1

        function drawPaddle() {
            ctx.drawImage(car, paddleX, paddleY)
            car.src = img[0]
        }

        function drawrect() {
            x += dx
            x2 -= dx
            ctx.drawImage(enemy, x, y)
            enemy.src = img[1]
            ctx.drawImage(enemy2, x - 200, y)
            enemy2.src = img[1]
            ctx.drawImage(enemy3, x - 400, y)
            enemy3.src = img[1]
            ctx.drawImage(enemy4, x - 600, y)
            enemy4.src = img[1]
            ctx.drawImage(enemy21, x2, y + 150)
            enemy21.src = img[2]
            ctx.drawImage(enemy22, x2 + 200, y + 150)
            enemy22.src = img[2]
            ctx.drawImage(enemy23, x2 + 400, y + 150)
            enemy23.src = img[2]
            ctx.drawImage(enemy24, x2 + 600, y + 150)
            enemy24.src = img[2]
            ctx.drawImage(enemy, x, y - 250)
            enemy.src = img[1]
            ctx.drawImage(enemy2, x - 200, y - 250)
            enemy2.src = img[1]
            ctx.drawImage(enemy3, x - 400, y - 250)
            enemy3.src = img[1]
            ctx.drawImage(enemy4, x - 600, y - 250)
            enemy4.src = img[1]
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(background, 0, 0)
            background.src = "../../img/textures/4.png"
            ctx.font = "30px Arial"
            ctx.fillStyle = "#ff0000"
            ctx.fillText("level: " + level, 20, 40)
            ctx.fillText("score: " + tick, 20, 100)
            if (x >= 1600) {
                x = 0
                x2 = canvas.width
            }
            console.log(x)
            drawrect()
            drawPaddle()
            if (((paddleX > x && paddleX < x + 60) || (paddleX > x - 200 && paddleX < x + 60 - 200) || (paddleX > x - 400 && paddleX < x + 60 - 400) || (paddleX > x - 600 && paddleX < x + 60 - 600)) && (paddleY < y + 60 && paddleY > y)) {
                alert("Конец игры. Ваш счет - " + tick)
                paddleX = (canvas.width - paddleWidth) / 2
                paddleY = (canvas.height) - 50
                tick = 0
                upPressed=false
                downPressed=false
                leftPressed=false
                rightPressed=false

     //document.location.reload()
            }
            if (((paddleX > x2 && paddleX < x2 + 60) || (paddleX > x2 + 200 && paddleX < x2 + 60 + 200) || (paddleX > x2 + 400 && paddleX < x2 + 60 + 400) || (paddleX > x2 + 600 && paddleX < x2 + 60 + 600)) && (paddleY < y + 60 + 150 && paddleY > y + 150)) {
                alert("Конец игры. Ваш счет - " + tick)
                paddleX = (canvas.width - paddleWidth) / 2
                paddleY = (canvas.height) - 50
                tick=0
                upPressed=false
                downPressed=false
                leftPressed=false
                rightPressed=false


                //document.location.reload()
                
            }
            if (((paddleX > x && paddleX < x + 60) || (paddleX > x - 200 && paddleX < x + 60 - 200) || (paddleX > x - 400 && paddleX < x + 60 - 400) || (paddleX > x - 600 && paddleX < x + 60 - 600)) && (paddleY < y + 60 - 250 && paddleY > y - 250)) {
                alert("Конец игры. Ваш счет - " + tick)
                paddleX = (canvas.width - paddleWidth) / 2
                paddleY = (canvas.height) - 50
                //document.location.reload()
                tick=0
                upPressed=false
                downPressed=false
                leftPressed=false
                rightPressed=false


            }

            if (rightPressed && paddleX < canvas.width - paddleWidth) {
                paddleX += 1
            } else if (leftPressed && paddleX > 0) {
                paddleX -= 1
            } else if (upPressed) {
                paddleY -= 1
                tick++

            } else if (downPressed && paddleY < canvas.height - paddleHeight) {
                paddleY += 1
            }
            if (paddleY === 0) {
                paddleY = (canvas.height)
                y = Math.floor(Math.random() * canvas.height) + 100
                level++
            }
        }

        document.addEventListener("keydown", keyDownHandler, false)
        document.addEventListener("keyup", keyUpHandler, false)
        function keyDownHandler(e) {
            if (e.keyCode === 39) {
                rightPressed = true
            } else if (e.keyCode === 37) {
                leftPressed = true
            } else if (e.keyCode === 38) {
                upPressed = true
            } else if (e.keyCode === 40) {
                downPressed = true
            }
        }

        function keyUpHandler(e) {
            if (e.keyCode === 39) {
                rightPressed = false
            } else if (e.keyCode === 37) {
                leftPressed = false
            } else if (e.keyCode === 38) {
                upPressed = false
            } else if (e.keyCode === 40) {
                downPressed = false
            }
        }
        setInterval(draw, 1)
    }
}
