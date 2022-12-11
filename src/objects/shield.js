import { degToRad, imageAssets, init, initKeys, keyPressed, onKey, Sprite, SpriteSheet } from '../../lib/kontra.min.mjs'

let { canvas } = init()
initKeys()

const createCollider = () => Sprite({
  width: 48,
  height: 20,
  x: 0,
  y: -16,
  anchor: { x: 0.5, y: 0.5 },
  opacity: 1,
  color: 'red',
  update: function(dt) {
    switch(this.parent.player.direction) {
      case 'east':
        this.x = 16
        this.y = 0
        this.width = 20
        this.height = 48
        break
      case 'south':
        this.x = 0
        this.y = 16
        this.width = 48
        this.height = 20
        break
      case 'west':
        this.x = -16
        this.y = 0
        this.width = 20
        this.height = 48
        break
      default:
        this.x = 0
        this.y = -16
        this.width = 48
        this.height = 20
        break
    }

    if (this.parent.reflect) {
      this.color = 'green'
    } else {
      this.color = 'red'
    }
  }
})

const createShield = (player) => {
  const collider = createCollider()
  return Sprite({
    width: 48,
    height: 40,
    x: player.x,
    y: player.y - 8,
    anchor: { x: 0.5, y: 0.5 },
    reflect: false,
    energy: 0,
    player,
    children: [collider],
    update: function(dt) {
      // change position based on player's direction
      switch(this.player.direction) {
        case 'east':
          this.x = this.player.x + 8
          this.y = this.player.y
          break
        case 'south':
          this.x = this.player.x
          this.y = this.player.y + 8
          break
        case 'west':
          this.x = this.player.x - 8
          this.y = this.player.y
          break
        default:
          this.x = this.player.x
          this.y = this.player.y - 8
          break
      }

      this.children.forEach(obj => obj.update(dt))
    }
  })
}

export default createShield