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
  powerUpTime: 0,
  reflectDouble: false,
  speed: 2,
  reset: function() {
    this.x = canvas.width / 2
    this.y = canvas.height / 2
    this.direction = 'north'
    this.health = 10
    this.meter = 3
    this.meterCooldown = 0
    this.perfectFrames = 0
    this.powerUpTime = 0
    this.reflectDouble = false
    this.speed = 2
  },
  update: function(dt) {
    this.currentAnimation && this.currentAnimation.update(dt)
    if (this.dead) return

    if (this.powerUpTime > 0) {
      this.powerUpTime -= dt
      if (this.powerUpTime <= 0) {
        this.speed = 2
        this.reflectDouble = false
      }
    }

    let vector = { x: 0, y: 0 }

    if (keyPressed('w') && this.y > 20) {
      vector.y -= 1
    }
    if (keyPressed('s') && this.y < canvas.height - 20) {
      vector.y += 1
    }
    if (keyPressed('a') && this.x > 15) {
      vector.x -= 1
    }
    if (keyPressed('d') && this.x < canvas.width - 15) {
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

        this.x += vector.x * this.speed
        this.y += vector.y * this.speed
      } else {
        this.playAnimation(this.direction + 'Idle')
      }
    } else {
      this.playAnimation(this.direction + 'Idle')
    }
  }
})

onKey('space', function(e) {
  if (Player.meter > 1 && !Player.shield.reflect && !Player.dead) {
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
        frames: 1,
      },
      westWalk: {
        frames: [0, 1, 2, 1],
        frameRate: 10,
      },
      eastIdle: {
        frames: 4,
      },
      eastWalk: {
        frames: [3, 4, 5, 4],
        frameRate: 10,
      },
      northIdle: {
        frames: 7,
      },
      northWalk: {
        frames: [6, 7, 8, 7],
        frameRate: 10,
      },
      southIdle: {
        frames: 10,
      },
      southWalk: {
        frames: [9, 10, 11, 10],
        frameRate: 10,
      },
      death: {
        frames: ['15..34', 34, 34, 34, 34, 34, 34, 34, 34, 34, 34],
        frameRate: 10,
      }
    }
  })
  Player.animations = spriteSheet.animations
  Player.playAnimation('northIdle')
}

export default Player