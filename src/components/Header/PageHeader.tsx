import { Box, Grid, Typography } from '@mui/material';
function PageHeader(props) {
  const { title } = props;
  return (
    <Grid container justifyContent="flex-start">
      <Grid item container alignItems="center">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center'
          }}
        >
          <Typography
            variant="h3"
            component="h3"
            color="primary"
            gutterBottom
            sx={{
              textTransform: 'capitalize',
              fontSize: '30x',
              mb: 0
            }}
          >
            {title}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
