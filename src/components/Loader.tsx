import { CircularProgress, Box } from "@mui/material";

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
