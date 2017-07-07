var Rainbow = require('rainbowvis.js');
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

export default Exit;
