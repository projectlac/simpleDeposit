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
import { useState } from 'react';
import { Link } from 'react-router-dom';

const RecentOrdersTable = () => {
  const [cryptoOrders, setCryptoOrders] = useState<any>([
    {
      id: '1',
      title: 'Childhood Memory 1',
      belongTo: 'Childhood memory',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, libero! ',
      url: '/theconllection1',
      image:
        'https://image/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg'
    },
    {
      id: '2',
      title: 'Childhood Memory 2',
      belongTo: 'Childhood memory',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, libero! ',
      url: '/theconllection2',
      image:
        'https://image/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg'
    },
    {
      id: '3',
      title: 'Childhood Memory 3',
      belongTo: 'Childhood memory',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, libero! ',
      url: '/theconllection3',
      image:
        'https://image/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg'
    },
    {
      id: '4',
      title: 'Childhood Memory 4',
      belongTo: 'Childhood memory',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, libero! ',
      url: '/theconllection4',
      image:
        'https://image/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg'
    },
    {
      id: '5',
      title: 'Childhood Memory 5',
      belongTo: 'Childhood memory',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, libero! ',
      url: '/theconllection5',
      image:
        'https://image/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg'
    }
  ]);

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
                        {item.title.substring(0, 50) +
                          `${item.title.length >= 50 ? '...' : ''}`}
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
                        {item.description.substring(0, 50) +
                          `${item.description.length >= 50 ? '...' : ''}`}
                      </Typography>
                    </Link>
                  </TableCell>
                  <TableCell>{item.belongTo}</TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {item.url}
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
                      {item.image.substring(0, 50) +
                        `${item.image.length >= 50 ? '...' : ''}`}
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
                      <EditIcon />
                      <DeleteForeverOutlinedIcon />
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
