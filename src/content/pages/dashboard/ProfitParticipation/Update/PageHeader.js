import { Typography, Grid, Button } from '@mui/material';

import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';

function PageHeader() {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Profit Participation
        </Typography>
        <Typography variant="subtitle2">These are your recent profit participation</Typography>
      </Grid>
      <Grid item>
        <Button sx={{ mt: { xs: 2, md: 0 } }} variant="contained" startIcon={<MenuTwoToneIcon fontSize="small" />}>
          View Profit Participation
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
