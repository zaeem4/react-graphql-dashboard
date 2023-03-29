import { Typography, Button, Box, alpha, lighten, Avatar, styled } from '@mui/material';
import DocumentScannerTwoToneIcon from '@mui/icons-material/DocumentScannerTwoTone';
import AddAlertTwoToneIcon from '@mui/icons-material/AddAlertTwoTone';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const AvatarPageTitle = styled(Avatar)(
  ({ theme }) => `
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      border-radius: 50%;
      color: ${theme.colors.primary.main};
      margin-right: ${theme.spacing(2)};
      background: ${theme.palette.mode === 'dark' ? theme.colors.alpha.trueWhite[10] : theme.colors.alpha.white[50]};
      box-shadow: ${
        theme.palette.mode === 'dark'
          ? '0 1px 0 ' +
            alpha(lighten(theme.colors.primary.main, 0.8), 0.2) +
            ', 0px 2px 4px -3px rgba(0, 0, 0, 0.3), 0px 5px 16px -4px rgba(0, 0, 0, .5)'
          : '0px 2px 4px -3px ' + alpha(theme.colors.alpha.black[100], 0.4) + ', 0px 5px 16px -4px ' + alpha(theme.colors.alpha.black[100], 0.2)
      };
`
);
const ProfileImg = styled('img')(
  ({ theme }) => `
      width: inherit;
`
);

function PageHeader() {
  const location = useLocation();
  const user = location.state.user;

  return (
    <Box display="flex" alignItems={{ xs: 'stretch', md: 'center' }} flexDirection={{ xs: 'column', md: 'row' }} justifyContent="space-between">
      <Box display="flex" alignItems="center">
        <AvatarPageTitle variant="rounded">
          <ProfileImg style={{ width: 'inherit' }} src={user.profilePicture} alt="avatar" />
        </AvatarPageTitle>
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            Welcome, {user.name}!
          </Typography>
          <Typography variant="subtitle2">{user.email}</Typography>
        </Box>
      </Box>
      <Box mt={{ xs: 3, md: 0 }}>
        <Button variant="contained" startIcon={<DocumentScannerTwoToneIcon />}>
          Export
        </Button>
      </Box>
    </Box>
  );
}

export default PageHeader;
