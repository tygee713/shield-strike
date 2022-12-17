import { GameObject, init, initKeys, keyPressed, onKey, Sprite, SpriteSheet, collides } from '../../lib/kontra.min.mjs'

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
  shockFrames: 0,
  opacityFrames: 0,
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
    this.dead = false
    this.opacity = 1
    this.shockFrames = 0
    this.opacityFrames = 0
  },
  update: function(dt) {
    this.currentAnimation && this.currentAnimation.update(dt)
    if (this.dead) {
      this.opacity = 1
      return
    }

    if (this.shockFrames && this.shockFrames > 0) {
      console.log(this.shockFrames)
      this.playAnimation(this.direction + 'Shock')
      this.shockFrames -= dt * 10
      if (this.shockFrames < 0) this.shockFrames = 0
    }

    if (this.opacityFrames && this.opacityFrames > 0) {
      if (Math.floor(this.opacityFrames) % 2 == 0) {
        this.opacity = .25
      } else {
        this.opacity = .5
      }
      this.opacityFrames -= dt * 10
    } else {
      this.opacity = 1
    }

    if (this.powerUpTime > 0) {
      this.powerUpTime -= dt
      if (this.powerUpTime <= 0) {
        this.speed = 2
        this.reflectDouble = false
      }
    }

    if (this.shockFrames) return

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

    this.perfectFrames > 0 ? this.perfectFrames -= dt * 10 : this.perfectFrames = 0
    if (this.shield.reflect) {
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

        let deltaX = vector.x * this.speed
        let deltaY = vector.y * this.speed

        // push enemies that you collide with and move forward towards
        let collisionObject = GameObject({
          x: this.shield.x + deltaX,
          y: this.shield.y + deltaY,
          width: this.shield.width / 2,
          height: this.shield.height / 2,
          anchor: this.shield.anchor,
        })
        let collisionDetected = false
        for (let x = 0; x < this.scene.enemies.length; x++) {
          if (!this.scene.enemies[x]) continue
          if (collides(this.scene.enemies[x].children[0], collisionObject)) {
            collisionDetected = true
            if (this.direction == 'north' || this.direction == 'south') {
              this.scene.enemies[x].y += deltaY / 2
            } else {
              this.scene.enemies[x].x += deltaX / 2
            }
          }
        }
          if (collisionDetected) {
            deltaX = deltaX / 2
            deltaY = deltaY / 2
          }
        this.x += deltaX
        this.y += deltaY

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
    Player.boopEnemies = true
    Player.shield.startReflect()
    Player.meter -= 1
    Player.perfectFrames = 4
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
        frames: ['15..34'],
        frameRate: 10,
        loop: false,
      },
      westShock: {
        frames: [45, 42],
        frameRate: 10,
      },
      eastShock: {
        frames: [46, 43],
        frameRate: 10,
      },
      northShock: {
        frames: [39, 36],
        frameRate: 10,
      },
      southShock: {
        frames: [40, 37],
        frameRate: 10,
      },
    }
  })
  Player.animations = spriteSheet.animations
  Player.playAnimation('northIdle')
}

export default Player