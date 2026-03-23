import { mount, register } from 'riot'
import App from './app.riot'
import store from './store.js'
import './riot-mixins.js'
import './sw-registration.js'


register('app', App)


export default {
  store,
  app: mount('app', { store })[0],
}
