<edit-password>
  <div if={ isLoading } class='loader'>
    <loader></loader>
  </div>
  <form ref='form' onsubmit={ onSubmit }>
    <material-input
      label='Your password name'
      required='reqired'
      value={opts.name}
      id='password-name'
      name='name'
      type='text'
    />
    <material-input label='Your username value'
      value={ opts.username }
      readonly={ isLoading }
      id='password-username'
      name='username'
      type='text'
    />
    <password-input label='Your password value'
      required='required'
      value={ opts.value }
      readonly={ isLoading }
      id='password-value'
      name='value'
      type='password'
    />
    <material-textarea
      name='comment'
      id='comment'
      value={ opts.comment }
      label='Add some comments to your password'/>
    <input
      value={ opts.id }
      id='password-id'
      name='id'
      type='hidden'/>
    <material-button type='submit' primary={ true } raised={ true } disabled={isLoading}>Save</material-button>
  </form>

  <script>
    import './form/material-input.tag'
    import './form/material-button.tag'
    import './form/password-input.tag'
    import './loader.tag'

    import store from '../store'

    this.isLoading = false

    this.reset = () => {
      this.isLoading = false
      this.update()
    }

    this.onSubmit = (e) => {
      e.preventDefault()

      const data = new FormData(this.refs.form)
      const [id, name, username, value, comment] = ['id', 'name', 'username', 'value', 'comment'].map(q => data.get(q))

      if (this.isLoading) return

      this.isLoading = true

      store.editPassword({id, name, username, value, comment}).catch(this.reset)
    }

    store.on('password:edited', this.reset)

    this.on('unmount', () => {
      store.off('password:edited', this.reset)
    })
  </script>

  <style>
    input, button, textarea {
      width: 100%;
    }

    .loader {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
  </style>
</edit-password>