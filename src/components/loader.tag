<loader>
  <style>
    :scope {
      display: block;
      border: 2px solid #f3f3f3; /* Light grey */
      border-top: 2px solid var(--buttons-primary-background-color); /* Blue */
      border-radius: 50%;
      width: var(--double-size);
      height: var(--double-size);
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
</loader>