<passwords-collection>
  <ul>
    <li
      data-is='animore'
      mount={{
        duration: 300,
        opacity: [0, 1],
        translateX: [-100, 0]
      }}
      unmount={{
        duration: 300,
        opacity: [1, 0],
        translateX: [0, -100]
      }}
      key={ password.id }
      each={ password in opts.passwords }>
      <password-collection-item password={password}>
      </password-collection-item>
    </li>
  </ul>

  <script>
    import './password-collection-item.tag'
  </script>

  <style>
    :scope {
      display: block;
      margin-bottom: 16px;
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