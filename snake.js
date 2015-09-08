var canvas = document.createElement("canvas");
var width = 512
var height = 480
console.log(width);
console.log(height);
canvas.width = width;
canvas.height = height;
var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, width, height);

function getRandInt(max) {
	return Math.floor(Math.random() * max);
}

var validDirections = [38, 40, 37, 39, 76, 72, 74, 75];

var snake = [];
var direction = 0;
var tailEnd = 0;
var blockSize = 10;
var food = [getRandInt(width), getRandInt(height)];

addEventListener("keydown", function(e) {
	direction = e.keyCode;
}, false);

var init = function() {
	snake.push([50, 50]);
	snake.push([55, 50]);
	snake.push([60, 50]);
}

var update = function(modifier) {
	if (direction == 38 || direction == 75) {
		// move up
		snake.unshift([snake[0][0], snake[0][1] - blockSize]);
	} else if (direction == 40 || direction == 74) {
		// move down
		snake.unshift([snake[0][0], snake[0][1] + blockSize]);
	} else if (direction == 37 || direction == 72) {
		// move left
		snake.unshift([snake[0][0] - blockSize, snake[0][1]]);
	} else if (direction == 39 || direction == 76){
		// move right
		snake.unshift([snake[0][0] + blockSize, snake[0][1]]);
	}

	if (foodInSnake(snake, food)) {
		console.log("snake got the food");
		ctx.fillStyle = "black";
		ctx.fillRect(food[0], food[1], blockSize, blockSize);
		while(foodInSnake(snake, food)) {
			// ensure food does not spawn in snake
			food = [getRandInt(width), getRandInt(height)];
		}
		tailEnd = 0;
	} else if (validDirections.indexOf(direction) != -1) {
		tailEnd = snake.pop();
	}
	console.log(snake);
}

var foodInSnake = function(snake, food) {
	for (var i = 0; i < snake.length; ++i) {
		if ((snake[i][0] <= food[0] + 5 && snake[i][0] >= food[0] - 5)
		   && (snake[i][1] <= food[1] + 5 && snake[i][1] >= food[1] - 5)) {
			return true;
		}
	}
	return false;
}

var render = function() {
	ctx.fillStyle = "white";
	ctx.fillRect(food[0], food[1], blockSize, blockSize);

	snake.forEach(function(current) {
		ctx.fillRect(current[0], current[1], blockSize, blockSize);
	});

	if (tailEnd != 0) {
		console.log(tailEnd);
		ctx.fillStyle = "black";
		ctx.fillRect(tailEnd[0], tailEnd[1], blockSize, blockSize);
	}
};

var main = function() {
	update();
	render();
	requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

init();
main();
