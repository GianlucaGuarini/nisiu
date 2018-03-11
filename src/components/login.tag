<login>
  <loader if={ isAuthenticating }></loader>
  <form class='pure-form' if={ !isAuthenticating } onsubmit={ store.user ? logout : login }>
    <button class='pure-button button-primary'>{ store.user ? 'logout' : 'login' }</button>
  </form>

  <script>
    import store from '../store'
    import './loader.tag'

    this.store = store

    this.login = (e) => {
      e.preventDefault()
      store.login()
    }

    this.logout = (e) => {
      e.preventDefault()
      store.logout()
    }
  </script>
</login>