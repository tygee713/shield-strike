import { init, Sprite } from '../../lib/kontra.min.mjs'
import Player from '../objects/player.js'

let { canvas } = init()
initKeys()

const enemyAttributes = {
  'goblin': {
    range: 300,
    speed: 1,
    projectileSpeed: 10,
  }
}

const createEnemy = (x, y, type) => Sprite({
  width: 32,
  height: 32,
  x,
  y,
  anchor: { x: 0.5, y: 0.5 },
  range,
  update: function(dt) {
    // update which way it's facing depending on player position
    // move towards the player position if the distance to the player position is greater than its range
    // otherwise, shoot a projectile towards current player position
  }
})

export default createEnemy