<passwords-manager>
  <div class="header">
    <material-button class='add-password' facet='dark' raised={ true } onclick={ addPassword }>
      Add Password
    </material-button>
    <search-input class='search' label='Search password by name...' onsearch={ onSearch }/>
  </div>
  <passwords-collection class='collection' passwords={getPasswords()}>
  </passwords-collection>
  <script>
  import './form/material-button.tag'
  import './form/search-input.tag'
  import './form/material-button.tag'
  import './add-password.tag'
  import './passwords-collection.tag'

  import store from '../store'

  this.passwords = []

  function decryptPassoword(password) {
    return ['name', 'username', 'value', 'comment'].reduce((acc, key) => {
      acc[key] = password[key] ? store.decrypt(password[key]) : ''
      return acc
    }, password)
  }

  function filter(passwords, searchTerm) {
    return passwords.filter(password => {
      return password.name.includes(searchTerm)
    })
  }

  this.getPasswords = () => {
    if (this.searchTerm) return filter(this.passwords, this.searchTerm)
    return this.passwords
  }

  this.fetch = () => {
    store.fetchPasswords()
      .then(passwords => passwords.map(decryptPassoword))
      .then(passwords => {
        this.passwords = passwords
        this.update()
      })
      .catch(console.error)
  }

  this.onSearch = (value) => {
    this.searchTerm = value
    this.update()
  }

  this.addPassword = () => {
    store.openModal('add-password')
  }

  this.on('mount', () => {
    this.fetch()
  })

  store.on('unlock', this.fetch)
  store.on('password:added', this.fetch)
  store.on('password:edited', this.fetch)
  store.on('password:deleted', this.fetch)

  this.on('unmount', () => {
    store.off('unlock', this.fetch)
    store.off('password:added', this.fetch)
    store.off('password:edited', this.fetch)
    store.off('password:deleted', this.fetch)
  })
  </script>

  <style>
  :scope {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: var(--default-size);
    margin-bottom: var(--default-size);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 100%;
  }

  .collection, .search {
    flex: 1 1 100%;
  }

  .search {
    max-width: 280px;
  }


  @media (max-width: 462px) {
    :scope {
      justify-content: center;
    }

    .header {
      flex-direction: column;
    }
  }
  </style>
</passwords-manager>
