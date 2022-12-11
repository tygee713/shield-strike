import { degToRad, init, initKeys, keyPressed, onKey, Sprite } from '../../lib/kontra.min.mjs'

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
  perfectFrames: 0,
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

    if (!keyPressed('space')) {
      this.children[0].reflect = false
    }

    if (this.children[0].reflect) {
      if (this.perfectFrames > 0) this.perfectFrames -= dt * 30
      this.meter -= dt
      if (this.meter <= 0) this.children[0].reflect = false
    } else {
      if (this.meter < 3) {
        let newMeter = this.meter + dt * 3
        if (newMeter > 3) newMeter = 3
        this.meter = newMeter
      }
    }

    // normalize vector movement
    let length = Math.sqrt(vector.x * vector.x + vector.y * vector.y)

    if (length > 0) {
      vector.x /= length
      vector.y /= length

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

      if (!this.children[0].reflect) {
        this.x += vector.x * 2
        this.y += vector.y * 2
      }
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

onKey('space', function(e) {
  if (Player.meter > 1 && !Shield.reflect) {
    Shield.reflect = true
    Player.meter -= 1
    Player.perfectFrames = 3
  }
})

export default Player