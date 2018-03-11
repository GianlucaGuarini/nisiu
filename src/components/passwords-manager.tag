<passwords-manager>
  <table class="pure-table">
    <thead>
        <tr>
            <th>#</th>
            <th>Id</th>
            <th>Comment</th>
            <th></th>
            <th></th>
            <th></th>
        </tr>
    </thead>

    <tbody>
      <tr each={ password, i in passwords }>
        <td>{ i }</td>
        <td>{ password.id }</td>
        <td>{ password.comment }</td>
        <td>
          <button class='pure-button' onclick={ reveal(password) }>
            reveal
          </button>
        </td>
        <td>
          <button class='pure-button' onclick={ edit(password) }>
            edit
          </button>
        </td>
        <td>
          <button class='pure-button' onclick={ delete(password) }>
            delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <button class='pure-button pure-button-primary' onclick={ addPassword }>
      Add Password
  </button>

  <script>
    import './modal.tag'
    import './add-password.tag'

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

    this.reveal = (password) => {
      return () => {
        alert(store.reveal(password.value))
      }
    }

    this.delete = (password) => {
      return () => {
        store.deletePassword(password.id)
          .then(this.fetch)
      }
    }

    this.edit = (password) => {
      return () => {

      }
    }

    this.addPassword = () => {
      this.refs.modal.show()
    }

    this.on('mount', () => {
      this.fetch()
      dialogPolyfill.registerDialog(this.refs.dialog)
    })
    store.on('unlock', this.fetch)
    store.on('password:added', this.fetch)

    this.on('unmount', () => {
      store.off('unlock', this.fetch)
      store.off('password:added', this.fetch)
    })
  </script>
</passwords-manager>