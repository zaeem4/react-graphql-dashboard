import { lazy } from 'react';
import { Grid, Container } from '@mui/material';
import RecentEnablers from './RecentEnablers';

const Page = lazy(() => import('src/components/Page'));
const PageTitleWrapper = lazy(() => import('src/components/PageTitleWrapper'));
const PageHeader = lazy(() => import('./PageHeader'));
const RecentNfts = lazy(() => import('./RecentEnablers'));

function GrowthEnabler() {
  return (
    <Page title="growth-enabler" isFooter>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <RecentEnablers />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default GrowthEnabler;
