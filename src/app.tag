<app>
  <loader if={ isLoading }></loader>
  <main if={ !isLoading }>
    <main-header></main-header>
    <main-footer></main-footer>
  </main>
  <script>
    import store from './store'
    import './components/loader.tag'
    import './components/main-header.tag'
    import './components/main-footer.tag'

    this.isLoading = true

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