import { degToRad, init, initKeys, keyPressed, Sprite } from '../../lib/kontra.min.mjs'

let { canvas } = init()
initKeys()

const Shield = Sprite({
  width: 24,
  height: 4,
  x: 0,
  y: -21,
  anchor: { x: 0.5, y: 0.5 },
  color: 'green',
  direction: 'north',
  changeDirection: function(direction) {
    this.direction = direction
    switch(direction) {
      case 'north':
        // set sprite to north-facing sprite
        this.y = -21
        this.x = 0
        break
      case 'south':
        // set sprite to south-facing sprite
        this.y = 21
        this.x = 0
        break
      case 'east':
        // set sprite to east-facing sprite
        this.x = 21
        this.y = 0
        break
      case 'west':
        // set sprite to west-facing sprite
        this.x = -21
        this.y = 0
        break
      case 'northeast':
        // set sprite to northeast-facing sprite
        this.y = -21
        this.x = 21
        break
      case 'northwest':
        // set sprite to northwest-facing sprite
        this.y = -21
        this.x = -21
        break
      case 'southeast':
        // set sprite to southeast-facing sprite
        this.y = 21
        this.x = 21
        break
      case 'southwest':
        // set sprite to southwest-facing sprite
        this.y = 21
        this.x = -21
        break
    }
  },
  render: function() {
    this.context.fillStyle = this.color
    
    // IDK why these x and y coords work, but they do, kind of
    if (this.direction == 'northeast') {
      this.context.rotate(degToRad(45))
      this.context.fillRect(0, -4, this.width, this.height)
    } else if (this.direction == 'east') {
      this.context.rotate(degToRad(90))
      this.context.fillRect(-10, -16, this.width, this.height)
    } else if (this.direction == 'southeast') {
      this.context.rotate(degToRad(135))
      this.context.fillRect(-20, -6, this.width, this.height)
    } else if (this.direction == 'south') {
      this.context.rotate(degToRad(180))
      this.context.fillRect(-24, -4, this.width, this.height)
    } else if (this.direction == 'southwest') {
      this.context.rotate(degToRad(225))
      this.context.fillRect(-20, 12, this.width, this.height)
    } else if (this.direction == 'west') {
      this.context.rotate(degToRad(270))
      this.context.fillRect(-14, 8, this.width, this.height)
    } else if (this.direction == 'northwest') {
      this.context.rotate(degToRad(315))
      this.context.fillRect(-6, 14, this.width, this.height)
    } else {
      this.context.fillRect(0, 0, this.width, this.height)
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

      this.x += vector.x
      this.y += vector.y
    }

    this.children.forEach(shield => shield.direction != this.direction && shield.changeDirection(this.direction))
  }
})

export default Player