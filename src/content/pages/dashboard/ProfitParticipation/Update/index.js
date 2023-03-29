import { lazy } from 'react';
import { Grid, Container, Card, CardHeader, CardContent, Divider } from '@mui/material';

const Page = lazy(() => import('src/components/Page'));
const PageTitleWrapper = lazy(() => import('src/components/PageTitleWrapper'));
const PageHeader = lazy(() => import('./PageHeader'));
const Form = lazy(() => import('./ProfitParticipationForm'));

function UpdateProfitParticipation() {
  return (
    <Page title="Add Profit Participation" isFooter>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Add New Profit Participation" />
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

export default UpdateProfitParticipation;
