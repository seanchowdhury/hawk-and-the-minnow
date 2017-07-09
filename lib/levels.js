class Level {
  constructor(player, platformArray, renderArray, exit) {
    this.player = player;
    this.platformArray = platformArray;
    this.renderArray = renderArray;
    this.exit = exit;
    this.playerRespawn = [player.xPos, player.yPos]
  }
}

export default Level;
