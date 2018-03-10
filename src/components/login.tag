<login>
  <loader if={ isAuthenticating }></loader>
  <form if={ !isAuthenticating } onsubmit={ store.user ? logout : login }>
    <button>{ store.user ? 'logout' : 'login' }</button>
  </form>

  <script>
    import store from '../store'
    import './loader.tag'

    this.store = store

    this.login = (e) => {
      e.preventDefault()
      this.update()

      store.login()
        .then(() => this.update())
    }

    this.logout = (e) => {
      e.preventDefault()
      store.logout()
        .then(() => this.update())
    }
  </script>
</login>