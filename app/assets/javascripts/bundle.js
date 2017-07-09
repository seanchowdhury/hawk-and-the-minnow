/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Player {
  constructor(xPos, yPos) {

    document.addEventListener('keydown', this._handleKeyDown.bind(this), false);
    document.addEventListener('keyup', this._handleKeyUp.bind(this), false);

    this._jump = this._jump.bind(this);

    this.isStopped = true;
    this.rightBlocked = false;
    this.leftBlocked = false;
    this.enteringWater = false;
    this.isDiving = false;
    this.inWater = false;
    this.color = "rgb(255, 106, 7)";
    this.trailColor = 'rgba(0, 0, 0';
    this.maxMoveSpeed = 4;
    this.moveSpeed = 0.9;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.terminalVelocity = 20;
    this.leftPressed = false;
    this.rightPressed = false;
    this.upPressed = false;
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = 11;
    this.height = 11;
  }

  update() {
    if (this.inWater) {
      this.color = "rgb(209, 255, 94)";
      this.trailColor = 'rgba(255, 106, 7';
      this._float();
    } else if (!this.isStopped) {
      this._fall();
      this.color = "rgb(255, 106, 7)";
      this.trailColor = 'rgba(0, 0, 0';
    }


  }

  xMove() {
    this.xSpeed = this.xSpeed * 0.9;

    if ((this.rightBlocked && this.xSpeed > 0) || (this.leftBlocked && this.xSpeed < 0)) {
      this.xSpeed = 0;
    }


    if(this.rightPressed && this.xSpeed < this.maxMoveSpeed && !this.rightBlocked) {
      this.xSpeed += this.moveSpeed
    }

    if(this.leftPressed && this.xSpeed > this.maxMoveSpeed * -1 && !this.leftBlocked) {
      this.xSpeed -= this.moveSpeed
    }

    this.rightBlocked = false;
    this.leftBlocked = false;
    this.xPos += this.xSpeed
  }

  // PRIVATE


  _jump() {
    if(this.isStopped) {
      this.ySpeed = -7;
      this.isStopped = false;
    }
  }

  _fall() {
    if (this.ySpeed < this.terminalVelocity) {
      this.ySpeed += .5;
    }
    this.yPos += this.ySpeed
  }

  _float() {
    if (this.ySpeed > this.terminalVelocity * -1) {
      this.ySpeed -= .5;
    }
    this.yPos += this.ySpeed
  }

  _handleKeyDown(e) {
    switch(e.keyCode) {
      case 37:
        this.leftPressed = true;
        break;
      case 38:
        this._jump();
        break;
      case 39:
        this.rightPressed = true;
        break;
      case 90:
        if (!this.isStopped) {
          this.isDiving = true;
        }
        break;
    }
  }

  _handleKeyUp(e) {
    switch(e.keyCode) {
      case 37:
        this.leftPressed = false;
        break;
      case 39:
        this.rightPressed = false;
        break;
      case 90:
        this.isDiving = false;
        break;
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Player);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Platform {
  constructor(xPos, yPos, width, height) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
  }


}

/* harmony default export */ __webpack_exports__["a"] = (Platform);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var Rainbow = __webpack_require__(5);
var myRainbow = new Rainbow();

class Exit {
  constructor(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.rainbowCounter = 0;
    this.incrementer = 1;
    this.color = myRainbow.colourAt(this.rainbowCounter);
    this.width = 20;
    this.height = 20;
    this.borderColor = myRainbow.colourAt(Math.abs(100 - this.rainbowCounter));
  }

  update() {
    this._swapColor();
  }

  // PRIVATE

  _swapColor() {
    if (this.rainbowCounter === 0){
      this.incrementer = 1;
    } else if (this.rainbowCounter === 100) {
      this.incrementer = -1;
    }
    this.rainbowCounter += this.incrementer;
    this.color = myRainbow.colourAt(this.rainbowCounter);
    this.borderColor = myRainbow.colourAt(Math.abs(100 - this.rainbowCounter));
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Exit);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_game__ = __webpack_require__(4);


const thanksWill = new Audio('app/assets/sounds/seansong.mp3');
thanksWill.volume = .5;
if (typeof thanksWill.loop == 'boolean')
{
    thanksWill.loop = true;
}
else
{
    thanksWill.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
}

const background = new Image();
background.src = "app/assets/images/clouds1.jpg";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas")
  const ctx = canvas.getContext("2d")
  background.onload = () => { ctx.drawImage(background, 0, 0) };


    document.getElementById('mute').addEventListener('click', (e) => {
      if ( thanksWill.muted ) {
        __WEBPACK_IMPORTED_MODULE_0__lib_game__["d" /* splashAudio */].muted = false;
        __WEBPACK_IMPORTED_MODULE_0__lib_game__["b" /* deathAudio */].muted = false;
        __WEBPACK_IMPORTED_MODULE_0__lib_game__["a" /* completeAudio */].muted = false;
        thanksWill.muted = false;
        e.target.src = "app/assets/images/Icons8-Windows-8-Media-Controls-Volume-Up.ico"
      }
      else {
        __WEBPACK_IMPORTED_MODULE_0__lib_game__["d" /* splashAudio */].muted = true;
        __WEBPACK_IMPORTED_MODULE_0__lib_game__["b" /* deathAudio */].muted = true;
        __WEBPACK_IMPORTED_MODULE_0__lib_game__["a" /* completeAudio */].muted = true;
        thanksWill.muted = true;
        e.target.src = "app/assets/images/Icons8-Windows-8-Media-Controls-Mute.ico"
      }
  })


  const startGame = (e) => {
    if (e.keyCode === 13) {
      document.removeEventListener('keydown', startGame);
      __WEBPACK_IMPORTED_MODULE_0__lib_game__["c" /* game */]();
      thanksWill.play();
      document.getElementById('start').style.display = 'none';
      const titleCard = document.getElementById('title');
      titleCard.style.opacity = '1';
      fade(titleCard);
    }
  }

  document.addEventListener('keydown', startGame)
})

