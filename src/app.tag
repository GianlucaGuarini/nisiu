<app>
  <loader if={ isLoading }></loader>
  <lock if={ !isLoading && store.isLocked() } ></lock>
  <main data-is="animore" if={ !store.isLocked() && !isLoading }>
    <main-header></main-header>
    <passwords-manager></passwords-manager>
    <main-footer></main-footer>
  </main>

  <script>
    import store from './store'

    import './components/passwords-manager.tag'
    import './components/lock.tag'
    import './components/loader.tag'
    import './components/main-header.tag'
    import './components/main-footer.tag'

    this.isLoading = true
    this.store = store

    this.onReady = () => {
      this.isLoading = false
      this.update()
    }

    store.init()
      .then(this.onReady)
      .catch(this.onReady)

    store
      .on('login', this.update)
      .on('logout', this.update)
      .on('lock', this.update)
      .on('unlock', this.update)
  </script>

  <style>
    main {
      padding: 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 100vh;
      flex: 1 1 100%;
    }
  </style>
</app>