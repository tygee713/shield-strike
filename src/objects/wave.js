import { init, Text } from '../../lib/kontra.min.mjs'

let { canvas } = init()

const maxWave = 7
const initialWave = 'Wave 1 / ' + maxWave

const createWaveDisplay = (scene) => Text({
  text: initialWave,
  font: '18px Arial',
  color: 'white',
  x: canvas.width / 2,
  y: 40,
  anchor: { x: 0.5, y: 0.5 },
  currentWave: scene.level,
  maxWave,
  reset: function(dt) {
    this.currentWave = scene.level
  },
  update: function(dt) {
    this.text = 'Wave ' + scene.level + ' / ' + maxWave
  }
})

export default createWaveDisplay