const fade = (el) => {
    let op = 1;
    let fader = 0.006;
    const timer = setInterval(() => {
        if (op <= 0.1){
            clearInterval(timer);
            el.style.display = 'none';
        } else if (op <= 0.6) {
          fader = 0.1;
        }
        el.style.opacity = op;
        el.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * fader;
    }, 50);
}

function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}

window.addEventListener("keydown", function(e) {
if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
}
}, false);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__platform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__exit__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__levelCreateUtil__ = __webpack_require__(6);





function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }

  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }

}

const splashAudio = new Audio('app/assets/sounds/splash2.wav');
/* harmony export (immutable) */ __webpack_exports__["d"] = splashAudio;

splashAudio.volume = 0.15;
const deathAudio = new Audio('app/assets/sounds/deathsound.wav');
/* harmony export (immutable) */ __webpack_exports__["b"] = deathAudio;

deathAudio.volume = 0.4;
const completeAudio = new Audio('app/assets/sounds/levelcomplete2.wav');
/* harmony export (immutable) */ __webpack_exports__["a"] = completeAudio;

completeAudio.volume = .4;

const game = () => {
  const canvas = document.getElementById("canvas")
  const ctx = canvas.getContext("2d")
  const background = new Image();
  background.src = "app/assets/images/clouds1.jpg";
  background.onload = () => {
    var ptrn = ctx.createPattern(background, 'repeat-x');
    ctx.fillStyle = ptrn;
  }
  const clamp = (value, min, max) => {
    if(value < min) return min;
    else if(value > max) return max;
    return value;
  }
  let vx = 0;

  const platformColor = 'rgb(19, 44, 86)'

  let levelCounter = 1;
  let level = __WEBPACK_IMPORTED_MODULE_3__levelCreateUtil__["a" /* levels */][levelCounter];
  let player = level.player;
  let exit = level.exit;
  let platformArray = level.platformArray;
  let renderArray = level.renderArray;
  let showHelp = false;

  const renderLevel = () => {
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background,vx,0);
    ctx.drawImage(background, background.width-Math.abs(vx), 0);
    if (Math.abs(vx) > background.width) {
      vx = 0;
    }
    vx -= 0.1;
    var camX = clamp(-player.xPos + canvas.width/2, 0, 2000 - canvas.width);
    var camY = clamp(-player.yPos + canvas.height/2, 0, 2000 - canvas.height);

    ctx.translate( camX, camY );
    ctx.font="15px Press-Start-2P";
    ctx.fillStyle = "black";

    if (levelCounter === 0) {
      ctx.fillText("Use the left and right arrow keys to move.",-140,400);
      ctx.fillText("Press the up arrow key to jump.", 170, 100);
    }
    if (levelCounter === 1) {
      ctx.fillText("You can leap over the highest obstacles! I believe in you!", -400, 100)
      if (player.xPos >= 438) {
        window.setTimeout( () => {
          showHelp = true;
        }, 3000)
      }
      if (showHelp === true) {
        ctx.fillText("Sorry you were tricked...", 325, 375)
        ctx.fillText("Try holding the 'Z' key while in air/jumping,", 325, 400)
        ctx.fillText("and dive into the water!", 325, 425)
      }
    }
    ctx.fillStyle = "rgba(0, 75, 150, .8)";
    ctx.lineWidth = 2;
    if (player.inWater) {
      ctx.strokeStyle = `#${exit.color}`;
    } else {
      ctx.strokeStyle = 'white';
    }
    renderArray.forEach((platform) => {
      roundRect(ctx, platform[0], platform[1], platform[2], platform[3], 10, platformColor, platform[4])
    })
    ctx.fillStyle = player.color;
    ctx.fillRect(player.xPos, player.yPos, player.width, player.height);
    ctx.fillStyle = `#${exit.color}`;
    ctx.lineWidth=5;
    ctx.strokeStyle = `#${exit.borderColor}`;
    roundRect(ctx, exit.xPos, exit.yPos, exit.width, exit.height, 10, exit.color, exit.borderColor);
  }

  window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000/60);
    };
  })();

  const yCollisionCheck = () => {
    platformArray.some((platform) => {
      if (player.xPos+player.width > platform.xPos && player.xPos < platform.xPos + platform.width){
        if (player.yPos <= platform.yPos + platform.height && player.yPos > platform.yPos + (platform.height/2)) {
          player.yPos = platform.yPos + platform.height;
          player.ySpeed = 1;
          return true;
        }
        if (player.yPos+player.height >= platform.yPos) {
          if(player.yPos > platform.yPos+platform.height) {
            player.isStopped = false;
            return false;
          } else {
            player.isStopped = true;
            player.yPos = platform.yPos - player.height;
            player.ySpeed = 0;
            return true;
          }
        }
      } else {
        player.isStopped = false;
        return false;
      }
    })
  }

  const xCollisionCheck = () => {
    platformArray.some((platform) => {
      if (player.yPos+player.height > platform.yPos && player.yPos < platform.yPos + platform.height){
        if(player.xPos + player.width + 3 >= platform.xPos && player.xPos < platform.xPos + platform.width){
          player.xPos = platform.xPos - player.width;
          player.rightBlocked = true;
        }
        if(player.xPos <= platform.xPos + platform.width + 3 && player.xPos + player.width > platform.xPos){
          player.xPos = platform.xPos + platform.width;
          player.leftBlocked = true;
        }
      }
    })
  }

  const divingCollisionCheck = () => {
    platformArray.some((platform) => {
      if (player.xPos + player.width >= platform.xPos && player.xPos <= platform.xPos + platform.width ) {
        if (player.yPos+player.height >= platform.yPos && player.yPos < platform.yPos + platform.height) {
          splashAudio.play();
          player.inWater = true;
          return true;
        }
        player.inWater = false;
      }

    })
  }

  const breachingCollisionCheck = () => {
    platformArray.some((platform) => {
      if (player.xPos + player.width >= platform.xPos && player.xPos <= platform.xPos + platform.width ) {
        if (player.yPos + player.height >= platform.yPos && player.yPos < platform.yPos + platform.height) {
          player.inWater = true;
          return true;
        }
      }
      player.inWater = false;
    })
  }

  const checkFinishLevel = () => {
    if (player.xPos + player.width > exit.xPos && player.xPos <= exit.xPos + exit.width ) {
      if (player.yPos + player.height >= exit.yPos && player.yPos < exit.yPos + exit.height) {
        completeAudio.play();
        level = __WEBPACK_IMPORTED_MODULE_3__levelCreateUtil__["a" /* levels */][levelCounter += 1]
        player = level.player;
        exit = level.exit;
        platformArray = level.platformArray;
        renderArray = level.renderArray;
        player.xSpeed = 0;
        player.ySpeed = 0;
        showHelp = false;
        if (levelCounter === 1) {
          document.getElementById('subtitle').style.display = 'block';
        }
      }
    }
  }

  const update = () => {
    player.xMove();
    if (player.inWater){
      player.update();
      breachingCollisionCheck();
    } else {
      if(!player.isDiving){
        xCollisionCheck();
      }

      player.update();
      exit.update();
      if (!player.isDiving) {
        yCollisionCheck();
      } else {
        divingCollisionCheck();
      }
    }
    checkBounds();
    checkFinishLevel();
    renderLevel();
    requestAnimFrame(() => {
      update();
    })
  }

  const checkBounds = () => {
    if (player.yPos > 1200) {
      deathAudio.play();
      player.xPos = level.playerRespawn[0];
      player.yPos = 200;
      player.ySpeed = 0;
    }
  }
  update();
}
/* harmony export (immutable) */ __webpack_exports__["c"] = game;



