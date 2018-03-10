<lock>
  <loader if={ isLoading }></loader>
  <h1>Insert your master password</h1>
  <form onsubmit={ validateLock }>
    <input readonly={ isLoading } ref="password" type="password"/>
    <button>Sumbit</button>
  </form>

  <h1>Set/Update your master password</h1>
  <form onsubmit={ setMasterPassword }>
    <input readonly={ isLoading } ref="master" type="password"/>
    <button>Sumbit</button>
  </form>

  <script>
    import './loader.tag'
    import store from '../store'

    this.isLoading = false

    this.validateLock = (e) => {
      e.preventDefault()
      if (this.isLoading) return

      this.isLoading = true

      store.unlock(this.refs.master.value).catch((error) => {
        this.isLoading = false
        this.update()
      })
    }

    this.setMasterPassword = (e) => {
      e.preventDefault()
      if (this.isLoading) return

      this.isLoading = true

      store.setMasterPassword(this.refs.master.value).catch(() => {
        this.isLoading = false
        this.update()
      })
    }
  </script>

  <style>
    :scope {
      position: fixed;
      flex-direction: column;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ade5fb;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      padding: 16px;
    }
  </style>
</lock>