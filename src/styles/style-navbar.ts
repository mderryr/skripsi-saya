'use client'
import { AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: '#ffffff', // or theme.palette.background.paper
    color: theme.palette.text.primary,
    boxShadow: '0 1px 3px rgba(0,0,0,0.12)', // subtle shadow
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.appBar,
  }));
  
export  const StyledToolbar = styled(Toolbar)({
    minHeight: '56px', // smaller height for mobile
    display: 'flex',
    justifyContent: 'center', // center the title
    padding: '0 16px',
  });
  
  export const PageTitle = styled(Typography)(({ theme }) => ({
    fontSize: '1.125rem', // 18px
    fontWeight: 600,
    textAlign: 'center',
    color: theme.palette.text.primary,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem', // 16px for mobile
    },
  }));