/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*
RainbowVis-JS 
Released under Eclipse Public License - v 1.0
*/

function Rainbow()
{
	"use strict";
	var gradients = null;
	var minNum = 0;
	var maxNum = 100;
	var colours = ['ff0000', 'ffff00', '00ff00', '0000ff']; 
	setColours(colours);
	
	function setColours (spectrum) 
	{
		if (spectrum.length < 2) {
			throw new Error('Rainbow must have two or more colours.');
		} else {
			var increment = (maxNum - minNum)/(spectrum.length - 1);
			var firstGradient = new ColourGradient();
			firstGradient.setGradient(spectrum[0], spectrum[1]);
			firstGradient.setNumberRange(minNum, minNum + increment);
			gradients = [ firstGradient ];
			
			for (var i = 1; i < spectrum.length - 1; i++) {
				var colourGradient = new ColourGradient();
				colourGradient.setGradient(spectrum[i], spectrum[i + 1]);
				colourGradient.setNumberRange(minNum + increment * i, minNum + increment * (i + 1)); 
				gradients[i] = colourGradient; 
			}

			colours = spectrum;
		}
	}

	this.setSpectrum = function () 
	{
		setColours(arguments);
		return this;
	}

	this.setSpectrumByArray = function (array)
	{
		setColours(array);
		return this;
	}

	this.colourAt = function (number)
	{
		if (isNaN(number)) {
			throw new TypeError(number + ' is not a number');
		} else if (gradients.length === 1) {
			return gradients[0].colourAt(number);
		} else {
			var segment = (maxNum - minNum)/(gradients.length);
			var index = Math.min(Math.floor((Math.max(number, minNum) - minNum)/segment), gradients.length - 1);
			return gradients[index].colourAt(number);
		}
	}

	this.colorAt = this.colourAt;

	this.setNumberRange = function (minNumber, maxNumber)
	{
		if (maxNumber > minNumber) {
			minNum = minNumber;
			maxNum = maxNumber;
			setColours(colours);
		} else {
			throw new RangeError('maxNumber (' + maxNumber + ') is not greater than minNumber (' + minNumber + ')');
		}
		return this;
	}
}

