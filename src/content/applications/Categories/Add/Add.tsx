/* eslint-disable react-hooks/exhaustive-deps */
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { Box, Grid, styled, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import categoriesApi from 'src/api/categoriesApi';
import { AuthContext } from 'src/App';
import DialogBack from 'src/components/Common/Dialog/DialogBack';
import DialogConfirm from 'src/components/Common/Dialog/DialogConfirm';
import ButtonWrap from 'src/components/Header/ButtonWrap';
import PageHeader from 'src/components/Header/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { addCategoriesFunc } from 'src/function/categories';
import * as yup from 'yup';

const DropzoneBox = styled(Box)(
  ({ theme }) => `
         height:250px;   
         border: 3px #999;
         border-style: dashed;
         border-radius: 15px;
         display: flex;
         justify-content: center;
         align-items: center
  `
);

interface AddProps {
  id?: string;
  editMode: boolean;
}
function Add({ id, editMode }: AddProps) {
  const validationSchema = yup.object({
    title: yup.string().required('Title is required'),
    url: yup.string().required('URL is required')
  });
  const { handleOpenToast, handleChangeMessageToast } = useContext(AuthContext);
  const [currencyImage, setCurrencyImage] = useState<string>('');
  const nav = useNavigate();
  const { mutate, data } = useMutation(addCategoriesFunc, {
    onSuccess: () => {
      nav(`${process.env.REACT_APP_BASE_NAME}/categories/`);

      handleChangeMessageToast('Create category successfully');
      handleOpenToast();
    },
    onError: () => {
      handleChangeMessageToast(data.data.data.message);
      handleOpenToast();
    }
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      url: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('Title', values.title);
      formData.append('Url', values.url);
      formData.append('IsPublished', 'true');
      if (myFiles && myFiles[0]) {
        formData.append('Image', myFiles[0]);
      }
      if (editMode) {
        formData.append('Id', id);

        categoriesApi.updateCategory(formData).then((res) => {
          if (res.data.success) {
            nav(`${process.env.REACT_APP_BASE_NAME}/categories/`);
          }
          handleChangeMessageToast(res.data.message);
          handleOpenToast();
        });
      } else {
        mutate(formData);
      }
    }
  });
  // Then inside the component body

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  const [myFiles, setMyFiles] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setMyFiles([...myFiles, ...acceptedFiles]);
    },
    [myFiles]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop
  });

  const removeAll = () => {
    setMyFiles([]);
  };

  const files = myFiles.map((file, i) => (
    <Box
      sx={{
        display: 'flex'
      }}
      key={i}
    >
      <Box width={'calc(100% - 150px)'}>
        <Typography
          fontWeight={'bold'}
          fontSize={16}
          sx={{
            '& span': {
              fontWeight: '500',
              fontSize: '14px',
              color: '#999'
            }
          }}
        >
          {file.name} <span>({file.size})</span>
        </Typography>
      </Box>
      <Box width={150} textAlign="right">
        <DeleteForeverRoundedIcon sx={{ color: 'red' }} onClick={removeAll} />
      </Box>
    </Box>
  ));

  useEffect(() => {
    categoriesApi.getCategoriesById(id).then((res) => {
      if (res.data.success) {
        formik.handleChange({
          target: { name: 'title', value: res.data.data.title }
        });
        formik.handleChange({
          target: { name: 'url', value: res.data.data.url }
        });
        setCurrencyImage(res.data.data.imageUrl);
      }
    });
  }, [id]);
  return (
    <Box component={'form'} onSubmit={formik.handleSubmit}>
      <Grid container>
        <Grid item md={6}>
          <PageTitleWrapper>
            <PageHeader
              title={`${editMode ? 'Edit Category' : 'New Categories'} `}
            />
          </PageTitleWrapper>
        </Grid>
        <Grid item md={6}>
          <ButtonWrap>
            <DialogBack
              title="Back"
              link={`/${process.env.REACT_APP_BASE_NAME}/categories`}
            ></DialogBack>

            <DialogConfirm
              disabled={editMode ? false : files.length === 0 ? true : false}
              title="Publish"
              handleSubmit={handleSubmit}
            ></DialogConfirm>
          </ButtonWrap>
        </Grid>
      </Grid>
      <Box>
        <Grid container>
          <Grid item md={7}>
            <Box>
              <Typography
                sx={{
                  fontSize: '17px',
                  fontWeight: 'bold'
                }}
              >
                Title
              </Typography>
              <TextField
                name="title"
                label=""
                variant="outlined"
                fullWidth
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
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
                URL
              </Typography>
              <TextField
                name="url"
                label=""
                variant="outlined"
                fullWidth
                value={formik.values.url}
                onChange={formik.handleChange}
                error={formik.touched.url && Boolean(formik.errors.url)}
                helperText={formik.touched.url && formik.errors.url}
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
                Image
              </Typography>
              {myFiles.length !== 1 ? (
                <div {...getRootProps({ className: 'dropzone' })}>
                  <input {...getInputProps()} name="file" />
                  <DropzoneBox>
                    <Box textAlign={'center'}>
                      <CloudUploadOutlinedIcon fontSize="large" />
                      <Typography
                        fontSize={18}
                        sx={{
                          '& span': {
                            textDecoration: 'underline'
                          }
                        }}
                      >
                        Drag 'n' drop some files here, or{' '}
                        <span>click to select files</span>
                      </Typography>
                    </Box>
                  </DropzoneBox>
                </div>
              ) : (
                <img
                  src={URL.createObjectURL(myFiles[0])}
                  alt=""
                  width="100%"
                />
              )}

              <Box mt={3}>{files.length > 0 && files}</Box>
              {!files[0] && currencyImage && (
                <img src={currencyImage} width={200} alt="" />
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Add;
