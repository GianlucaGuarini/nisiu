<lock>
  <login if={ !store.user }></login>
  <master-password-check if={ store.hasMaster && store.user }></master-password-check>
  <master-password-reset if={ !store.hasMaster }></master-password-reset>

  <script>
    import './master-password-check.tag'
    import './master-password-reset.tag'
    import './login.tag'
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

    label {
      color: white;
    }
  </style>
</lock>