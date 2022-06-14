import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Card,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { AuthContext } from 'src/App';
import DialogDelete from 'src/components/Common/Dialog/DialogDelete';
import { getCollectionItemFunc } from 'src/function/collection';

const RecentOrdersTable = () => {
  const { updated } = useContext(AuthContext);

  const { data, status, refetch } = useQuery('banner', getCollectionItemFunc, {
    enabled: false,
    refetchOnWindowFocus: false
  });
  useEffect(() => {
    refetch();
  }, [updated]);
  useEffect(() => {
    if (status === 'success') {
      setCryptoOrders(data.data);
    }
  }, [status, data]);
  const [cryptoOrders, setCryptoOrders] = useState<any>([]);

  return (
    <Box
      sx={{
        px: 3,
        mt: 1
      }}
    >
      <Card sx={{ boxShadow: 'none' }}>
        <Divider />
        <TableContainer>
          <Table>
            <TableHead
              sx={{
                background: '#044b7e',

                '& .MuiTableCell-head': {
                  color: '#fff',
                  fontSize: '16px',
                  textTransform: 'none',
                  '& svg': {
                    fill: '#fff'
                  }
                }
              }}
            >
              <TableRow>
                <TableCell width={'5%'}>#</TableCell>

                <TableCell width={'15%'}>Title</TableCell>
                <TableCell width={'25%'}>Description</TableCell>
                <TableCell width={'15%'}>Belong To</TableCell>

                <TableCell width={'10%'}>Url</TableCell>
                <TableCell width={'20%'}>Image</TableCell>
                <TableCell width={'10%'}>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody
              sx={{
                '& .MuiTableRow-root > td': {
                  borderBottom: 'none'
                },
                '& .MuiTableRow-root > td .MuiTypography-gutterBottom': {
                  fontSize: '16px',
                  fontWeight: 'normal',
                  color: '#2b7fbb'
                },
                '& .MuiTableRow-root:nth-of-type(2n)': {
                  background: '#ebebeb'
                },
                '& .MuiTableRow-root:nth-of-type(2n + 1)': {
                  background: '#fff'
                }
              }}
            >
              {cryptoOrders.map((item, index) => (
                <TableRow key={index}>
                  <TableCell width={'5%'}>
                    <Typography color="#2b7fbb">{index + 1}</Typography>
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`./edit/${item.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                        sx={{
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        {item?.title}
                      </Typography>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`./edit/${item.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                        sx={{
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        {item.description &&
                          `${item.description.slice(0, 40)} 
                                    ${item.description.length > 40 && '...'}`}
                      </Typography>
                    </Link>
                  </TableCell>
                  <TableCell>{item.parentName}</TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {item.collectionUrl}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {item.imageName}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                      sx={{ display: 'flex' }}
                    >
                      <Link
                        to={`./edit/${item.id}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <EditIcon sx={{ color: '#2b7fbb' }} />
                      </Link>
                      <DialogDelete id={item.id} title={'Categories'} />
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};
export default RecentOrdersTable;
