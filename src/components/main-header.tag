<main-header>
  <user
    class='user'
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
      margin-bottom: var(--default-size);
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      align-items: center;
      justify-content: space-between;
      padding: var(--default-size);
    }
  </style>
</main-header>