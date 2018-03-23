<login>
  <form onsubmit={ store.user ? logout : login }>
    <material-button
      ripple={ true }
      colored={ true }
      raised={ true }
      floating={ true }>{ parent.store.user ? 'logout' : 'login' }
    </material-button>
  </form>

  <script>
    import store from '../store'
    import './form/material-button.tag'

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