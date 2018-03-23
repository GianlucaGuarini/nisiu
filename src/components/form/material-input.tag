<material-input class={classes}>
  <input
    ref='input'
    name={ opts.name }
    class='mdl-textfield__input'
    readonly={opts.readonly}
    value={opts.riotValue}
    id={opts.id}
    disabled={opts.disabled}
    required={opts.required}
    type={opts.type} />
  <label if={opts.label} for={opts.id} class='mdl-textfield__label'>{opts.label}</label>
  <span each={error in opts.errors } class='mdl-textfield__error'>{error}</span>
  <script>
    this.mixin('material-element')

    this.classes = {
      'mdl-textfield': true,
      'mdl-js-textfield': true,
      'mdl-textfield--floating-label': opts.floating || false,
      [`mdl-textfield--${opts.facet || 'base'}`]: true
    }

    this.on('update', () => {
      this.classes['is-invalid'] = opts.errors && opts.errors.length
      this.classes['is-dirty'] = !!this.refs.input.value || opts.riotValue
    })

    this.val = (val) => {
      if (typeof val !== 'undefined') this.refs.input.value = val
      return unescape(encodeURIComponent(this.refs.input.value))
    }
  </script>

  <style>
    :scope.mdl-textfield {
      appearance: none;
      -webkit-appearance: none;
      width: 100%;
    }

    .mdl-textfield__input {
      width: 100%;
    }
  </style>
</material-input>