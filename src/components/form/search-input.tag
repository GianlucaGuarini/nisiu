<search-input>
  <form onsubmit={ search }>
    <material-input oninput={ search } ref='search' label={opts.label} type='search' name='search' id='search'/>
    <material-button icon={true}>
      <i class='material-icons'>search</i>
    </material-button>
  </form>

  <script>
    import './material-input.tag'
    import './material-button.tag'

    this.search = (e) => {
      if (e.type === 'submit') e.preventDefault()
      const value = this.refs.search.val()
      if (opts.onsearch) opts.onsearch(value)
      e.preventUpdate = true
    }

    this.mixin('material-element')
  </script>
  <style>
    :scope {
      display: flex;
      appearance: none;
      -webkit-appearance: none;
    }
    
    form {
      display: flex;
      align-items: center;
      flex: 1 1 100%;
    }
  </style>
</search-input>