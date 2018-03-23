<password-collection-item onclick={ reveal }>
  <div class='mdl-list__item-primary-content'>
    { opts.password.name }
  </div>

  <div class='mdl-list__item-secondary-content'>
    <material-button title='edit' primary={true} fab={ true }  onclick={ edit }>
      <i class='material-icons'>edit</i>
    </material-button>
  </div>
  <div class='mdl-list__item-secondary-content'>
    <material-button facet='error' title='delete' fab={ true }  onclick={ delete }>
      <i class='material-icons'>delete</i>
    </material-button>
  </div>

  <script>
    import './form/material-button.tag'
    import './password-revealer.tag'
    import './edit-password.tag'
    import store from '../store'

    this.reveal = (e) => {
      e.stopPropagation()
      store.openModal('password-revealer', {
        name: opts.password.name,
        username: opts.password.username,
        value: opts.password.value,
        comment: opts.password.comment
      })
    }

    this.delete = (e) => {
      e.stopPropagation()
      store.deletePassword(opts.password.id)
    }

    this.edit = (e) => {
      e.stopPropagation()
      store.openModal('edit-password', opts.password)
    }
  </script>

  <style>
    :scope {
      cursor: pointer;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      padding-left: var(--default-size);
      padding-right: var(--default-size);
      background: var(--body-background);
    }

    @media (max-width: 462px) {
      .mdl-list__item-primary-content {
        text-align: center;
        justify-content: center;
        width: 100%;
        margin-bottom: var(--default-size);
      }

      .mdl-list__item-secondary-content {
        margin: 0 auto;
      }
    }
  </style>
</password-collection-item>