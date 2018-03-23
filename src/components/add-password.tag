<add-password>
  <loader if={ isLoading }></loader>
  <form ref='form' onsubmit={ onSubmit }>
    <material-input
      label='Insert your password name'
      required='required'
      readonly={ isLoading }
      id='password-name'
      name='name'
      type='text'/>
    <material-input
      label='Insert your username'
      readonly={ isLoading }
      id='password-username'
      name='username'
      type='text'/>
    <password-input
      label='Insert your password value'
      readonly={ isLoading }
      required='required'
      id='password-value'
      name='value'/>
    <material-textarea
      name='comment'
      id='comment'
      label='Add some comments to your password'/>
    <material-button type='submit' primary={ true } raised={ true } disabled={isLoading}>Save</material-button>
  </form>

  <script>
    import './form/material-button.tag'
    import './form/material-input.tag'
    import './form/material-textarea.tag'
    import './form/password-input.tag'
    import './loader.tag'

    import store from '../store'

    this.isLoading = false

    this.reset = (e) => {
      if (e) console.error(e)
      this.isLoading = false
      this.update()
    }

    this.onSubmit = (e) => {
      e.preventDefault()

      const data = new FormData(this.refs.form)
      const [name, username, value, comment] = ['name', 'username', 'value', 'comment'].map(q => data.get(q))

      if (this.isLoading) return

      this.isLoading = true

      store.addPassword({ name, username, value, comment }).catch(this.reset)
    }

    store.on('password:added', this.reset)

    this.on('unmount', () => {
      store.off('password:added', this.reset)
    })
  </script>

  <style>
    input#password-name, button, textarea {
      width: 100%;
    }
  </style>
</add-password>