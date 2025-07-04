import {StyledAppBar,StyledToolbar,PageTitle} from '@/styles/style-navbar'
import {Toolbar} from '@mui/material'
interface FixedNavbarProps {
    title: string;
  }
  
  export default function FixedNavbar({ title }: FixedNavbarProps) {
    return (
      <>
        <StyledAppBar>
          <StyledToolbar>
            <PageTitle variant="h6">
              {title}
            </PageTitle>
          </StyledToolbar>
        </StyledAppBar>
        {/* Spacer to prevent content from hiding under navbar */}
        <Toolbar />
      </>
    );
  }