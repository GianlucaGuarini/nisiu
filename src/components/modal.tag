<modal>
  <dialog class='mdl-dialog' ref='dialog'>
    <div class='mdl-dialog__content' ref='content'></div>
    <button onclick={ close } class='close'>&times;</button>
  <dialog>

  <script>
    import dialogPolyfill from 'dialog-polyfill'
    import { add, remove } from 'bianco.events'
    import store from '../store'
    import { mount } from 'riot'

    function stopPropagation(e) {
      e.stopPropagation()
    }

    this.isOpened = false

    this.open = (component, data) => {
      if (this.isOpened) return
      this.component = mount(this.refs.content, component, data)[0]
      this.refs.dialog.showModal()
      this.isOpened = true

      add(this.refs.content, 'click', stopPropagation)
      requestAnimationFrame(() => {
        add(window, 'click', this.close)  
      })
    }

    this.close = () => {
      if (!this.isOpened) return
      this.refs.dialog.close()
      this.component.unmount(true)
      this.isOpened = false

      remove(this.refs.content, 'click', stopPropagation)
      remove(window, 'click', this.close)
    }

    this.on('mount', () => {
      dialogPolyfill.registerDialog(this.refs.dialog)
    })

    store.on('modal:open', this.open)
    store.on('modal:close', this.close)
  </script>

  <style>
    .mdl-dialog {
      width: 452px;
    }

    .mdl-dialog__content {
      flex-wrap: wrap;
    }

    .close {
      font-family: 'Arial';
      color: var(--buttons-primary-background-color);
      border: 2px solid var(--buttons-primary-background-color);
      font-size: var(--double-size);
      cursor: pointer;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      top: -20px;
      right: -20px;
      width: 40px;
      height: 40px;
      background: white;
      border-radius: 100%;
    }

    @media (max-width: 462px) {
      .mdl-dialog {
        width: 80vw;
      }
    }
  </style>
</modal>