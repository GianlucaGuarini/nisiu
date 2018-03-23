import { mount } from 'riot'
import store from './store'
import 'riot-animore'
import './riot-mixins'
import './app.tag'


export default {
  store,
  app: mount('app', store)[0]
}