'use client'
import { Plus } from "lucide-react";
import { Fab, Box, useTheme, useMediaQuery } from "@mui/material";

const FabContainer = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      position: "fixed",
      bottom: { xs: 72, sm: 32 },
      right: { xs: 16, sm: 24 },
      zIndex: (theme) => theme.zIndex.fab,
    }}
  >
    {children}
  </Box>
);

const FloatingBottom = ({ handleAddNew }: { handleAddNew: () => void }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <FabContainer>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleAddNew}
        size={isMobile ? "medium" : "large"}
        sx={{
          bgcolor: theme.palette.primary.main,
          "&:hover": {
            bgcolor: theme.palette.primary.dark,
          },
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Plus />
      </Fab>
    </FabContainer>
  );
};

export default FloatingBottom