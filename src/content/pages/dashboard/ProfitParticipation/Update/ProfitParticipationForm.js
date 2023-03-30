import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

import { TextField, Container, Box, Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';

// import { apiCall } from 'src/utils/axios';

export default function ProfitParticipationForm() {
  const [open, setOpen] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const ProfitParticipationSchema = Yup.object().shape({
    revenue: Yup.string().required('Revenue is required')
  });

  const formik = useFormik({
    initialValues: {
      revenue: 0
    },
    validationSchema: ProfitParticipationSchema,

    onSubmit: async () => {
      try {
        setSpinner(true);
        
        setSpinner(false);
      } catch (error) {
        console.log(error);
        setSpinner(false);
      }
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <Container maxWidth="xs">
      <Collapse in={open} sx={{ marginBottom: 2 }}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Updated
        </Alert>
      </Collapse>
      <FormikProvider value={formik}>
        <Box
          component={Form}
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          sx={{
            '& .MuiTextField-root': { marginBottom: 2 }
          }}
        >
          <TextField
            fullWidth
            autoComplete="off"
            type="number"
            InputLabelProps={{
              shrink: true
            }}
            label="Revenue"
            {...getFieldProps('revenue')}
            error={Boolean(touched.revenue && errors.revenue)}
            helperText={touched.revenue && errors.revenue}
          />
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={spinner}>
            Add Profit Participation
          </LoadingButton>
        </Box>
      </FormikProvider>
    </Container>
  );
}
