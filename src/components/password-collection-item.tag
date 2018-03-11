<password-collection-item>
  <p>{ opts.password.id }</p>

  <div class='pure-button-group'>
    <button class='pure-button button-primary' onclick={ reveal }>
      reveal
    </button>
    <button class='pure-button button-secondary' onclick={ edit }>
      edit
    </button>
    <button class='pure-button button-error' onclick={ delete }>
      delete
    </button>
  </div>

  <script>
    import './password-revealer.tag'
    import './edit-password.tag'
    import store from '../store'

    this.reveal = () => {
      store.openModal('password-revealer', {
        value: store.revealPassword(opts.password.value),
        comment: opts.password.comment
      })
    }

    this.delete = () => {
      store.deletePassword(opts.password.id)
    }

    this.edit = () => {
      store.openModal('edit-password', opts.password)
    }
  </script>

  <style>
    :scope {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: var(--default-size);
      padding-right: var(--default-size);

      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      background: rgba(0, 0, 0, 0.05)
    }
  </style>
</password-collection-item>