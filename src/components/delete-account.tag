<delete-account>
  <div if={ isLoading } class='loader'>
    <loader></loader>
  </div>
  <form onsubmit={ onSubmit }>
    <p>Deleting your account will allow you to <b>reset your master password</b>. <b>All your saved passwords will be deleted as well</b></p>
    <p if={error}>{error}</p>
    <material-button facet='error'>Delete</material-button>
  </form>

  <script>
    import './loader.tag'
    import './form/material-button.tag'

    import store from '../store'

    this.isLoading = false

    this.onSubmit = (e) => {
      e.preventDefault()

      const done = (error) => {
        this.isLoading = false
        this.error = error && error.message
        this.update()
      }

      if (this.isLoading) return

      this.isLoading = true

      store.deleteAccount()
        .then(done)
        .catch(done)
    }
  </script>

  <style>
    :scope {
      display: flex;
      padding: var(--default-size);
      margin: var(--double-size) var(--default-size);
    }

    form > p {
      color: rgb(202, 60, 60);
    }

    .loader {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
  </style>
</delete-account>