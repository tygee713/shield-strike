import { degToRad, init, initKeys, keyPressed, Sprite } from '../../lib/kontra.min.mjs'

let { canvas } = init()
initKeys()

export const Shield = Sprite({
  width: 24,
  height: 4,
  x: 0,
  y: -21,
  anchor: { x: 0.5, y: 0.5 },
  color: 'green',
  reflect: false,
  energy: 0,
})

const Player = Sprite({
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: 32,
  height: 32,
  anchor: { x: 0.5, y: 0.5 },
  color: 'blue',
  children: [Shield],
  direction: 'north',
  health: 10,
  update: function(dt) {
    let vector = { x: 0, y: 0 }

    if (keyPressed('w')) {
      vector.y -= 1
    }
    if (keyPressed('s')) {
      vector.y += 1
    }
    if (keyPressed('a')) {
      vector.x -= 1
    }
    if (keyPressed('d')) {
      vector.x += 1
    }

    // normalize vector movement
    let length = Math.sqrt(vector.x * vector.x + vector.y * vector.y)

    if (length > 0) {
      vector.x /= length
      vector.y /= length

      // diagonal movement
      if (vector.x != 0 && vector.y != 0) {
        if (vector.y > 0) {
          if (vector.x > 0) {
            this.direction = 'southeast'
          } else {
            this.direction = 'southwest'
          }
        } else {
          if (vector.x > 0) {
            this.direction = 'northeast'
          } else {
            this.direction = 'northwest'
          }
        }
      // horizontal movement
      } else if (vector.x != 0) {
        if (vector.x > 0) {
          this.direction = 'east'
        } else {
          this.direction = 'west'
        }
      // vertical movement
      } else {
        if (vector.y > 0) {
          this.direction = 'south'
        } else {
          this.direction = 'north'
        }
      }

      this.x += vector.x * 2
      this.y += vector.y * 2
    }

    // set the rotation and change the sprite
    switch(this.direction) {
      case 'northeast':
        this.rotation = degToRad(45)
        break
      case 'east':
        this.rotation = degToRad(90)
        break
      case 'southeast':
        this.rotation = degToRad(135)
        break
      case 'south':
        this.rotation = degToRad(180)
        break
      case 'southwest':
        this.rotation = degToRad(225)
        break
      case 'west':
        this.rotation = degToRad(270)
        break
      case 'northwest':
        this.rotation = degToRad(315)
        break
      default:
        this.rotation = degToRad(0)
        break
    }
  }
})

export default Player