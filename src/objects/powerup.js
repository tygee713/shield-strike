import { init, Sprite, SpriteSheet } from '../../lib/kontra.min.mjs'

let { canvas } = init()

// const possibleTypes = ['speedUp', 'reflectUp']
const possibleTypes = ['speedUp']

const createPowerup = (enemy) => {
  const type = possibleTypes[Math.floor(Math.random() * possibleTypes.length)]

  let powerup = Sprite({
    width: 22,
    height: 20,
    x: enemy.x,
    y: enemy.y,
    type,
    anchor: { x: 0.5, y: 0.5 },
  })

  let image = new Image()
  image.src = type == 'speedUp' ? 'assets/powerup_movespeed.png' : 'assets/powerup_reflector.png'
  let spriteSheet = SpriteSheet({
    image,
    frameWidth: 22,
    frameHeight: 20,
    animations: {
      idle: {
        frames: 2
      }
    },
  })
  powerup.animations = spriteSheet.animations
  powerup.playAnimation('idle')
  return powerup
}

export default createPowerup