import { init, Sprite } from '../../lib/kontra.min.mjs'

let { canvas } = init()

const projectileAttributes = {
  'rock': {
    speed: 2,
    damage: 1,
    image: null,
    width: 5,
    height: 5,
    passThrough: false,
  }
}

const createProjectile = (x, y, targetX, targetY, type) => {
  const { speed, damage, image, width, height, passThrough } = projectileAttributes[type]

  // Calculate the velocity
  const angle = Math.atan2(targetY - y, targetX - x)
  const xDelta = Math.cos(angle) * speed
  const yDelta = Math.sin(angle) * speed

  return Sprite({
    width,
    height,
    color: 'white',
    x,
    y,
    xDelta,
    yDelta,
    damage,
    passThrough,
    alive: true,
    reflected: false,
    anchor: { x: 0.5, y: 0.5 },
    update: function(dt) {
      this.x += this.xDelta
      this.y += this.yDelta
    }
  })
}

export default createProjectile