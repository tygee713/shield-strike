import { init, GameLoop, load } from '../lib/kontra.min.mjs'
import createStartScene from './scenes/start.js'
import createMainScene from './scenes/main.js'
import createEndScene from './scenes/end.js'

init()

let currentScene = null

// Goes to the intro scene
// Called when the game begins
export const showStartScene = () => {
  if (currentScene) {
    currentScene.hide()
    currentScene.destroy()
  }
  currentScene = createStartScene()
  currentScene.show()
}

// Moves from the intro scene to the main scene and resets all variables
// Called when user presses enter on the initial scene
// Also called when the user pressed enter on the ending scene
export const showMainScene = () => {
  if (currentScene) {
    currentScene.hide()
    currentScene.destroy()
  }
  currentScene = createMainScene()
  currentScene.show()
}

// Moves from the main scene to the ending scene
// Called when the character dies
export const showEndScene = () => {
  if (currentScene) {
    currentScene.hide()
    currentScene.destroy()
  }
  currentScene = createEndScene()
  currentScene.show()
}

const loop = GameLoop({
  update: (dt) => {
    currentScene && currentScene.update(dt)
  },
  render: () => {
    currentScene && currentScene.render()
  }
})

loop.start()

load('assets/player.png',
  'assets/reflector_shield_cast.png',
  'assets/reflector_shield_honeycomb_held.png',
  'assets/goblin.png',
  'assets/goblin_projectile.png',
  'assets/goblincannon.png',
  'assets/goblincannon_projectile.png',
  'assets/goblinmage.png',
  'assets/goblinmage_projectile.png',
  'assets/floatingeye.png',
  'assets/floatingeye_projectile.png',
  'assets/archer.png',
  'assets/archer_projectile.png',
  'assets/skeleton.png',
  'assets/skeleton_projectile.png',
  'assets/titlescreen.png',
  'assets/start_menu_press_enter.png',
  'assets/powerup_movespeed.png',
  'assets/powerup_reflector.png'
).then(function(assets) {
  showStartScene()
}).catch(function(err) {
  alert('Error loading assets, please refresh and try again')
})
