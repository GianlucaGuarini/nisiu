<passwords-manager>
  <ul>
    <li each={ password in passwords }>
    </li>
  </ul>

  <script>
    import store from '../store'

    this.passwords = []

    store.fetchPasswords().then((passwords) => {
      console.log(passwords)
    }).catch(console.error)
  </script>
</passwords-manager>