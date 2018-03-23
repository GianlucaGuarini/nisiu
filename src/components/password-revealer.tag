<password-revealer>
  <dl>
    <dt>Name:</dt>
    <dd><material-input readonly={true} value={ opts.name }/></dd>
    <virtual if={opts.username}>
      <dt>Usrname:</dt>
      <dd><material-input readonly={true} value={ opts.username }/></dd>
    </virtual>
    <dt>Value:</dt>
    <dd><password-input disable-edit-button={ true } password-input-type='text' readonly={true} value={ opts.value }/></dd>
    <virtual if={opts.comment}>
      <dt>Comment:</dt>
      <dd><material-textarea readonly={true} value={ opts.comment }/></dd>
    </virtual>
  </dl>

  <script>
    import './form/material-input.tag'
    import './form/password-input.tag'
    import './form/material-textarea.tag'
  </script>

  <style>
    dl, dd, dt {
      padding: 0;
      margin: 0;
    }
  </style>
</password-revealer>