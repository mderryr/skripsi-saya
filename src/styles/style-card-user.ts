import { styled } from "@mui/material/styles";
import { Card, Box } from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: '400px', // Anda bisa menyesuaikan nilai ini
  margin: '1rem auto', // 'auto' di sisi kanan dan kiri akan memusatkan card
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
  },
}));

export const UserInfoRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(1.5),
  gap: theme.spacing(1),
}));

export const StyledIcon = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 24,
  height: 24,
  color: theme.palette.text.secondary,
}));
