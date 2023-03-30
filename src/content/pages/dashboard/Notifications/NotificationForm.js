import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';

import { TextField, Container, Box, Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';

// import { apiCall } from 'src/utils/axios';

export default function NotificationForm() {
  const [spinner, setSpinner] = useState(false);
  const [open, setOpen] = useState(false);

  const NotificationSchema = Yup.object().shape({
    content: Yup.string().required('Content is required'),
    // link: Yup.string().required('Link is required')
  });

  const formik = useFormik({
    initialValues: {
      content: '',
      link: ''
    },
    validationSchema: NotificationSchema,
    onSubmit: async () => {
      try {
        setSpinner(true);
        

        if (data.success) {
          setOpen(true);
        }
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
          Sent
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
            type={'string'}
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
            label="Link"
            {...getFieldProps('link')}
            error={Boolean(touched.link && errors.link)}
            helperText={touched.link && errors.link}
          />
          <TextField
            autoComplete="off"
            type={'string'}
            multiline
            minRows={4}
            maxRows={6}
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            label="Notification Content"
            {...getFieldProps('content')}
            error={Boolean(touched.content && errors.content)}
            helperText={touched.content && errors.content}
          />

          <Box textAlign={'center'} sx={{ marginTop: 2 }}>
            <LoadingButton size="large" type="submit" variant="contained" loading={spinner}>
              Send Notification to All Users
            </LoadingButton>
          </Box>
        </Box>
      </FormikProvider>
    </Container>
  );
}
