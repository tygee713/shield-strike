import { init, Sprite, SpriteSheet } from '../../lib/kontra.min.mjs'

let { canvas } = init()

const createHitPing = (type) => {
  let hitPing = Sprite({
    width: 13,
    height: 14,
    type,
    anchor: { x: 0.5, y: 0.5 },
    alive: true,
    ttl: 12,
    update: function(dt) {
      this.x = this.parent.collider.x
      this.y = this.parent.collider.y
      this.ttl -= dt * 60
      this.currentAnimation.update(dt)
      if (this.ttl < 0) this.alive = false
    }
  })

  let image = new Image()
  image.src = 'assets/hit_ping.png'
  let spriteSheet = SpriteSheet({
    image,
    frameWidth: 26,
    frameHeight: 28,
    animations: {
      normal: {
        frames: [0, 1],
        frameRate: 10,
        loop: false,
      },
      reflect: {
        frames: [2, 3],
        frameRate: 10,
        loop: false,
      }
    },
  })
  hitPing.animations = spriteSheet.animations
  hitPing.playAnimation(type)
  return hitPing
}

export default createHitPing