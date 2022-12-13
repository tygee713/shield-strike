import { init, Text } from '../../lib/kontra.min.mjs'

let { canvas } = init()

const maxTime = 7 * 15
const maxTimer = Math.floor(maxTime / 60) + ':' + (maxTime - 60).toFixed(1)

const timer = Text({
  text: maxTimer,
  font: '18px Arial',
  color: 'white',
  x: canvas.width / 2,
  y: 20,
  anchor: { x: 0.5, y: 0.5 },
  currentTime: maxTime,
  reset: function(dt) {
    this.currentTime = maxTime
  },
  update: function(dt) {
    this.currentTime -= dt
    if (this.currentTime > 0) {
      let minutes = Math.floor(maxTime / 60)
      let seconds = minutes ? this.currentTime - 60 : this.currentTime
      this.text = minutes ? minutes + ':' + seconds.toFixed(1) : seconds.toFixed(1)
    } else {
      this.text = 0.0
    }
  },
})

export default timer