import { lazy } from 'react';
import { Grid, Container } from '@mui/material';

const Page = lazy(() => import('src/components/Page'));
const PageTitleWrapper = lazy(() => import('src/components/PageTitleWrapper'));
const PageHeader = lazy(() => import('./PageHeader'));
const RecentWithdrawals = lazy(() => import('./RecentWithdrawals'));

function Withdrawals() {
  return (
    <Page title="Withdrawals" isFooter>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <RecentWithdrawals />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default Withdrawals;
