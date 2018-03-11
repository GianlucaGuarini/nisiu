<main-footer>
  <small>Gianluca Guarinig &copy; {new Date().getFullYear()}</small>
  <master-password-reset></master-password-reset>

  <script>
    import './master-password-reset.tag'

    this.on('mount', () => console.log('mounted'))
  </script>

  <style>
    :scope {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
  </style>
</main-footer>