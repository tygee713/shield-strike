import { init, GameLoop, load } from '../lib/kontra.min.mjs'
// import createStartScene from './scenes/start.js'
import createMainScene from './scenes/main.js'
// import createEndScene from './scenes/end.js'

init()

let currentScene = null

// Goes to the intro scene
// Called when the game begins
// Also called when the user presses the try again button on the ending scene
export const showStartScene = () => {
  if (currentScene) {
    currentScene.hide()
    currentScene.destroy()
  }
  currentScene = createStartScene()
  currentScene.show()
}

// Moves from the intro scene to the main scene and resets all variables
// Called when user presses the start button on the initial scene
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
  // if (currentScene) {
  //   currentScene.hide()
  //   currentScene.destroy()
  // }
  // currentScene = createEndScene()
  // currentScene.show()
  alert("Game over")
  loop.stop()
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

// TODO: set up start scene
load('assets/player.png',
'assets/reflector_shield_cast.png',
'assets/reflector_shield_honeycomb_held.png',
'assets/goblin.png',
'assets/goblin_projectile.png',
'assets/goblincannon.png',
'assets/goblincannon_projectile.png',
).then(function(assets) {
  showMainScene()
}).catch(function(err) {
  console.log(err)
})
