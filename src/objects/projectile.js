import { init, Sprite } from '../../lib/kontra.min.mjs'

let { canvas } = init()

const projectileAttributes = {
  'rock': {
    speed: 10,
    damage: 1,
    image: null,
    width: 3,
    height: 3,
    passThrough: false,
  }
}

const createProjectile = (x, y, targetX, targetY, type) => {
  const { speed, damage, image, width, height, passThrough } = projectileAttributes[type]

  // Calculate the velocity
  const angle = Math.atan2(targetY, targetX)
  const xDelta = Math.cos(angle) * speed
  const yDelta = Math.sin(angle) * speed

  return Sprite({
    width,
    height,
    x,
    y,
    xDelta,
    yDelta,
    damage,
    passThrough,
    anchor: { x: 0.5, y: 0.5 },
    update: function(dt) {
      this.x += this.xDelta
      this.y += this.yDelta
    }
  })
}

export default createProjectile