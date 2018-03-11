<master-password-reset>
  <loader if={ isLoading }></loader>
  <form class='pure-form pure-form-stacked' onsubmit={ onSubmit }>
    <label for='password-reset'>Set your master password</label>
    <input readonly={ isLoading } ref='input' id='password-reset' type='password'/>
    <button class={ pure-button: true,  pure-button-primary: !isLoading }>Sumbit</button>
  </form>

  <script>
    import './loader.tag'

    import store from '../store'

    this.isLoading = false

    this.onSubmit = (e) => {
      e.preventDefault()

      if (this.isLoading) return

      this.isLoading = true
      this.update()

      store.setEncryptedKey(this.refs.input.value)
        .finally(() => {
          this.isLoading = false
          this.refs.input.value = ''
          this.update()
        })
    }
  </script>

  <style>
    input, button {
      width: 100%;
    }
  </style>
</master-password-reset>