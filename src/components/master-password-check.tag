<master-password-check>
  <loader if={ isLoading }></loader>
  <form class='pure-form pure-form-stacked' onsubmit={ onSubmit }>
    <label for='password-check'>Insert your master password</label>
    <input readonly={ isLoading } id='password-check' ref='input' type='password'/>
    <button class={ pure-button: true,  button-primary: !isLoading }>Sumbit</button>
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

      store.unlock(this.refs.input.value)
        .finally(() => {
          this.isLoading = false
          this.update()
        })
    }
  </script>

  <style>
    input, button {
      width: 100%;
    }
  </style>
</master-password-check>