<edit-password>
  <loader if={ isLoading }></loader>
  <form ref='form' class='pure-form pure-form-stacked' onsubmit={ onSubmit }>
    <label for='password-id'>Your password id is:</label>
    <input required='required'
      value={ opts.id }
      readonly='readonly'
      id='password-id'
      name='id'
      type='text'/>
    <label for='password-value'>Your password value is:</label>
    <input required='required'
      value={ opts.value }
      readonly={ isLoading }
      id='password-value'
      name='value'
      type='password'/>
    <label>Comments:</label>
    <textarea name='comment' value={ opts.comment }></textarea>
    <button class={ pure-button: true,  button-primary: !isLoading }>Sumbit</button>
  </form>

  <script>
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
      const [id, value, comment] = ['id', 'value', 'comment'].map(q => data.get(q))

      if (this.isLoading) return

      this.isLoading = true

      store.editPassword(id, value, comment, value === opts.value).catch(this.reset)
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
  </style>
</edit-password>