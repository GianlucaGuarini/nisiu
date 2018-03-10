<lock>
  <main-login if={ !store.user }></main-login>
  <div class='main-wrapper' if={ store.hasMaster && store.user }>
    <div class='pure-u-1-3'>
      <master-password-check></master-password-check>
    </div>
    <div class='pure-u-2-3'>
      <delete-account></delete-account>
    </div>
  </div>
  <master-password-reset if={ !store.hasMaster && store.user }></master-password-reset>

  <script>
    import './master-password-check.tag'
    import './master-password-reset.tag'
    import './delete-account.tag'
    import './main-login.tag'
    import store from '../store'

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
      background: #1f282b;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      padding: 16px;
    }

    label, h1, h2, h3, p {
      color: white;
    }

    .main-wrapper {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }
  </style>
</lock>