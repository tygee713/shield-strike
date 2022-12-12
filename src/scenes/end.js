import { init, initKeys, onKey, Scene, Sprite } from '../../lib/kontra.min.mjs'
import { showMainScene } from '../game.js'

let { canvas } = init()
initKeys()

const Screen = Sprite({
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
})

const Text = Sprite({
  x: canvas.width / 2,
  y: canvas.height - 100,
  width: 160,
  height: 40,
  anchor: { x: 0.5, y: 0.5 },
})

let image = new Image()
image.src = 'assets/endscreen.png'
image.onload = function() {
  Screen.image = image
}

let image2 = new Image()
image2.src = 'assets/end_screen_press_enter.png'
image2.onload = function() {
  Text.image = image2
}

const createScene = () => Scene({
  id: 'end',
  objects: [Screen, Text],
})

onKey('enter', function(e) {
  showMainScene()
})

export default createScene