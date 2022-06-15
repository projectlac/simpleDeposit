import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import loginApi from 'src/api/loginApi';
import { AuthContext } from 'src/App';
// import BootstrapInput from 'src/components/Common/BootstrapInput/BootstrapInput';
// import LabelInput from 'src/components/Common/BootstrapInput/LabelInput';
import * as yup from 'yup';
interface PropsChangePassword {
  email: string;
}
function ChangePassword({ email }: PropsChangePassword) {
  const { handleOpenToast, handleChangeMessageToast } = useContext(AuthContext);

  const nav = useNavigate();
  const validationSchema = yup.object({
    temporaryPassword: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length')
      .required('This field is required'),
    newPassword: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length')
      .required('This field is required'),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
      .required('This field is required')
  });

  const formik = useFormik({
    initialValues: {
      temporaryPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { temporaryPassword, newPassword, confirmNewPassword } = values;
      try {
        loginApi
          .changePassword({
            email: email,
            temporaryPassword: temporaryPassword,
            newPassword: newPassword,
            confirmNewPassword: confirmNewPassword
          })
          .then((res) => {
            if (res.data.success) {
              handleChangeMessageToast(res.data.message);
              handleOpenToast();
              nav(`${process.env.REACT_APP_BASE_NAME}/login`);
            } else {
              handleChangeMessageToast(res.data.message);
              handleOpenToast();
            }
          });
      } catch (error) {}
    }
  });

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <Box
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

          width: { md: '70ch', xs: '100%' },
          mt: 10
        }}
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <FormControl variant="standard" sx={{ width: '100%' }}>
          <Typography
            sx={{
              fontSize: '17px',
              fontWeight: 'bold'
            }}
          >
            Temporary Password
          </Typography>
          <TextField
            name="temporaryPassword"
            variant="outlined"
            fullWidth
            sx={{
              '& p': {
                position: 'absolute',
                bottom: '-20px',
                left: 0
              }
            }}
            value={formik.values.temporaryPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.temporaryPassword &&
              Boolean(formik.errors.temporaryPassword)
            }
            helperText={
              formik.touched.temporaryPassword &&
              formik.errors.temporaryPassword
            }
          />
        </FormControl>

        <FormControl variant="standard" sx={{ width: '100%' }}>
          <Typography
            sx={{
              fontSize: '17px',
              fontWeight: 'bold'
            }}
          >
            New Password
          </Typography>
          <TextField
            name="newPassword"
            variant="outlined"
            fullWidth
            type="password"
            sx={{
              '& p': {
                position: 'absolute',
                bottom: '-20px',
                left: 0
              }
            }}
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.newPassword && Boolean(formik.errors.newPassword)
            }
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />
        </FormControl>

        <FormControl variant="standard" sx={{ width: '100%' }}>
          <Typography
            sx={{
              fontSize: '17px',
              fontWeight: 'bold'
            }}
          >
            Confirm New Password
          </Typography>
          <TextField
            name="confirmNewPassword"
            variant="outlined"
            fullWidth
            type="password"
            sx={{
              '& p': {
                position: 'absolute',
                bottom: '-20px',
                left: 0
              }
            }}
            value={formik.values.confirmNewPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmNewPassword &&
              Boolean(formik.errors.confirmNewPassword)
            }
            helperText={
              formik.touched.confirmNewPassword &&
              formik.errors.confirmNewPassword
            }
          />
        </FormControl>

        <Button size="large" variant="contained" type="submit" sx={{ mt: 5 }}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default ChangePassword;
