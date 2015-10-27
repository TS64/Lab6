
var ctx;
var canvas;
var dieButtonImg = new Image();
var pauseButtonImg = new Image();
var bgPlayingImg = new Image();
var dieButtonX;
var pauseButtonX;
var pauseButtonY;
function PlayingScene()
{
	
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
	ctx.save();
	ctx.fillStyle = "white";
	ctx.font = "italic 40pt Calibri";
	ctx.textBaseline = "top";
	ctx.fillText("This is the playing scene.", 0, 0);
	ctx.restore();
	console.log("Title Scene drawn")
	dieButtonImg.src = "DieButton.png";
	pauseButtonImg.src = "PauseButton.png";
	bgPlayingImg.src = "BackgroundPlayingTemp.jpg"
	dieButtonX = Math.round(canvas.width/2 - dieButtonImg.width/2);
	pauseButtonX = 0;
	pauseButtonY = 0;
	ctx.drawImage(bgPlayingImg, 0, 0, canvas.width, canvas.height);
	ctx.drawImage(pauseButtonImg, pauseButtonX, pauseButtonY);
	ctx.drawImage(dieButtonImg, dieButtonX, 100);
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
		cursorY > 100 && cursorY < 100 + dieButtonImg.height &&
		currentSceneNum == 1)
	{
		currentSceneNum = 3;
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