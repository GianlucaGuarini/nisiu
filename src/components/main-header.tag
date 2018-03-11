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
      color: white;
      margin-bottom: var(--default-size);
      align-items: center;
      justify-content: space-between;
      background: var(--secondary-color);
      padding: var(--default-size);
    }
  </style>
</main-header>