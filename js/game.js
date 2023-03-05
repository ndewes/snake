document.addEventListener('DOMContentLoaded', function() {
    var canvas = document.getElementById("snakeField");
    var ctx = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;
    var cellWidth = 10;
    var cellHeight = 10;

        

    for(var i=0; i<width; i=i+cellWidth) {
        for(var j=0; j<height; j=j+cellHeight) {
            ctx.rect(i, j, cellWidth, cellHeight);
        }
    }
    ctx.stroke();

    var snake = [[250,250],[240,250],[230,250],[220,250]]

    function snakeElementPainting(x, y) {
        ctx.fillStyle = "lightgreen";
        ctx.fillRect(x, y, cellWidth, cellHeight);
    }

    function snakePainting() {
        for(var i=0; i<snake.length; i++) {
            snakeElementPainting(snake[i][0], snake[i][1]);
        }
    }

    var foodX;
    var foodY;
    var eaten = true;

    function foodPainting() {
        if(eaten) {
            foodX = Math.floor(Math.random()*width/cellWidth)*cellWidth;
            foodY = Math.floor(Math.random()*height/cellHeight)*cellHeight;
            eaten = false;
        }
        ctx.beginPath();
        ctx.arc(foodX+cellWidth/2, foodY+cellHeight/2, cellWidth/2, 0, Math.PI*2);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }

    function foodEaten() {
        if(foodX == snake[0][0] & foodY == snake[0][1]) {
            eaten = true;
            snake.push([0,0]);
        }
    }

    function end() {
        window.clearInterval(intervalID);
        ctx.font = "32px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("Game Over", width/2, height/2);
    }

    function gameOver() {
        if(snake[0][0] < 0 || snake[0][0] >= width || snake[0][1] < 0 || snake[0][1] >= height) {
            end();
        }
        for(var i=1; i<snake.length; i++) {
            if(snake[0][0] == snake[i][0] && snake[0][1] == snake[i][1]) {
                end();
            }
        }
    }

    var directX = 10;
    var directY = 0;

    function snakeMove() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, width, height);
        snake.pop()
        newHead = [snake[0][0]+directX, snake[0][1]+directY];
        snake.unshift(newHead);
        snakePainting();
        foodEaten();
        foodPainting();
        gameOver();
    }

    var intervalID = window.setInterval(snakeMove, 250);

    document.addEventListener('keydown', keyboardControl);
    function keyboardControl(event) {
        const keyLeft = 65;
        const keyRight = 68;
        const keyTop = 87;
        const keyBottom = 83;
        const keyESC = 27;
        var keyStroke = event.keyCode;
    
        if(keyStroke == keyLeft) {
            directX =- 10;
            directY = 0;
        }
        if(keyStroke == keyRight) {
            directX = 10;
            directY = 0;
        }
        if(keyStroke == keyTop) {
            directX = 0;
            directY =- 10;
        }
        if(keyStroke == keyBottom) {
            directX = 0;
            directY = 10;
        }
        if(keyStroke == keyESC) {
            window.clearInterval(intervalID)
        }
    
    }
});
