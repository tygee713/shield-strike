import { degToRad, init, initKeys, keyPressed, Sprite } from '../../lib/kontra.min.mjs'

let { canvas } = init()
initKeys()

export const Shield = Sprite({
  width: 32,
  height: 5,
  x: 0,
  y: -16,
  anchor: { x: 0.5, y: 0.5 },
  reflect: false,
  energy: 0,
  update: function(dt) {
    if (this.reflect) {
      this.color = 'green'
    } else {
      this.color = null
    }
  }
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
  meter: 3,
  meterCooldown: 0,
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

    if (keyPressed('space') && !this.meterCooldown) {
      this.children[0].reflect = true
      this.meter -= dt
      if (this.meter <= 0.05) this.meterCooldown = 3
    } else {
      this.children[0].reflect = false
      if (this.meter < 3 && !this.meterCooldown) {
        let newMeter = this.meter + dt * 3
        if (newMeter > 3) newMeter = 3
        this.meter = newMeter
      }
      if (this.meterCooldown) {
        let newMeterCooldown = this.meterCooldown -dt
        if (newMeterCooldown < 0) newMeterCooldown = 0
        this.meterCooldown = newMeterCooldown
      }
    }

    // normalize vector movement
    let length = Math.sqrt(vector.x * vector.x + vector.y * vector.y)

    if (length > 0) {
      vector.x /= length
      vector.y /= length

      if (!this.children[0].reflect) {
        // horizontal movement
        if (vector.x != 0 && vector.y == 0) {
          if (vector.x > 0) {
            this.direction = 'east'
          } else {
            this.direction = 'west'
          }
        // vertical movement
        } else if (vector.x == 0 && vector.y != 0) {
          if (vector.y > 0) {
            this.direction = 'south'
          } else {
            this.direction = 'north'
          }
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