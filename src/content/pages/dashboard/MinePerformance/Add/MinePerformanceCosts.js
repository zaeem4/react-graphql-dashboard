import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

import { TextField, Container, Box, Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';

import { apiCall } from 'src/utils/axios';

export default function MinePerformanceCostsForm() {
  const [spinner, setSpinner] = useState(false);
  const [open, setOpen] = useState(false);

  const MinePerformanceSchema = Yup.object().shape({  
    chemicals: Yup.string().required('Chemicals is required'),
    export: Yup.string().required('Export is required'),
    plantOperation: Yup.string().required('Plant Operation is required'),
    salariesAndWages: Yup.string().required('Salaries And Wages is required')
  });

  const formik = useFormik({
    initialValues: {  
      chemicals: 0,
      export: 0,
      plantOperation: 0,
      salariesAndWages: 0
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
            type={"number"}
            InputLabelProps={{
              shrink: true
            }}
            label="Chemicals"
            {...getFieldProps('chemicals')}
            error={Boolean(touched.chemicals && errors.chemicals)}
            helperText={touched.chemicals && errors.chemicals}
          />
          <TextField
            autoComplete="off"
            type={"number"}
            InputLabelProps={{
              shrink: true
            }}
            label="Export"
            {...getFieldProps('export')}
            error={Boolean(touched.export && errors.export)}
            helperText={touched.export && errors.export}
          />
          <TextField
            autoComplete="off"
            type={"number"}
            InputLabelProps={{
              shrink: true
            }}
            label="Plant Operation"
            {...getFieldProps('plantOperation')}
            error={Boolean(touched.plantOperation && errors.plantOperation)}
            helperText={touched.plantOperation && errors.plantOperation}
          />
          <TextField
            autoComplete="off"
            type={"number"}
            InputLabelProps={{
              shrink: true
            }}
            label="Salaries And Wages"
            {...getFieldProps('salariesAndWages')}
            error={Boolean(touched.salariesAndWages && errors.salariesAndWages)}
            helperText={touched.salariesAndWages && errors.salariesAndWages}
          />
          <Box textAlign={'center'} sx={{ marginTop: 2 }}>
            <LoadingButton size="large" type="submit" variant="contained" loading={spinner}>
              Add Mine Performance Costs
            </LoadingButton>
          </Box>
        </Box>
      </FormikProvider>
    </Container>
  );
}
