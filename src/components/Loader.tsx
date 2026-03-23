import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <CircularProgress sx={{ color: "primary.main" }} />
    </Box>
  );
}
