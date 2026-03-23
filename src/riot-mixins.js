import { install } from 'riot'

install(function(component) {

  const originalOnUnmount = component.onUnmounted
  const originalOnMounted = component.onMounted

  component.onMounted = function (props, state) {
    window.componentHandler.upgradeElement(component.root)
    if (originalOnUnmount) originalOnMounted.call(component, props, state)
  }
  component.onUnmounted = function(props, state) {
    window.componentHandler.downgradeElements([component.root])
    if (originalOnUnmount) originalOnUnmount.call(component, props, state)
  }
})
