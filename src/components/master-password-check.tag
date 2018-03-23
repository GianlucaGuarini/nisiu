<master-password-check>
  <div if={ isLoading } class='loader'>
    <loader></loader>
  </div>
  <form onsubmit={ onSubmit }>
    <material-input
      ref='input'
      floating={ true }
      readonly={ isLoading }
      required='required'
      id='password-check' type='password'
      label={ opts.isFirstSet ? 'Please create your master password' : 'Insert your master password' }>
    </material-input>
    <material-button primary={ true } raised={ true } disabled={isLoading}>
      {parent.opts.isFirstSet ? 'Create' : 'Unlock' }
    </material-button>
  </form>

  <script>
    import './form/material-input.tag'
    import './form/material-button.tag'
    import './loader.tag'

    import store from '../store'

    this.isLoading = false

    this.onSubmit = (e) => {
      const value = this.refs.input.val()
      e.preventDefault()
      const done = () => {
        this.isLoading = false
        this.update()
      }

      if (this.isLoading) return

      this.isLoading = true
      this.update()

      // set for the first time
      if (opts.isFirstSet) {
        store.setEncryptedKey(value)
          .then(done)
          .catch(done)
      } else {
        // try to unlock
        store.unlock(value)
          .then(done)
          .catch(done)
      }

    }
  </script>

  <style>
    input, button {
      width: 100%;
    }

    .loader {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
  </style>
</master-password-check>