function ColourGradient() 
{
	"use strict";
	var startColour = 'ff0000';
	var endColour = '0000ff';
	var minNum = 0;
	var maxNum = 100;

	this.setGradient = function (colourStart, colourEnd)
	{
		startColour = getHexColour(colourStart);
		endColour = getHexColour(colourEnd);
	}

	this.setNumberRange = function (minNumber, maxNumber)
	{
		if (maxNumber > minNumber) {
			minNum = minNumber;
			maxNum = maxNumber;
		} else {
			throw new RangeError('maxNumber (' + maxNumber + ') is not greater than minNumber (' + minNumber + ')');
		}
	}

	this.colourAt = function (number)
	{
		return calcHex(number, startColour.substring(0,2), endColour.substring(0,2)) 
			+ calcHex(number, startColour.substring(2,4), endColour.substring(2,4)) 
			+ calcHex(number, startColour.substring(4,6), endColour.substring(4,6));
	}
	
	function calcHex(number, channelStart_Base16, channelEnd_Base16)
	{
		var num = number;
		if (num < minNum) {
			num = minNum;
		}
		if (num > maxNum) {
			num = maxNum;
		} 
		var numRange = maxNum - minNum;
		var cStart_Base10 = parseInt(channelStart_Base16, 16);
		var cEnd_Base10 = parseInt(channelEnd_Base16, 16); 
		var cPerUnit = (cEnd_Base10 - cStart_Base10)/numRange;
		var c_Base10 = Math.round(cPerUnit * (num - minNum) + cStart_Base10);
		return formatHex(c_Base10.toString(16));
	}

	function formatHex(hex) 
	{
		if (hex.length === 1) {
			return '0' + hex;
		} else {
			return hex;
		}
	} 
	
	function isHexColour(string)
	{
		var regex = /^#?[0-9a-fA-F]{6}$/i;
		return regex.test(string);
	}

	function getHexColour(string)
	{
		if (isHexColour(string)) {
			return string.substring(string.length - 6, string.length);
		} else {
			var name = string.toLowerCase();
			if (colourNames.hasOwnProperty(name)) {
				return colourNames[name];
			}
			throw new Error(string + ' is not a valid colour.');
		}
	}
	
	// Extended list of CSS colornames s taken from
	// http://www.w3.org/TR/css3-color/#svg-color
	var colourNames = {
		aliceblue: "F0F8FF",
		antiquewhite: "FAEBD7",
		aqua: "00FFFF",
		aquamarine: "7FFFD4",
		azure: "F0FFFF",
		beige: "F5F5DC",
		bisque: "FFE4C4",
		black: "000000",
		blanchedalmond: "FFEBCD",
		blue: "0000FF",
		blueviolet: "8A2BE2",
		brown: "A52A2A",
		burlywood: "DEB887",
		cadetblue: "5F9EA0",
		chartreuse: "7FFF00",
		chocolate: "D2691E",
		coral: "FF7F50",
		cornflowerblue: "6495ED",
		cornsilk: "FFF8DC",
		crimson: "DC143C",
		cyan: "00FFFF",
		darkblue: "00008B",
		darkcyan: "008B8B",
		darkgoldenrod: "B8860B",
		darkgray: "A9A9A9",
		darkgreen: "006400",
		darkgrey: "A9A9A9",
		darkkhaki: "BDB76B",
		darkmagenta: "8B008B",
		darkolivegreen: "556B2F",
		darkorange: "FF8C00",
		darkorchid: "9932CC",
		darkred: "8B0000",
		darksalmon: "E9967A",
		darkseagreen: "8FBC8F",
		darkslateblue: "483D8B",
		darkslategray: "2F4F4F",
		darkslategrey: "2F4F4F",
		darkturquoise: "00CED1",
		darkviolet: "9400D3",
		deeppink: "FF1493",
		deepskyblue: "00BFFF",
		dimgray: "696969",
		dimgrey: "696969",
		dodgerblue: "1E90FF",
		firebrick: "B22222",
		floralwhite: "FFFAF0",
		forestgreen: "228B22",
		fuchsia: "FF00FF",
		gainsboro: "DCDCDC",
		ghostwhite: "F8F8FF",
		gold: "FFD700",
		goldenrod: "DAA520",
		gray: "808080",
		green: "008000",
		greenyellow: "ADFF2F",
		grey: "808080",
		honeydew: "F0FFF0",
		hotpink: "FF69B4",
		indianred: "CD5C5C",
		indigo: "4B0082",
		ivory: "FFFFF0",
		khaki: "F0E68C",
		lavender: "E6E6FA",
		lavenderblush: "FFF0F5",
		lawngreen: "7CFC00",
		lemonchiffon: "FFFACD",
		lightblue: "ADD8E6",
		lightcoral: "F08080",
		lightcyan: "E0FFFF",
		lightgoldenrodyellow: "FAFAD2",
		lightgray: "D3D3D3",
		lightgreen: "90EE90",
		lightgrey: "D3D3D3",
		lightpink: "FFB6C1",
		lightsalmon: "FFA07A",
		lightseagreen: "20B2AA",
		lightskyblue: "87CEFA",
		lightslategray: "778899",
		lightslategrey: "778899",
		lightsteelblue: "B0C4DE",
		lightyellow: "FFFFE0",
		lime: "00FF00",
		limegreen: "32CD32",
		linen: "FAF0E6",
		magenta: "FF00FF",
		maroon: "800000",
		mediumaquamarine: "66CDAA",
		mediumblue: "0000CD",
		mediumorchid: "BA55D3",
		mediumpurple: "9370DB",
		mediumseagreen: "3CB371",
		mediumslateblue: "7B68EE",
		mediumspringgreen: "00FA9A",
		mediumturquoise: "48D1CC",
		mediumvioletred: "C71585",
		midnightblue: "191970",
		mintcream: "F5FFFA",
		mistyrose: "FFE4E1",
		moccasin: "FFE4B5",
		navajowhite: "FFDEAD",
		navy: "000080",
		oldlace: "FDF5E6",
		olive: "808000",
		olivedrab: "6B8E23",
		orange: "FFA500",
		orangered: "FF4500",
		orchid: "DA70D6",
		palegoldenrod: "EEE8AA",
		palegreen: "98FB98",
		paleturquoise: "AFEEEE",
		palevioletred: "DB7093",
		papayawhip: "FFEFD5",
		peachpuff: "FFDAB9",
		peru: "CD853F",
		pink: "FFC0CB",
		plum: "DDA0DD",
		powderblue: "B0E0E6",
		purple: "800080",
		red: "FF0000",
		rosybrown: "BC8F8F",
		royalblue: "4169E1",
		saddlebrown: "8B4513",
		salmon: "FA8072",
		sandybrown: "F4A460",
		seagreen: "2E8B57",
		seashell: "FFF5EE",
		sienna: "A0522D",
		silver: "C0C0C0",
		skyblue: "87CEEB",
		slateblue: "6A5ACD",
		slategray: "708090",
		slategrey: "708090",
		snow: "FFFAFA",
		springgreen: "00FF7F",
		steelblue: "4682B4",
		tan: "D2B48C",
		teal: "008080",
		thistle: "D8BFD8",
		tomato: "FF6347",
		turquoise: "40E0D0",
		violet: "EE82EE",
		wheat: "F5DEB3",
		white: "FFFFFF",
		whitesmoke: "F5F5F5",
		yellow: "FFFF00",
		yellowgreen: "9ACD32"
	}
}

