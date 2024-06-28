/* global componentHandler */
import { mixin } from 'riot'
import generateRandomId from './util/random-id'

mixin('material-element', {
  init() {
    this.uid = generateRandomId()

    this.on('mount', () => {
      componentHandler.upgradeElement(this.root)
    })

    this.on('unmount', () => {
      componentHandler.downgradeElements([this.root])
    })
  },
})
