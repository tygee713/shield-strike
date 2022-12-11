import { init, Sprite } from '../../lib/kontra.min.mjs'
import Player from './player.js'

let { canvas } = init()

const maxWidth = 32
const maxMeter = 3

const fill = Sprite({
  width: maxWidth,
  height: 5,
  color: '#392E2D',
  update: function(dt) {
      let previousWidth = this.width
      this.width = Player.meter * (maxWidth / maxMeter)
      if (previousWidth >= maxWidth / 3 && this.width < maxWidth / 3) {
        this.color = '#C82C0B'
      }
  },
  reset: function() {
    this.width = maxWidth
    this.color = '#392E2D'
  }
})

const meterBar = Sprite({
  y: Player.y - 16,
  width: maxWidth,
  height: 5,
  color: '#C9BDBB',
  children: [fill],
  reset: function() {
    fill.reset()
  },
})

export default meterBar