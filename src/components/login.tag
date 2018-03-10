<login>
  <loader if={ isAuthenticating }></loader>
  <form if={ !isAuthenticating } onsumbit={ login }>
    <button>{ user ? 'logout' : 'login' }</button>
  </form>

  <script>
    import store from '../store'
    import './loader.tag'

    this.user = store.user

    this.login = () => {
      this.update()
      store.login()
        .then(this.onAuthenticated)
    }

    this.onAuthenticated = () => {
      this.update()
    }
  </script>
</login>