<app>
  <loader if={ isLoading }></loader>
  <main if={ !isLoading }>
    <main-header></main-header>
  </main>
  <script>
    import store from './store'
    import './components/loader.tag'
    import './components/main-header.tag'

    this.isLoading = true

    this.onReady = () => {
      this.isLoading = false
      this.update()
    }

    store.init()
      .then(this.onReady)
      .catch(this.onReady)
  </script>
</app>