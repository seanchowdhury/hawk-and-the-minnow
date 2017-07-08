import Level from './levels';
import Player from './player';
import Platform from './platform';
import Exit from './exit';

export const levelOne = new Level(
  new Player(50, -5000), [
    new Platform(0, 300, 900, 200),
    new Platform(150, 270, 750, 200),
    new Platform(300, 230, 600, 200),
    new Platform(450, 190, 450, 200),
    new Platform(600, 160, 300, 200)
  ],
  [
    [450, 190, 340, 100, true],
    [600, 160, 300, 100, true],
    [300, 230, 280, 80, true],
    [150, 270, 150, 60, true],
    [0, 300, 150, 50, true],
  ],
  new Exit(815, 130)
)

export const levelTwo = new Level(
  new Player(50,  0), [
    new Platform(0, 300, 900, 200),
    new Platform(150, 270, 750, 200),
    new Platform(450, 190, 450, 200),
    new Platform(600, 160, 300, 200),
    new Platform(1000, 160, 300, 200)
  ],
  [
    [0, 300, 900, 200, true],
    [150, 270, 750, 200, true],
    [450, 190, 450, 200, true],
    [600, 160, 300, 200, true],
    [1000, 160, 300, 200]
  ],
  new Exit(815, 130)
)

export const levelThree = new Level(
  new Player(50, 0), [
    new Platform(0, 300, 900, 200),
    new Platform(150, 270, 750, 200),
    new Platform(300, 230, 600, 200),
    new Platform(450, 190, 450, 200),
    new Platform(600, 160, 300, 200)
  ],
  [
    [0, 300, 900, 200, true],
    [150, 270, 750, 200, true],
    [300, 230, 600, 200, true],
    [450, 190, 450, 200, true],
    [600, 160, 300, 200, true]
  ],
  new Exit(815, 130)
)
