<passwords-manager>
  <passwords-collection passwords={passwords}>
  </passwords-collection>

  <button class='pure-button pure-button-primary' onclick={ addPassword }>
    Add Password
  </button>

  <script>
  import './add-password.tag'
  import './passwords-collection.tag'

  import store from '../store'

  this.passwords = []

  this.fetch = () => {
    store.fetchPasswords()
    .then((passwords) => {
      this.passwords = passwords
      this.update()
    })
    .catch(console.error)
  }

  this.addPassword = () => {
    store.openModal('add-password')
  }

  this.on('mount', () => {
    this.fetch()
  })

  store.on('unlock', this.fetch)
  store.on('password:added', this.fetch)
  store.on('password:deleted', this.fetch)

  this.on('unmount', () => {
    store.off('unlock', this.fetch)
    store.off('password:added', this.fetch)
    store.off('password:deleted', this.fetch)
  })
  </script>

  <style>
  table {
    width: 100%;
    margin-bottom: 16px;
  }
  </style>
</passwords-manager>