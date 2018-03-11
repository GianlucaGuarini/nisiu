<main-footer>
  <small>Gianluca Guarinig &copy; {new Date().getFullYear()}</small>
  <button class='pure-button button-primary' onclick={ openModal }>
    Reset master password
  </button>
  <script>
    import './master-password-reset.tag'
    import store from '../store'

    this.openModal = () => {
      store.openModal('master-password-reset')
    }
  </script>

  <style>
    :scope {
      color: white;
      display: flex;
      margin-top: auto;
      justify-content: space-between;
      align-items: baseline;
      padding: var(--default-size);
      background: var(--secondary-color);
    }
  </style>
</main-footer>