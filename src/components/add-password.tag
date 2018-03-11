<add-password>
  <loader if={ isLoading }></loader>
  <form ref='form' class='pure-form pure-form-stacked' onsubmit={ onSubmit }>
    <label for='password-id'>Insert your id</label>
    <input required='required'
      value={ opts.id }
      readonly={ isLoading || opts.readonly }
      id='password-id'
      name='id'
      type='text'/>
    <label for='password-value'>Insert your value</label>
    <input required='required'
      value={ opts.value }
      readonly={ isLoading }
      id='password-value'
      name='value'
      type='password'/>
    <label>Add some comments to your password</label>
    <textarea name='comment' value={ opts.comment }></textarea>
    <button class={ pure-button: true,  pure-button-primary: !isLoading }>Sumbit</button>
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
      const args = ['id', 'value', 'comment'].map(q => data.get(q))

      if (this.isLoading) return

      this.isLoading = true

      store.addPassword(...args).catch(this.reset)
    }

    store.on('password:added', this.reset)
    store.on('password:removed', this.reset)

    this.on('unmount', () => {
      store.off('password:added', this.reset)
      store.off('password:removed', this.reset)
    })
  </script>

  <style>
    input, button, textarea {
      width: 100%;
    }
  </style>
</add-password>