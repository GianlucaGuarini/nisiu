import { Box, Typography, Link } from '@mui/material'

export function MainFooter() {
  const year = new Date().getFullYear()

  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        p: 2,
        mt: 'auto',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Gianluca Guarini &copy; {year}
      </Typography>
      <Link
        href="https://github.com/GianlucaGuarini/nisiu"
        target="_blank"
        rel="noopener noreferrer"
        underline="hover"
      >
        View on GitHub
      </Link>
    </Box>
  )
}
