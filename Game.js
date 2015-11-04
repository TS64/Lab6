//var menuScene;
var ctx;
var canvas;
var data;
var currentFrame;
var currentFrameSlow;
var playerX;
var playerY;
var playerImg1 = new Image();
var playerImg2 = new Image();
var playerImg = new Image();
var now;
var dt;
var lastUpdate;
var game;
var delay;
var lastUpdate = Date.now();
function Game()
{
	canvas= document.createElement("canvas");
	ctx = canvas.getContext("2d");

	document.body.appendChild(canvas);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	playerImg.src = "PlayerSprite.png";
	currentFrame = 0;
	currentFrameSlow = 0;
	playerX = 50;
	playerY = 100;
	delay = 150;
	loadAnimationMetadata("Lab6Data.json");
}

function init()
{
	
}

Game.prototype.gameLoop = function()
{
	window.requestAnimationFrame(game.gameLoop);
	game.draw();
}

Game.prototype.draw = function()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	game.getCurrentFrame();
	game.drawFromSheet();
	game.drawFromJSON();
}

function loadAnimationMetadata(filename)
{
	var jsonfile = new XMLHttpRequest();
         
        jsonfile.open("GET", filename, true);
     
    //when the message comes back from the server this function is called
    jsonfile.onreadystatechange = function() {
        if (jsonfile.readyState == 4) {
            if (jsonfile.status == 200) {
                 
                //data now contains the data from your json file
                data = JSON.parse(jsonfile.responseText);
            }
 
        }
    };   
    //This sends the request
    jsonfile.send(null);
    console.log("JSON loaded");
}

Game.prototype.drawFromSheet = function()
{
	ctx.drawImage(playerImg, currentFrame * 22, 0, 22, 44, playerX, playerY, 44, 88);
	ctx.drawImage(playerImg, currentFrameSlow * 22, 0, 22, 44, playerX + 100, playerY, 44, 88);
}

Game.prototype.drawFromJSON = function()
{
	playerImg1.src = data.frames[currentFrame].filename;
	playerImg2.src = data.frames[currentFrameSlow].filename;
	ctx.drawImage(playerImg1, 0, 0, 44, 88);
	ctx.drawImage(playerImg2, 100, 0, 44, 88);
}

Game.prototype.getCurrentFrame = function()
{
	var now = Date.now();
	var dt = now - lastUpdate;
	
	if (dt > delay)
	{
		currentFrameSlow++;
		dt = 0;
		lastUpdate = now;
		if (currentFrameSlow >= 3)
			currentFrameSlow = 0;
	}
	currentFrame++;
	if (currentFrame >= 3)
		currentFrame = 0;
	console.log(currentFrameSlow);
}
/*function for rgb for convenience*/
/*function rgb(r, g, b) 
{ 
	return 'rgb('+clamp(Math.round(r),0,255)+', '+clamp(Math.round(g),0,255)+', '+clamp(Math.round(b),0,255)+')';
}

/*helper function
function clamp(value, min, max)
{ 
	if(max<min) { 
		var temp = min; 
		min = max; 
		max = temp; 
	}
	return Math.max(min, Math.min(value, max)); 
}*/