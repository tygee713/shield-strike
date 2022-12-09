import { init, Scene, Sprite, GameObject } from '../../lib/kontra.min.mjs'
import Player from '../objects/player.js'
import createEnemy from '../objects/enemy.js'

const { canvas } = init()

const levelAttributes = {
  1: {
    enemySpawnInterval: 5,
    numEnemiesToSpawn: 5,
    enemyTypes: ['goblin'],
  }
}

const spawnEnemies = (level) => {
  // Spawn a number of enemies depending on the level
  // Choose x segments of the map at random and then spread out the spawns in those segments
}

const createScene = () => Scene({
  id: 'main',
  level: 1,
  timeElapsed: 0,
  objects: [Player],
})

export default createScene