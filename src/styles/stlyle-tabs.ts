import { styled } from '@mui/material/styles';
import {  Tab, Tabs} from '@mui/material';


export const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: 1,
  borderColor: 'divider',
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
  },
  '& .MuiTabs-flexContainer': {
    justifyContent: 'space-between',
  },
}));

export const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  padding: '4px 0px', // Ubah padding di sini
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(1),
  color: 'rgba(0, 0, 0, 0.7)',
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  '&:hover': {
    color: theme.palette.primary.main,
    opacity: 1,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
    padding: '0px',
  },
}));