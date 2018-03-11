<password-collection-item>
  <p>{ opts.password.id }</p>

  <div class='pure-button-group'>
    <button class='pure-button' onclick={ reveal }>
      reveal
    </button>
    <button class='pure-button' onclick={ edit }>
      edit
    </button>
    <button class='pure-button' onclick={ delete }>
      delete
    </button>
  </div>

  <script>
    import './password-revealer.tag'
    import './add-password.tag'
    import store from '../store'

    const password = opts.password

    this.reveal = () => {
      store.openModal('password-revealer', {
        value: store.revealPassword(password.value),
        comment: password.comment
      })
    }

    this.delete = () => {
      store.deletePassword(password.id)
    }

    this.edit = () => {
      store.openModal('add-password', {
        readonly: true,
        ...password
      })
    }
  </script>

  <style>
    :scope {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  </style>
</password-collection-item>