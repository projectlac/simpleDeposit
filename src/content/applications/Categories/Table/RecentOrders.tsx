import { Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import PageHeader from 'src/components/Header/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import RecentOrdersTable from './RecentOrdersTable';

function RecentOrders() {
  return (
    <>
      <Helmet>
        <title>{'Categories Management'}</title>
      </Helmet>
      <Grid container>
        <Grid item md={6}>
          <PageTitleWrapper>
            <PageHeader title={'Categories Management'} />
          </PageTitleWrapper>
        </Grid>
        <Grid item md={6}>
          {/* <ButtonWrap>
            <Link to={'add'} style={{ textDecoration: 'none' }}>
              <Button variant="contained">Add New + </Button>
            </Link>
          </ButtonWrap> */}
        </Grid>
      </Grid>
      <RecentOrdersTable />
    </>
  );
}

export default RecentOrders;
