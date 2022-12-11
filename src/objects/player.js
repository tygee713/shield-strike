import { degToRad, imageAssets, init, initKeys, keyPressed, onKey, Sprite, SpriteSheet } from '../../lib/kontra.min.mjs'

let { canvas } = init()
initKeys()

const Player = Sprite({
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: 30,
  height: 40,
  anchor: { x: 0.5, y: 0.5 },
  direction: 'north',
  health: 10,
  meter: 3,
  meterCooldown: 0,
  perfectFrames: 0,
  update: function(dt) {
    this.currentAnimation && this.currentAnimation.update(dt)
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
      this.shield.stopReflect()
    }

    if (this.shield.reflect) {
      this.perfectFrames > 0 ? this.perfectFrames -= dt * 30 : this.shield.currentAnimation = null
      this.meter -= dt
      if (this.meter <= 0) this.shield.stopReflect()
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

      if (!this.shield.reflect) {
        this.playAnimation(this.direction + 'Walk')

        this.x += vector.x * 2
        this.y += vector.y * 2
      } else {
        this.playAnimation(this.direction + 'Idle')
      }
    } else {
      this.playAnimation(this.direction + 'Idle')
    }

    // set the rotation and change the sprite
    // switch(this.direction) {
    //   case 'northeast':
    //     this.rotation = degToRad(45)
    //     break
    //   case 'east':
    //     this.rotation = degToRad(90)
    //     break
    //   case 'southeast':
    //     this.rotation = degToRad(135)
    //     break
    //   case 'south':
    //     this.rotation = degToRad(180)
    //     break
    //   case 'southwest':
    //     this.rotation = degToRad(225)
    //     break
    //   case 'west':
    //     this.rotation = degToRad(270)
    //     break
    //   case 'northwest':
    //     this.rotation = degToRad(315)
    //     break
    //   default:
    //     this.rotation = degToRad(0)
    //     break
    // }
  }
})

onKey('space', function(e) {
  if (Player.meter > 1 && !Player.shield.reflect) {
    Player.shield.startReflect()
    Player.meter -= 1
    Player.perfectFrames = 6
  }
})

let image = new Image()
image.src = 'assets/player.png'
image.onload = function() {
  let spriteSheet = SpriteSheet({
    image,
    frameWidth: 30,
    frameHeight: 40,
    animations: {
      westIdle: {
        frames: 1
      },
      westWalk: {
        frames: [0, 1, 2, 1],
        frameRate: 10,
      },
      eastIdle: {
        frames: 4
      },
      eastWalk: {
        frames: [3, 4, 5, 4],
        frameRate: 10,
      },
      northIdle: {
        frames: 7
      },
      northWalk: {
        frames: [6, 7, 8, 7],
        frameRate: 10,
      },
      southIdle: {
        frames: 10
      },
      southWalk: {
        frames: [9, 10, 11, 10],
        frameRate: 10,
      }
    }
  })
  Player.animations = spriteSheet.animations
  Player.playAnimation('northIdle')
}

export default Player