import { init, Sprite } from '../../lib/kontra.min.mjs'
import Player from '../objects/player.js'

let { canvas } = init()

const enemyAttributes = {
  'goblin': {
    range: 300,
    speed: 1,
    projectile: 'rock',
    fireInterval: 3,
  }
}

const createEnemy = (x, y, type) => {
  const { range, speed, projectile, fireInterval } = enemyAttributes[type]
  return Sprite({
    width: 32,
    height: 32,
    x,
    y,
    anchor: { x: 0.5, y: 0.5 },
    range,
    timeSinceAttack: 0,
    update: function(dt) {
      // update which way it's facing depending on player position
      // move towards the player position if the distance to the player position is greater than its range
      // otherwise, shoot a projectile towards current player position if timeSinceAttack > fireInterval
    }
  })
}

export default createEnemy