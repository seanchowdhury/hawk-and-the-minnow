var Rainbow = require('rainbowvis.js');
var someRainbow = new Rainbow();
var tinycolor = require("tinycolor2");
var myRainbow = [];
for (let i = 0; i < 101; i++) {
  let color = tinycolor(someRainbow.colourAt(i)).toHsv()
  color.s = 0.4
  myRainbow.push(tinycolor(color).toHexString());
}
class Exit {
  constructor(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.rainbowCounter = 0;
    this.incrementer = 1;
    this.color = myRainbow[this.rainbowCounter];
    this.width = 20;
    this.height = 20;
    this.borderColor = myRainbow[Math.abs(100 - this.rainbowCounter)];
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
    this.color = myRainbow[this.rainbowCounter];
    this.borderColor = myRainbow[Math.abs(100 - this.rainbowCounter)];
  }

}

export default Exit;
