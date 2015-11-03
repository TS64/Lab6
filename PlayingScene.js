
var ctx;
var canvas;
var dieButtonImg = new Image();
var pauseButtonImg = new Image();
var bgPlayingImg = new Image();
var playerImg = new Image();
var playerSpriteFrame;
var dieButtonX;
var dieButtonY;
var pauseButtonX;
var pauseButtonY;
var bgScaleX;
var playerX;
var playerY;
function PlayingScene()
{
	dieButtonX = 800;
	dieButtonY = 0;
	pauseButtonX = 0;
	pauseButtonY = 0;
	playerSpriteFrame = 0;
	playerX = 200;
	playerY = 300;
}

PlayingScene.prototype = new Scene();

function initCanvas()
{
	canvas= document.createElement("canvas");
	ctx = canvas.getContext("2d");

	document.body.appendChild(canvas);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

PlayingScene.prototype.drawScene = function()
{
	playerSpriteFrame = playerSpriteFrame + 1;
	if (playerSpriteFrame >= 6)
		playerSpriteFrame = 0;
	console.log("Playing Scene drawn")
	dieButtonImg.src = "DieButton.png";
	pauseButtonImg.src = "PauseButton.png";
	bgPlayingImg.src = "BackgroundPlayingTemp.jpg"
	playerImg.src = "PlayerSprite.png"
	//dieButtonX = Math.round(canvas.width/2 - dieButtonImg.width/2);
	ctx.drawImage(bgPlayingImg, 0, 0, canvas.width, canvas.height);
	//(Image, StartClippingX, StartClippingY, ClipWidth, ClipHeight, xPosition, yPosition, widthOfImage, heightOfImage)
	ctx.drawImage(playerImg, playerSpriteFrame * 22, 0, 22, 44, playerX, playerY, 44, 88);
	ctx.drawImage(pauseButtonImg, pauseButtonX, pauseButtonY);
	ctx.drawImage(dieButtonImg, dieButtonX, dieButtonY);
}

PlayingScene.prototype.pauseGame = function(e) 
{
	var cursorX = e.clientX;
	var cursorY = e.clientY;
	if (cursorX > pauseButtonX && cursorX < pauseButtonX + pauseButtonImg.width && 
		cursorY > pauseButtonY && cursorY < pauseButtonY + pauseButtonImg.height &&
		currentSceneNum == 1)
	{
		currentSceneNum = 2;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
}

PlayingScene.prototype.killGame = function(e) 
{
	var cursorX = e.clientX;
	var cursorY = e.clientY;
	if (cursorX > dieButtonX && cursorX < dieButtonX + dieButtonImg.width && 
		cursorY > dieButtonY && cursorY < dieButtonY + dieButtonImg.height &&
		currentSceneNum == 1)
	{
		currentSceneNum = 3;
		gameOver = true;
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