<master-password-reset>
  <div if={ isLoading } class='loader'>
    <loader></loader>
  </div>
  <form onsubmit={ onSubmit }>
    <material-input
      ref='old-password'
      errors={errors[0]}
      floating={ true }
      readonly={isLoading}
      required='required'
      type='password'
      label='Old Password'
      id='password-old'>
    </material-input>
    <material-input
      ref='input'
      errors={errors[1]}
      floating={ true }
      readonly={isLoading}
      required='required'
      type='password'
      label='Set your new master password'
      id='password-reset'>
    </material-input>
    <material-input
      ref='input-validation'
      errors={errors[2]}
      floating={ true }
      readonly={isLoading}
      required='required'
      type='password'
      label='Set your new master password again'
      id='password-reset2'>
    </material-input>
    <material-button primary={ true } raised={ true } disabled={isLoading}>Submit</material-button>
  </form>

  <script>
    import './form/material-input.tag'
    import './form/material-button.tag'
    import './loader.tag'

    import store from '../store'

    this.isLoading = false
    this.errors = [[], [], []]

    this.validate = async () => {
      const old = this.refs['old-password'].val()
      const newvalue = this.refs.input.val()
      const newvalueConfirm = this.refs['input-validation'].val()
      const canUnlock = await store.unlock(old)

      if (!canUnlock) {
        this.errors[0] = ['Please make sure your old password is correct']
      } else {
        this.errors[0] = []
      }

      if (newvalue !== newvalueConfirm) {
        this.errors[1] = ['Please make sure the new value is properly written']
        this.errors[2] = ['The new value does not correspond to the one inserted above']
      } else {
        this.errors[1] = this.errors[2] = []
      }

      this.isLoading = false
      this.update()

      return this.errors.every(list => !list.length)
    }

    this.onSubmit = async (e) => {
      e.preventDefault()
      const done = (e) => {
        if (this.isMounted) {
          this.isLoading = false
          this.refs['old-password'].val('')
          this.refs.input.val('')
          this.refs['input-validation'].val('')
          this.update()
        }
      }

      if (this.isLoading) return

      this.isLoading = true

      const isValid = await this.validate()

      if (!isValid) return

      store.setEncryptedKey(this.refs.input.val())
        .then(done)
        .catch(done)
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
</master-password-reset>