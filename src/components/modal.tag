<modal>
  <div>
    hello
  <div>
  <script>
    console.log(this)
    this.on('mount', () => {
      console.log('mount')
    })
    this.on('update', () => {
      console.log('update')
    })
  </script>
</modal>