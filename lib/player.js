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
    this.moveSpeed = 4;
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
    this._move();
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
  // PRIVATE

  _move() {
    this.xSpeed = 0
    if(this.rightPressed && !this.rightBlocked) {
      this.xSpeed = this.moveSpeed;
    } else if(this.leftPressed && !this.leftBlocked) {
      this.xSpeed =- this.moveSpeed;
    }
    this.rightBlocked = false;
    this.leftBlocked = false;
    this.xPos += this.xSpeed
  }

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

export default Player;
