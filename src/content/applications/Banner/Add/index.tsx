import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

import { Box, Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useCallback, useContext, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Helmet } from 'react-helmet-async';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import { AuthContext } from 'src/App';
import DialogBack from 'src/components/Common/Dialog/DialogBack';
import DialogConfirm from 'src/components/Common/Dialog/DialogConfirm';
import ButtonWrap from 'src/components/Header/ButtonWrap';
import PageHeader from 'src/components/Header/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { addBannerFunc } from 'src/function/banner';

const ItemImage = styled(Box)(
  ({ theme }) => `
        border-radius: 0;
        margin: ${theme.spacing(1)} 0;
        padding: ${theme.spacing(1)} ${theme.spacing(2)};
        display:flex;
        background:#e9ecef; 
        align-items:center;
`
);

const DropzoneBox = styled(Box)(
  ({ theme }) => `
       height:500px;   
       border: 3px #999;
       border-style: dashed;
       border-radius: 15px;
       display: flex;
       justify-content: center;
       align-items: center
`
);

function AddBanner() {
  const { handleOpenToast, handleChangeMessageToast } = useContext(AuthContext);
  const nav = useNavigate();

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

  const { mutate, data, isLoading } = useMutation(addBannerFunc, {
    onSuccess: () => {
      nav(`${process.env.REACT_APP_BASE_NAME}/banner/`);
      handleChangeMessageToast(data.data.message);
      handleOpenToast();
    },
    onError: () => {
      handleChangeMessageToast(data.data.message);
      handleOpenToast();
    }
  });

  const removeAll = () => {
    setMyFiles([]);
  };

  const onSubmit = () => {
    const formData = new FormData();

    formData.append('Image', myFiles[0]);
    mutate(formData);
  };
  const files = myFiles.map((file, i) => (
    <ItemImage key={i} width={'100%'}>
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
    </ItemImage>
  ));

  return (
    <>
      <Helmet>
        <title>{'New Banner'}</title>
      </Helmet>
      <Grid container>
        <Grid item md={6}>
          <PageTitleWrapper>
            <PageHeader title={'New Banner'} />
          </PageTitleWrapper>
        </Grid>
        <Grid item md={6}>
          <ButtonWrap>
            <DialogBack
              title="Back"
              link={`/${process.env.REACT_APP_BASE_NAME}/banner`}
            ></DialogBack>

            <DialogConfirm
              disabled={myFiles.length === 0 ? true : false}
              title="Publish"
              fileName={myFiles[0]?.name}
              handleSubmit={onSubmit}
              isLoading={isLoading}
            ></DialogConfirm>
          </ButtonWrap>
        </Grid>
      </Grid>

      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            {myFiles.length !== 1 ? (
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <DropzoneBox>
                  <Box textAlign={'center'}>
                    <CloudUploadOutlinedIcon fontSize="large" />
                    <Typography
                      fontSize={20}
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
              <img src={URL.createObjectURL(myFiles[0])} alt="" width="100%" />
            )}

            <Box mt={3}>{files.length > 0 && files}</Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default AddBanner;
