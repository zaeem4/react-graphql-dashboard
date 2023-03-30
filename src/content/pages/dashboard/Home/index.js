import { lazy, useEffect, useState } from 'react';
import { Grid, Container, Card, Typography, CardHeader } from '@mui/material';
import { Box } from '@mui/system';
// import { apiCall } from 'src/utils/axios';
import Payments from './Payments';

const Page = lazy(() => import('src/components/Page'));

function Home() {
  const [data, setData] = useState({
    totalUsers: null,
    totalSoldNfts: null,
    totalWithdrawalReq: null,
    totalRevinew: null
  });

  useEffect(() => {
    const fetchData = async () => {
      
    };

    fetchData();
    return () => {
      setData({
        totalUsers: null,
        totalSoldNfts: null,
        totalWithdrawalReq: null,
        totalRevinew: null
      });
    };
  }, []);

  return (
    <Page title="Home" isFooter>
      <Container maxWidth="lg">
        {data && (
          <Grid
            py={3}
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
            sx={{
              '& .MuiPaper-outlined': {
                height: '100%'
              }
            }}
          >
            <Grid item xs={6} md={3}>
              <Card variant="outlined">
                <CardHeader title="Total NFT Sold" />
                <Box px={2} py={2} alignItems="flex-start">
                  <Typography variant="h3">{data.totalSoldNfts}</Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card variant="outlined">
                <CardHeader title="Total Users" />
                <Box px={2} py={2} alignItems="flex-start">
                  <Typography variant="h3">{data.totalUsers}</Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card variant="outlined">
                <CardHeader title="New Withdrawal Requests " />
                <Box px={2} py={2} alignItems="flex-start">
                  <Typography variant="h3">{data.totalWithdrawalReq}</Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card variant="outlined">
                <CardHeader title="Total Revenue" />
                <Box px={2} py={2} alignItems="flex-start">
                  <Typography variant="h3">{data.totalRevinew}</Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
        )}
        <Payments />
      </Container>
    </Page>
  );
}

export default Home;
