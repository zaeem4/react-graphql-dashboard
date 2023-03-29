import { Typography, Grid } from '@mui/material';

// import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function PageHeader() {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Nfts
        </Typography>
        <Typography variant="subtitle2">These are your recent nfts.</Typography>
      </Grid>
      {/* <Grid item>
        <Button sx={{ mt: { xs: 2, md: 0 } }} variant="contained" startIcon={<AddTwoToneIcon fontSize="small" />}>
          Create withdrawals
        </Button>
      </Grid> */}
    </Grid>
  );
}

export default PageHeader;
