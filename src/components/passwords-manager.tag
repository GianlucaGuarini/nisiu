<passwords-manager>
  <ul>
    <li each={ password in passwords }>
    </li>
  </ul>

  <script>
    import store from '../store'

    this.passwords = []

    store.on('lock', () => {
      this.passwords = []
    })

    store.on('unlock', () => {
      store.fetchPasswords()
        .then((passwords) => {
          this.passwords = passwords
          this.update()
        })
        .catch(console.error)
    })
  </script>
</passwords-manager>