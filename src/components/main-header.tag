<main-header>
  <user
    if={ store.user }
    image={ store.user.photoURL }
    name={ store.user.displayName }>
  </user>
  <login></login>

  <script>
    import store from '../store'
    import './user.tag'
    import './login.tag'

    this.store = store
  </script>
  <style>
    :scope {
      display: flex;
      margin-bottom: 16px;
      align-items: center;
      justify-content: space-between;
    }
  </style>
</main-header>