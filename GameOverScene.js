
var ctx;
var canvas;
var retryButtonImg = new Image();
var retryButtonX;
function GameOverScene()
{
	
}

function initCanvas()
{
	canvas= document.createElement("canvas");
	ctx = canvas.getContext("2d");

	document.body.appendChild(canvas);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

GameOverScene.prototype.drawScene = function()
{
	console.log("Game Over Scene drawn")
	retryButtonImg.src = "RetryButton.png";
	retryButtonX = Math.round(canvas.width/2 - retryButtonImg.width/2);
	ctx.drawImage(retryButtonImg, retryButtonX, 50);
}

GameOverScene.prototype.retryGame = function(e) 
{
	var cursorX = e.clientX;
	var cursorY = e.clientY;
	if (cursorX > retryButtonX && cursorX < retryButtonX + retryButtonImg.width && 
		cursorY > 50 && cursorY < 50 + retryButtonImg.height &&
		currentSceneNum == 3)
	{
		currentSceneNum = 1;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
}

/*function for rgb for convenience*/
function rgb(r, g, b) 
{ 
	return 'rgb('+clamp(Math.round(r),0,255)+', '+clamp(Math.round(g),0,255)+', '+clamp(Math.round(b),0,255)+')';
}

/*helper function*/
function clamp(value, min, max)
{ 
	if(max<min) { 
		var temp = min; 
		min = max; 
		max = temp; 
	}
	return Math.max(min, Math.min(value, max)); 
}