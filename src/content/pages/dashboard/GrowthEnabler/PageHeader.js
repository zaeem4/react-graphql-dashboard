import { Typography, Grid } from '@mui/material';

// import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function PageHeader() {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Growth Enabler
        </Typography>
        {/* <Typography variant="subtitle2">These are your recent growth enablers.</Typography> */}
      </Grid>    
    </Grid>
  );
}

export default PageHeader;
