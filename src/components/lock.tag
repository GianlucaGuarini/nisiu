<lock>
  <img class='logo' width='30%' src='assets/images/nisiu.png' />
  <main-login if={ !store.user }></main-login>
  <div class='main-wrapper' if={ store.user }>
    <div>
      <master-password-check is-first-set={!store.encryptedKey}></master-password-check>
    </div>
    <div class='delete-account'>
      <material-button facet='error' onclick={ openDeleteAccountOverlay }>
        Delete Account
      </material-button>
    </div>
  </div>
  <login class='login-logout' if={ !store.encryptedKey && store.user } class='login-logout'></login>

  <script>
    import './form/material-button.tag'
    import './login.tag'
    import './master-password-check.tag'
    import './delete-account.tag'
    import './main-login.tag'
    import store from '../store'

    this.openDeleteAccountOverlay = () => {
      store.openModal('delete-account')
    }

    this.store = store
  </script>

  <style>
    :scope {
      text-align: center;
      position: fixed;
      flex-direction: column;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      padding: 16px;
    }

    .logo {
      margin-bottom: var(--default-size);
      width: 240px;
      max-width: 240px;
    }

    .delete-account {
      position: absolute;
      bottom: var(--default-size);
      right: var(--default-size);
    }

    .login-logout {
      position: absolute;
      bottom: var(--default-size);
      left: var(--default-size);
    }

    .main-wrapper {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }
  </style>
</lock>