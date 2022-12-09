import { init, Scene, Sprite, GameObject } from '../../lib/kontra.min.mjs'
import Player from '../objects/player.js'

const { canvas } = init()

const createScene = () => Scene({
  id: 'main',
  objects: [Player],
})

export default createScene