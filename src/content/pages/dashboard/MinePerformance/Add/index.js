import { lazy } from 'react';
import { Grid, Container, Card, CardHeader, CardContent, Divider } from '@mui/material';

const Page = lazy(() => import('src/components/Page'));
const PageTitleWrapper = lazy(() => import('src/components/PageTitleWrapper'));
const PageHeader = lazy(() => import('./PageHeader'));
const Form = lazy(() => import('./MinePerformanceForm'));
const CostForm = lazy(() => import('./MinePerformanceCosts'));
const DailySoilProcessedForm = lazy(() => import('./MinePerformanceSoildProcessed'));

function MinePerformance() {
  return (
    <Page title="Add Mine Performance" isFooter>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Add Mine Performance Daily Soil Processed" />
              <Divider />
              <CardContent>
                <DailySoilProcessedForm />
              </CardContent>
            </Card>
            <Card style={{marginTop:"1rem"}}>
              <CardHeader title="Add New Mine Performance Costs" />
              <Divider />
              <CardContent>
                <CostForm />
              </CardContent>
            </Card>
            <Card style={{marginTop:"1rem"}}>
              <CardHeader title="Add New Mine Performance Assets" />
              <Divider />
              <CardContent>
                <Form />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default MinePerformance;
