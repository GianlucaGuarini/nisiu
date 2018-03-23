<password-input>
  <div class='password-wrapper'>
    <div class='password-input'>
      <material-input
        ref='password'
        facet='password'
        label={ opts.label }
        readonly={ opts.readonly }
        disabled={opts.disabled}
        required={opts.required}
        value={ value }
        type={ passwordInputType }
        name={ opts.name }
        id={ opts.id }
      />
    </div>
    <div class='password-button' if={ passwordInputType !== 'password' }>
      <material-button
        type='button'
        fab={ true }
        facet='small-icon'
        primary={ true }
        title='copy'
        onclick={ copy }>
        <i class='material-icons'>assignment_return</i>
      </material-button>
    </div>
    <div class='password-button' if={ !opts.disableEditButton }>
      <material-button
        type='button'
        fab={ true }
        facet='small-icon'
        accent={ true }
        title='autogenerate a password'
        onclick={ autogenerate }>
        <i class='material-icons'>autorenew</i>
      </material-button>
    </div>
    <div class='password-button' if={ !opts.disableEditButton }>
      <material-button
        type='button'
        facet='small-icon'
        fab={ true }
        primary={ true }
        title={ passwordInputType === 'password' ? 'show password' : 'hide password' }
        onmousedown={ toggle }>
        <i class='material-icons'>{ parent.passwordInputType === 'password' ? 'visibility' : 'visibility_off' }</i>
      </material-button>
    </div>
  </div>

  <script>
    import generatePassword from '../../util/password-generator'
    import { USER_KEY_LENGHT } from '../../store'
    import './material-input.tag'
    import './material-button.tag'

    this.passwordInputType = opts.passwordInputType || 'password'

    this.value = opts.riotValue

    this.toggle = (e) => {
      e.preventDefault()
      this.passwordInputType = this.passwordInputType === 'password' ? 'text' : 'password'
    }

    this.autogenerate = (e) => {
      e.preventDefault()

      this.value = generatePassword(USER_KEY_LENGHT)
    }

    this.copy = (e) => {
      e.preventDefault()
      const input = this.refs.password.refs.input
      input.select()
      document.execCommand('copy')
    }
  </script>

  <style>
    .password-wrapper {
      display: flex;
      align-items: center;
    }

    .password-input {
      flex: 1 1 100%;
      margin-right: var(--half-size);
    }

    .password-button {
      margin-left: var(--half-size);
    }

    @media (max-width: 462px) {
      .password-wrapper {
        flex-wrap: wrap;
        justify-content: space-between;
      }

      .password-input {
        margin: 0;
      }

      .password-button {
        margin: 0 auto;
      }
    }
  </style>
</password-input>