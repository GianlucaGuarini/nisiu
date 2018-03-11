<modal>
  <dialog ref='dialog'>
    <div ref='content'></div>
    <button onclick={ close } class='close'>&times;</button>
  <dialog>

  <script>
    import dialogPolyfill from 'dialog-polyfill'
    import store from '../store'
    import { mount } from 'riot'

    this.on('mount', () => {
      dialogPolyfill.registerDialog(this.refs.dialog)
    })

    this.open = (component, data) => {
      this.component = mount(this.refs.content, component, data)[0]
      this.refs.dialog.showModal()
    }

    this.close = () => {
      this.refs.dialog.close()
      this.component.unmount(true)
    }

    store.on('modal:open', this.open)
    store.on('modal:close', this.close)
  </script>

  <style>
    .close {
      position: absolute;
      top: -20px;
      right: -20px;
      font-size: var(--double-size);
      background: white;
      padding: 16px 6px;
      line-height: 0;
      border: 2px solid black;
      border-radius: 100%;
    }
  </style>
</modal>