import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  TextField,
  Typography
} from '@mui/material';
import { useContext, useState } from 'react';
import { AuthContext } from 'src/App';
import ChangePassword from './ChangePassword';
import * as yup from 'yup';
import { useFormik } from 'formik';
import loginApi from 'src/api/loginApi';
function ForgotPassword() {
  const [checkFillEmail, setCheckFillEmail] = useState<Boolean>(false);
  const [fillEmail, setFillEmail] = useState<string>('');

  const { handleOpenToast, handleChangeMessageToast } = useContext(AuthContext);

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required')
  });

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      loginApi.forgotPassword(values.email).then((res) => {
        handleChangeMessageToast(res.data.message);
        handleOpenToast();
        if (res.data.success) {
          setFillEmail(values.email);
          setCheckFillEmail(true);
        }
      });
    }
  });

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',

        backgroundSize: 'cover'
      }}
    >
      <Container maxWidth="lg" sx={{ height: '100vh', pt: 15 }}>
        <Card sx={{ p: { md: 10, xs: 3 } }}>
          <Typography variant="h1" component="h1" align="center" sx={{ mb: 2 }}>
            {checkFillEmail ? 'Change Password' : 'Forgot Password'}
          </Typography>
          <Typography variant="h3" component="h3" align="center">
            Deposit Microsite CMS
          </Typography>
          {!checkFillEmail ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column'
              }}
            >
              <Box
                component="form"
                onSubmit={formik.handleSubmit}
                sx={{
                  '& .MuiTextField-root': {
                    width: { md: '70ch', xs: '100%' },
                    mb: 2
                  },
                  '& button': {
                    width: '100%',
                    height: '53px'
                  },

                  width: { md: '70ch', xs: '100%' },
                  mt: 10
                }}
                noValidate
                autoComplete="off"
              >
                <FormControl variant="standard" sx={{ width: '100%' }}>
                  <Typography
                    sx={{
                      fontSize: '17px',
                      fontWeight: 'bold'
                    }}
                  >
                    Email
                  </Typography>
                  <TextField
                    name="email"
                    variant="outlined"
                    fullWidth
                    sx={{
                      '& p': {
                        position: 'absolute',
                        bottom: '-20px',
                        left: 0
                      }
                    }}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </FormControl>

                <Button
                  size="large"
                  variant="contained"
                  type="submit"
                  sx={{ mt: 5 }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          ) : (
            <ChangePassword email={fillEmail} />
          )}
        </Card>
      </Container>
    </Box>
  );
}
export default ForgotPassword;
