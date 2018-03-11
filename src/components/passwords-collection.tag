<passwords-collection>
  <ul>
    <li
      data-is='animore'
      mount={{
        duration: 500,
        opacity: [0, 1],
        translateX: [-120, 0]
      }}
      unmount={{
        duration: 500,
        opacity: [1, 0],
        translateX: [0, -120]
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
      overflow: hidden;

      border-top: 1px solid rgba(0, 0, 0, 0.1);
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