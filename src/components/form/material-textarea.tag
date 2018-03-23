<material-textarea class="mdl-textfield mdl-js-textfield">
  <textarea
    ref='input'
    name={ opts.name }
    class='mdl-textfield__input'
    readonly={opts.readonly}
    value={opts.riotValue}
    rows={opts.rows || 4}
    disabled={opts.disabled}
    id={opts.id}
    required={opts.required}></textarea>
  <label if={opts.label} class="mdl-textfield__label" for="sample5">{opts.label}</label>
  <script>
    this.mixin('material-element')

    this.val = (val) => {
      if (typeof val !== 'undefined') this.refs.input.value = val
      return this.refs.input.value
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
</material-textarea>