if (true) {
  module.exports = Rainbow;
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__levels__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__platform__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__exit__ = __webpack_require__(2);





const levelOne = new __WEBPACK_IMPORTED_MODULE_0__levels__["a" /* default */](
  new __WEBPACK_IMPORTED_MODULE_1__player__["a" /* default */](50, -5000), [
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */](0, 300, 900, 200),
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */](150, 270, 750, 200),
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */](300, 230, 600, 200),
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */](450, 190, 450, 200),
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */](600, 160, 300, 200)
  ],
  [
    [450, 190, 340, 100, true],
    [600, 160, 300, 100, true],
    [300, 230, 280, 80, true],
    [150, 270, 150, 60, true],
    [0, 300, 150, 50, true],
  ],
  new __WEBPACK_IMPORTED_MODULE_3__exit__["a" /* default */](815, 120)
)

const levelTwo = new __WEBPACK_IMPORTED_MODULE_0__levels__["a" /* default */](
  new __WEBPACK_IMPORTED_MODULE_1__player__["a" /* default */](50, 200), [
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */](695, 26, 200, 100),
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */](300, 215, 280, 80),
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */](450, 125, 450, 100),
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */](170, 260, 150, 60),
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */](0, 300, 150, 50)
  ],
  [
    [695, 26, 200, 100, true],
    [300, 215, 280, 80, true],
    [450, 125, 450, 100, true],
    [170, 260, 150, 60, true],
    [0, 300, 150, 50, true]
  ],
  new __WEBPACK_IMPORTED_MODULE_3__exit__["a" /* default */](815, 0)
)

