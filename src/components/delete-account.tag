<delete-account>
  <loader if={ isLoading }></loader>
  <form class='pure-form pure-form-stacked' onsubmit={ onSubmit }>
    <p>Deleting your account will allow you to <b>reset your master password</b>. <b>All your saved passwords will be deleted as well</b></p>
    <p if={error}>{error}</p>
    <button class='pure-button button-error'>delete</button>
  </form>

  <script>
    import './loader.tag'

    import store from '../store'

    this.isLoading = false

    this.onSubmit = (e) => {
      e.preventDefault()

      if (this.isLoading) return

      this.isLoading = true

      store.deleteAccount()
        .catch(error => {
          this.isLoading = false
          this.error = error && error.message
          this.update()
        })
    }
  </script>

  <style>
    :scope {
      display: flex;
      padding: var(--default-size);
      background: #feced3;
      margin: var(--double-size) var(--default-size);
      border: 1px solid rgb(202, 60, 60);
      border-radius: var(--half-size);
    }

    form > p {
      color: rgb(202, 60, 60);
    }
  </style>
</delete-account>