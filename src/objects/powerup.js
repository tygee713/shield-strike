import { init, Sprite } from '../../lib/kontra.min.mjs'

let { canvas } = init()

const possibleTypes = ['speedUp', 'shieldUp', 'reflectSpeedUp']

const createPowerup = (enemy) => {
  const type = possibleTypes[Math.floor(Math.random() * possibleTypes.length)]

  return Sprite({
    width: 10,
    height: 10,
    color: 'pink',
    x: enemy.x,
    y: enemy.y,
    type,
    anchor: { x: 0.5, y: 0.5 },
  })
}

export default createPowerup