// import PropTypes from 'prop-types';
import { Box, Typography, Card, Tooltip, Avatar, Stack, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';

const AvatarWrapper = styled(Card)(({ theme }) => ({
  position: 'relative',
  overflow: 'visible',
  display: 'inline-block',
  '.MuiAvatar-root': {
    width: theme.spacing(12),
    height: theme.spacing(12)
  },
  [theme.breakpoints.down('md')]: {
    '.MuiAvatar-root': {
      width: theme.spacing(8),
      height: theme.spacing(8)
    }
  }
}));
const TitleTypography = styled(Typography)(({ theme }) => ({
  wordWrap: 'break-word',
  [theme.breakpoints.down('md')]: {
    fontSize: '16px',
    maxWidth: '40vw'
  }
}));

const ProfileCover = ({ user }) => {
  const navigate = useNavigate();
  return (
    <Stack direction="row" alignItems={'center'} justifyContent={'space-between'}>
      <Box display="flex" alignItems={'center'}>
        <Tooltip arrow placement="top" title="Go back">
          <IconButton color="primary" onClick={() => navigate(-1)}>
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip>
        <TitleTypography variant="h3" component="h3" gutterBottom>
          {user.name}
        </TitleTypography>
      </Box>
      <AvatarWrapper>
        <Avatar variant="rounded" alt={user.name} src={user.profilePicture} />
      </AvatarWrapper>
    </Stack>
  );
};

export default ProfileCover;
