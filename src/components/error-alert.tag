<error-alert>
  <h1>Ops! Sorry an error occurred...</h1>
  <p class='error'>{opts.error.message}</p>
  <p if={opts.solution}><strong>{opts.solution}</strong></p>

  <style>
    p.error {
      color: var(--error-color);
    }
  </style>
</error-alert>