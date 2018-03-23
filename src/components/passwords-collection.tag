<passwords-collection>
  <ul class='mdl-list'>
    <li data-is='password-collection-item'
      class='mdl-list__item mdl-shadow--2dp'
      key={ password.id }
      each={ password in opts.passwords }
      password={password}>
    </li>
  </ul>

  <script>
    import './password-collection-item.tag'
  </script>

  <style>
    :scope {
      display: block;
      margin-bottom: var(--default-size);
    }

    ul {
      padding: 0;
      margin: 0;
    }

    ul li {
      padding: 0;
      margin: 0;
      list-style: none;
    }
  </style>
</passwords-collection>