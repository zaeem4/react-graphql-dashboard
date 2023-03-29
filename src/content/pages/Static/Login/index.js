import { lazy, useEffect, useState } from 'react';

import { Box, Stack, Container, Typography, CircularProgress, Paper, Backdrop } from '@mui/material';
import { styled } from '@mui/material/styles';

import useResponsive from 'src/hooks/useResponsive';

import LoginPost from 'src/assest/LoginSlide.svg';

const Page = lazy(() => import('src/components/Page'));
const Logo = lazy(() => import('src/components/Logo'));
const LoginForm = lazy(() => import('./LoginForm'));

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: '50%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.dark
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Login() {
  const mdUp = useResponsive('up', 'md');

  const [loading, setloading] = useState(true);

  useEffect(() => {
    setloading(false);
    return () => {};
  }, []);

  return (
    <Page title="Login">
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <RootStyle>
        <Container maxWidth="sm">
          <ContentStyle>
            <Stack sx={{ textAlign: 'center', marginTop: '-5rem' }}>
              <Logo
                sx={{
                  width: '10rem',
                  height: '10rem'
                }}
              />
            </Stack>
            <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  Sign in to Vise Wealth
                </Typography>

                <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
              </Box>
            </Stack>

            {loading ? (
              <Box sx={{ textAlign: 'center', mt: '4rem' }}>
                <CircularProgress />
              </Box>
            ) : (
              <LoginForm />
            )}
          </ContentStyle>
        </Container>
        {mdUp && (
          <SectionStyle>
            <Box sx={{ textAlign: 'center', mt: '5rem' }}>
              <Box src={LoginPost} component="img" sx={{ width: '600px', height: 'auto' }} />
            </Box>
          </SectionStyle>
        )}
      </RootStyle>
    </Page>
  );
}
