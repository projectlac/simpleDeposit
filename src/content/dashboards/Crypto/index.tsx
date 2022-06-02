import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import {
  Box,
  Button,
  Container,
  Grid,
  styled,
  Typography
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AuthContext } from 'src/App';
import DialogDelete from 'src/components/Common/Dialog/DialogDelete';
import DialoPublish from 'src/components/Common/Dialog/DialoPublish';
import ButtonWrap from 'src/components/Header/ButtonWrap';
import PageHeader from 'src/components/Header/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import history from 'src/utils/history';

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

const data = [
  {
    id: '1',
    name: 'Image banner 1',
    size: '1234 kB',
    imageUrl:
      'https://thietbiketnoi.com/wp-content/uploads/2019/12/mau-anh-bia-cover-facebook-kich-thuoc-chuan-dep-6.jpg'
  },
  {
    id: '2',
    name: 'Image banner 2',
    size: '1234 kB',
    imageUrl:
      'https://startuanit.net/wp-content/uploads/2021/06/anh-bia-facebook-ve-cuoc-song32.png'
  },
  {
    id: '3',
    name: 'Image banner 3',
    size: '1234 kB',
    imageUrl:
      'https://thietbiketnoi.com/wp-content/uploads/2019/12/mau-anh-bia-cover-facebook-kich-thuoc-chuan-dep-6.jpg'
  },
  {
    id: '4',
    name: 'Image banner 4',
    size: '1234 kB',
    imageUrl:
      'https://thietbiketnoi.com/wp-content/uploads/2019/12/mau-anh-bia-cover-facebook-kich-thuoc-chuan-dep-6.jpg'
  }
];

function DashboardCrypto() {
  const { handleChangeMessageToast, handleOpenToast } = useContext(AuthContext);
  const [selectedImage, setSeletedImage] = useState<string>('2');
  const [defaultImage, setDefaultImage] = useState<string>('2');

  const [checkChangeSelectionId, setCheckChangeSelectionId] =
    useState<boolean>(false);
  const getImageUrl = () => {
    return data.filter((d) => d.id === selectedImage)[0].imageUrl;
  };

  const deleteBaner = (id: string) => {
    if (selectedImage === id) {
      handleChangeMessageToast(
        "You can't delete this banner because it was chose!"
      );
      handleOpenToast();
    }
    console.log(id);
  };

  useEffect(() => {
    if (defaultImage !== selectedImage) {
      setCheckChangeSelectionId(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImage]);

  return (
    <>
      <Helmet>
        <title>Banner</title>
      </Helmet>
      <Grid container>
        <Grid item md={6}>
          <PageTitleWrapper>
            <PageHeader title={'Banner Management'} />
          </PageTitleWrapper>
        </Grid>
        <Grid item md={6}>
          <ButtonWrap>
            <Link
              to="add"
              style={{
                textDecoration: 'none'
              }}
            >
              <Button variant="contained" sx={{ mr: 2 }}>
                New Banner +
              </Button>
            </Link>
            <DialoPublish
              id={selectedImage}
              disabled={!checkChangeSelectionId}
              title={'Publish'}
            />
          </ButtonWrap>
        </Grid>
      </Grid>

      <Container maxWidth="xl">
        <img src={getImageUrl()} alt="" width={'100%'} />
        <Box mt={3}>
          {data.map((d) => (
            <ItemImage key={d.id}>
              <Box
                width={'calc(100% - 100px)'}
                onClick={() => {
                  setSeletedImage(d.id);
                }}
              >
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
                  {d.name} <span>({d.size})</span>
                </Typography>
              </Box>
              <Box
                width={100}
                sx={{ display: 'flex' }}
                justifyContent="flex-end"
              >
                {selectedImage === d.id && (
                  <CheckCircleIcon sx={{ color: 'green', mr: 1 }} />
                )}
                <DialogDelete id={d.id} title={'banner'} />
              </Box>
            </ItemImage>
          ))}
        </Box>
      </Container>
    </>
  );
}

export default DashboardCrypto;