const levelThree = new __WEBPACK_IMPORTED_MODULE_0__levels__["a" /* default */](
  new __WEBPACK_IMPORTED_MODULE_1__player__["a" /* default */](50,  0), [
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */](0, 300, 120, 100),
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */](150, 270, 120, 100),
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */](300, 230, 120, 100),
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */](500, 300, 120, 100),
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */](725, 500, 160, 100)
  ],
  [
    [0, 300, 120, 100, true],
    [150, 270, 120, 100, true],
    [300, 230, 120, 100, true],
    [500, 300, 120, 100, true],
    [725, 500, 160, 100, true]
  ],
  new __WEBPACK_IMPORTED_MODULE_3__exit__["a" /* default */](793, 525)
)

const levelFour = new __WEBPACK_IMPORTED_MODULE_0__levels__["a" /* default */](
  new __WEBPACK_IMPORTED_MODULE_1__player__["a" /* default */](50, -2400), [
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */](0, 300, 100, 100),
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */](185, 275, 100, 100),
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */](390, 230, 100, 250),
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */](600, 190, 100, 250),
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */](910, -1000, 50, 1500),
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */](840, 465, 100, 50),
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */](650, -1275, 80, 50)
  ],
  [
    [0, 300, 100, 100, true],
    [185, 275, 100, 100, true],
    [390, 230, 100, 250, true],
    [600, 190, 100, 250, true],
    [910, -1000, 50, 1500, true],
    [840, 465, 100, 50, true],
    [650, -1275, 80, 50, true]
  ],
  new __WEBPACK_IMPORTED_MODULE_3__exit__["a" /* default */](600, -1325)
)

