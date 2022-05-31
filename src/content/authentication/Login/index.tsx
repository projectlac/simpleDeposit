import AccountCircle from '@mui/icons-material/AccountCircle';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
// import logo from 'src/assets/images/logo/Image 9.png';
import BpCheckbox from 'src/components/Common/BpCheckbox';
import { loginFunc } from 'src/function/authorization';

import * as yup from 'yup';

function Login() {
  const nav = useNavigate();
  const { mutate, data } = useMutation(loginFunc, {
    onSuccess: () => {
      localStorage.setItem('access_token', data.data.token);
    },
    onError: () => {}
  });

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutate({
        email: values.email,
        password: values.password
      });
    }
  });

  // const onSubmit = async (data) => {
  //   const { username, password } = data;
  //   try {
  //     await loginApi.login({ userName: username, password }).then((res) => {
  //       if (res.data.success) {
  //         localStorage.setItem('access_token', res.data.data.token);
  //         handleLoginIn();
  //         nav(`${process.env.REACT_APP_BASE_NAME}/dashboards/`);
  //       } else {
  //         handleChangeMessageToast(res.data.message);
  //         handleOpenToast();
  //       }
  //     });
  //   } catch (error) {}
  // };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundSize: 'cover'
      }}
    >
      <Container maxWidth="lg" sx={{ height: '100vh', pt: 10 }}>
        <Box sx={{ p: { md: 8, xs: 3 } }}>
          <Box textAlign={'center'}>{/* <img src={logo} alt="" /> */}</Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <Box
              onSubmit={formik.handleSubmit}
              component="form"
              sx={{
                '& .MuiTextField-root': {
                  width: { md: '70ch', xs: '100%' },
                  mb: 4
                },
                '& button': {
                  width: '100%',
                  height: '53px'
                },

                width: { md: '70ch', xs: '100%' }
              }}
              autoComplete="off"
            >
              <FormControl variant="standard" sx={{ width: '100%' }}>
                <TextField
                  label="Email"
                  sx={{
                    '& label': {
                      fontWeight: 'bold',
                      fontSize: '19px'
                    },
                    '& input': {
                      fontWeight: '600',
                      fontSize: '17px'
                    },
                    '& legend': {
                      fontSize: '16px'
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    )
                  }}
                  variant="outlined"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </FormControl>
              <FormControl variant="standard" sx={{ width: '100%' }}>
                <TextField
                  label="Password"
                  type="password"
                  sx={{
                    '& label': {
                      fontWeight: 'bold',
                      fontSize: '19px'
                    },
                    '& input': {
                      fontWeight: '600',
                      fontSize: '17px'
                    },
                    '& legend': {
                      fontSize: '16px'
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKeyIcon />
                      </InputAdornment>
                    )
                  }}
                  variant="outlined"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </FormControl>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <FormControlLabel
                  label="Remember me"
                  sx={{
                    color: '#044b7e',
                    '& .MuiTypography-root': { fontSize: '15px' }
                  }}
                  control={<BpCheckbox />}
                />

                <Typography
                  textAlign={'right'}
                  sx={{
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  <Link
                    to={`${process.env.REACT_APP_BASE_NAME}/forgot-password`}
                    style={{
                      textDecoration: 'none',
                      color: '#044b7e',
                      fontSize: '15px'
                    }}
                  >
                    Forgot Password?
                  </Link>
                </Typography>
              </Box>

              <Button
                size="large"
                variant="contained"
                type="submit"
                sx={{ mt: 5 }}
              >
                LOGIN
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
export default Login;
