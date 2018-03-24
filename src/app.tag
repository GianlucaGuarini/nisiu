<app>
  <div class='main-loader' if={ isLoading }>
    <loader></loader>
  </div>

  <lock if={ !isLoading && store.isLocked } ></lock>

  <main if={ !store.isLocked && !isLoading }>
    <main-header></main-header>
    <passwords-manager></passwords-manager>
    <main-footer></main-footer>
  </main>
  <modal></modal>

  <script>
    import { add } from 'bianco.events'
    import database from './database'
    import './components/modal.tag'
    import './components/error-alert.tag'
    import './components/passwords-manager.tag'
    import './components/lock.tag'
    import './components/loader.tag'
    import './components/main-header.tag'
    import './components/main-footer.tag'

    this.isLoading = true
    this.store = opts.store

    this.onReady = (result) => {
      this.isLoading = false
      this.update()
    }

    this.store.init(database)
      .then(this.onReady)
      .catch(this.onReady)

    this.store
      .on('login', this.update)
      .on('logout', this.update)
      .on('lock', this.update)
      .on('unlock', this.update)

    if (window.location.hostname !== 'localhost') {
      add(window, 'blur', () => {
        this.store.lock()
        this.update()
      })
    }
  </script>

  <style>
    main {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 100vh;
      flex: 1 1 100%;
    }

    .main-loader {
      position: fixed;
      top: 50%;
      left: 50%;
      display: block;
      transform: translate(-50%, -50%);
    }
  </style>
</app>