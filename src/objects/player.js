import { init, Sprite } from '../../lib/kontra.min.mjs'

let { canvas } = init()

const Shield = Sprite({
  width: 24,
  height: 4,
  anchor: { x: 0.5, y: 0.5 },
  color: 'green',
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
    onKey('w', () => {
      vector.y -= 1
    })
    onKey('s', () => {
      vector.y += 1
    })
    onKey('a', () => {
      vector.x -= 1
    })
    onKey('d', () => {
      vector.x += 1
    })

    // normalize vector movement
    let length = Math.sqrt(vector.x * vector.x + vector.y * vector.y)
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

    switch(this.direction) {
      case 'north':
        // set sprite to north-facing sprite
        Shield.y = -21
        Shield.x = 0
      case 'south':
        // set sprite to south-facing sprite
        Shield.y = 21
        Shield.x = 0
      case 'east':
        // set sprite to east-facing sprite
        Shield.x = 21
        Shield.y = 0
      case 'west':
        // set sprite to west-facing sprite
        Shield.x = -21
        Shield.y = 0
      case 'northeast':
        // set sprite to northeast-facing sprite
        Shield.y = -21
        Shield.x = 21
        Shield.context.rotate(90)
      case 'northwest':
        // set sprite to northwest-facing sprite
        Shield.y = -21
        Shield.x = -21
        Shield.context.rotate(-90)
      case 'southeast':
        // set sprite to southeast-facing sprite
        Shield.y = 21
        Shield.x = 21
        Shield.context.rotate(270)
      case 'southwest':
        // set sprite to southwest-facing sprite
        Shield.y = 21
        Shield.x = -21
        Shield.context.rotate(-270)
    }
  }
})

export default Player