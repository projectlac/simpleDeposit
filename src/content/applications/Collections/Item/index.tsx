import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { Helmet } from 'react-helmet-async';
import PageHeader from 'src/components/Header/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import RecentOrders from './Table/RecentOrders';

function Individual() {
  return (
    <>
      <Helmet>
        <title>Individual</title>
      </Helmet>
      <PageTitleWrapper>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <PageHeader
            title={'Outlets'}
            button={'Add New'}
            link={'/outlet/individual/add'}
          />
        </Box>
      </PageTitleWrapper>
      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <RecentOrders />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Individual;
