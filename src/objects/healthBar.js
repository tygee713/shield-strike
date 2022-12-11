import { init, Sprite, Text } from '../../lib/kontra.min.mjs'
import Player from './player.js'

let { canvas } = init()

const maxWidth = 100
const maxHealth = 10

const fill = Sprite({
  width: maxWidth,
  height: 20,
  color: '#C82C0B',
  update: function(dt) {
    this.width = Player.health * (maxWidth / maxHealth)
  },
  reset: function() {
    this.width = maxWidth
    this.color = '#C82C0B'
  }
})

const text = Text({
  text: 'Health: ',
  x: -20,
  y: 10,
  anchor: { x: 0.5, y: 0.5 },
})

const healthBar = Sprite({
  x: 50,
  y: canvas.height - 30,
  width: maxWidth,
  height: 20,
  color: '#C9BDBB',
  children: [fill, text],
  reset: function() {
    fill.reset()
  },
})

export default healthBar