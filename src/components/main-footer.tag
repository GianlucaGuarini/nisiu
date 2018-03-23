<main-footer>
  <material-button accent={true} onclick={ openModal }>
    Reset master password
  </material-button>
  <small>Gianluca Guarini &copy; {new Date().getFullYear()}</small>
  <a class='logo' target='_blank' href='https://github.com/GianlucaGuarini/nisiu'>
    <img width='48' alt='nisiu' src='assets/images/nisiu.png'/>
  </a>
  <script>
    import './form/material-button.tag'
    import './master-password-reset.tag'
    import store from '../store'

    this.openModal = () => {
      store.openModal('master-password-reset')
    }
  </script>

  <style>
    :scope {
      display: flex;
      flex-wrap: wrap;
      margin-top: auto;
      justify-content: space-between;
      align-items: baseline;
      padding: var(--default-size);
    }

    small {
      margin-left: auto;
      margin-right: var(--half-size);
    }

    .logo {
      display: flex;
      align-items: center;
    }

    @media (max-width: 462px) {
      :scope {
        text-align: center;
        justify-content: center;
      }

      .logo {
        justify-content: center;
      }

      .logo, small, material-button {
        margin: var(--half-size) auto;
        width: 100%;
      }
    }
  </style>
</main-footer>