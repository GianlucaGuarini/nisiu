<material-button>
  <button type={opts.type} disabled={opts.disabled} readonly={opts.readonly} class={classes}>
    <yield/>
  </button>
  <script>
    this.mixin('material-element')

    this.classes = {
      'mdl-button': true,
      'mdl-js-button': true,
      'mdl-js-ripple-effect': opts.ripple || false,
      'mdl-button--raised': opts.raised || false,
      'mdl-button--accent': opts.accent || false,
      'mdl-button--primary': opts.primary || false,
      'mdl-button--colored': opts.colored || false,
      'mdl-button--fab': opts.fab || false,
      'mdl-button--icon': opts.icon || false,
      [`mdl-button--${opts.facet || 'base'}`]: true
    }
  </script>
  <style>
    :scope,
    :scope[type='button'] {
      appearance: none;
      -webkit-appearance: none;
    }
  </style>
</material-button>