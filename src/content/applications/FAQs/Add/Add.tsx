import {
  Box,
  Container,
  Grid,
  styled,
  TextField,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import DialogBack from 'src/components/Common/Dialog/DialogBack';
import DialogConfirm from 'src/components/Common/Dialog/DialogConfirm';
import ButtonWrap from 'src/components/Header/ButtonWrap';
import PageHeader from 'src/components/Header/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import TinyEditor from 'src/components/TinyEditor/TinyEditor';
import * as yup from 'yup';

interface AddProps {
  id?: string;
  editMode: boolean;
}
function Add({ id, editMode }: AddProps) {
  const validationSchema = yup.object({
    question: yup.string().required('Question is required'),
    answer: yup.string().required('Answer is required')
  });

  const formik = useFormik({
    initialValues: {
      question: '',
      answer: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });
  // Then inside the component body

  const changeBody = (data: string) => {
    formik.handleChange({ target: { name: 'answer', value: data } });
  };
  const handleSubmit = () => {
    formik.handleSubmit();
  };

  return (
    <Box component={'form'} onSubmit={formik.handleSubmit}>
      <Grid container>
        <Grid item md={6}>
          <PageTitleWrapper>
            <PageHeader title={editMode ? 'Edit FAQ' : 'New FAQ'} />
          </PageTitleWrapper>
        </Grid>
        <Grid item md={6}>
          <ButtonWrap>
            <DialogBack
              title="Back"
              link={`/${process.env.REACT_APP_BASE_NAME}/faqs`}
            ></DialogBack>

            <DialogConfirm
              disabled={formik.values.answer === '' ? true : false}
              title="Publish"
              handleSubmit={handleSubmit}
            ></DialogConfirm>
          </ButtonWrap>
        </Grid>
      </Grid>
      <Box>
        <Container maxWidth="xl">
          <Grid container>
            <Grid item md={7}>
              <Box>
                <Typography
                  sx={{
                    fontSize: '17px',
                    fontWeight: 'bold'
                  }}
                >
                  Question
                </Typography>
                <TextField
                  name="question"
                  label=""
                  variant="outlined"
                  fullWidth
                  value={formik.values.question}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.question && Boolean(formik.errors.question)
                  }
                  helperText={formik.touched.question && formik.errors.question}
                  sx={{
                    '& p': {
                      position: 'absolute',
                      bottom: '-20px',
                      left: 0
                    }
                  }}
                />
              </Box>
              <Box mt={3}>
                <Typography
                  sx={{
                    fontSize: '17px',
                    fontWeight: 'bold'
                  }}
                >
                  Anwser
                </Typography>
                <TinyEditor defaultValue="" changeBody={changeBody} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Add;
