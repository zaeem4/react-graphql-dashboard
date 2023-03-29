import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

import { TextField, Container, Box, Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';

import { apiCall } from 'src/utils/axios';

export default function MinePerformanceSoildProcessedForm() {
  const [spinner, setSpinner] = useState(false);
  const [open, setOpen] = useState(false);

  const MinePerformanceSchema = Yup.object().shape({
    dailySoilProcessed: Yup.string().required('Soil Processed is required')
  });

  const formik = useFormik({
    initialValues: {
      dailySoilProcessed: 0
    },
    validationSchema: MinePerformanceSchema,
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
    <Container maxWidth="sm">
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
          Added
        </Alert>
      </Collapse>
      <FormikProvider value={formik}>
        <Box
          component={Form}
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          sx={{
            '& .MuiTextField-root': { m: 1 }
          }}
        >
          <TextField
            autoComplete="off"
            type={'number'}
            InputLabelProps={{
              shrink: true
            }}
            label="Soil Processed"
            {...getFieldProps('dailySoilProcessed')}
            error={Boolean(touched.dailySoilProcessed && errors.dailySoilProcessed)}
            helperText={touched.dailySoilProcessed && errors.dailySoilProcessed}
          />

          <Box textAlign={'center'} sx={{ marginTop: 2 }}>
            <LoadingButton size="large" type="submit" variant="contained" loading={spinner}>
              Add Mine Performance Soil Processed
            </LoadingButton>
          </Box>
        </Box>
      </FormikProvider>
    </Container>
  );
}
