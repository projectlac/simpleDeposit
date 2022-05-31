import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

function StatusMaintenance() {
  return (
    <>
      <Helmet>
        <title>Status - Maintenance</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="md" sx={{ mt: 15 }}>
          <Box textAlign="center">
            <Container maxWidth="lg">
              <Typography
                variant="h2"
                sx={{
                  mt: 4,
                  mb: 2,
                  fontWeight: 'bold',
                  fontSize: '32px',
                  letterSpacing: '0px',
                  color: '#044B7E',
                  opacity: '1'
                }}
              >
                Server Maintenance
              </Typography>
              <Box
                maxWidth={750}
                sx={{
                  margin: '0 auto',
                  border: '1px solid ',
                  borderRadius: '10px',
                  background: '#E9ECEF',
                  paddingTop: '25px'
                }}
              >
                <Typography
                  variant="h3"
                  color="text.secondary"
                  fontWeight="normal"
                  sx={{ mb: 4, fontSize: '20px' }}
                >
                  We’re sorry, the servers are currently under maintenance.{' '}
                  <br />
                  Please try again later.
                </Typography>
              </Box>
            </Container>
          </Box>
        </Container>
      </MainContent>
    </>
  );
}

export default StatusMaintenance;