const levelFive = new __WEBPACK_IMPORTED_MODULE_0__levels__["a" /* default */](
  new __WEBPACK_IMPORTED_MODULE_1__player__["a" /* default */](825, 0), [
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */](725, 500, 150, 100),
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */](600, 460, 100, 100),
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */](500, 305, 120, 100),
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */](225, 230, 280, 30),
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */](250, 150, 236, 30),
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */](275, 70, 188, 30),
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */](300, -10, 140, 30),
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */](325, -90, 96, 30),
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */]( 350, -170, 50, 30)
  ],
  [
    [725, 500, 150, 100, true],
    [600, 460, 100, 100, true],
    [500, 305, 120, 100, true],
    [225, 230, 280, 30, true],
    [250, 150, 236, 30, true],
    [275, 70, 188, 30, true],
    [300, -10, 140, 30, true],
    [325, -90, 96, 30, true],
    [350, -170, 50, 30, true]
  ],
  new __WEBPACK_IMPORTED_MODULE_3__exit__["a" /* default */](365, -262)
)

const levelSix = new __WEBPACK_IMPORTED_MODULE_0__levels__["a" /* default */] (
  new __WEBPACK_IMPORTED_MODULE_1__player__["a" /* default */](825, 0), [
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */](725, 500, 150, 100),
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */](600, 460, 100, 100),
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */](-100, -100, 500, 400),
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */](400, 175, 175, 275),
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */](-50, 465, 375, 15),
    new __WEBPACK_IMPORTED_MODULE_2__platform__["a" /* default */](-275, 175, 175, 275)
  ],
  [
    [725, 500, 150, 100, true],
    [600, 460, 100, 100, true],
    [-100, -100, 500, 400, true],
    [400, 175, 175, 275, true],
    [-50, 465, 325, 15, true],
    [-275, 175, 175, 275, true]
    ],
  new __WEBPACK_IMPORTED_MODULE_3__exit__["a" /* default */](200, 400)
)

const levels = [levelOne, levelTwo, levelThree, levelFour, levelFive, levelSix]
/* harmony export (immutable) */ __webpack_exports__["a"] = levels;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Level {
  constructor(player, platformArray, renderArray, exit) {
    this.player = player;
    this.platformArray = platformArray;
    this.renderArray = renderArray;
    this.exit = exit;
    this.playerRespawn = [player.xPos, player.yPos]
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Level);


/***/ })
/******/ ]);