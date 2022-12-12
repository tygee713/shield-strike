import { init, initKeys, onKey, Scene, Sprite } from '../../lib/kontra.min.mjs'
import { showMainScene } from '../game.js'

let { canvas } = init()
initKeys()

let winPicture = null
let lossPicture = null

const Screen = Sprite({
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
})

let image = new Image()
image.src = 'assets/win_screen.png'
image.onload = function() {
  winPicture = image
}

let image2 = new Image()
image2.src = 'assets/gameover_screen.png'
image2.onload = function() {
  lossPicture = image2
}

const createScene = (win) => Scene({
  id: 'end',
  objects: [Screen],
  win,
  onShow: function() {
    if (win) {
      Screen.image = winPicture
    } else {
      Screen.image = lossPicture
    }
  },
  update: function(dt) {
    if (!Screen.image) {
      if (this.win) {
        Screen.image = winPicture
      } else {
        Screen.image = lossPicture
      }
    }
  }
})

onKey('enter', function(e) {
  showMainScene()
})

export default createScene