working y collision

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
