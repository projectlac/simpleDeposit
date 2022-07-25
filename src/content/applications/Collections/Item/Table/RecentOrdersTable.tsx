import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Card,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
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
import collectionApi from 'src/api/collectionApi';
import { AuthContext } from 'src/App';
import DialogDelete from 'src/components/Common/Dialog/DialogDelete';
import { getCollectionItemFunc } from 'src/function/collection';

const RecentOrdersTable = () => {
  const { updated } = useContext(AuthContext);
  const [cryptoOrders, setCryptoOrders] = useState<any>([]);
  const [listSpecial, setListSpecial] = useState([]);
  const [filter, setFilter] = useState<string | null>('none');
  const [filterHandle, setFilterHandle] = useState<string | null>(null);

  const [total, setTotal] = useState<number>(0);
  const [pageCurrently, setPageCurrently] = useState<number>(0);
  const handleChange = (event) => {
    setFilter(event.target.value);
    if (event.target.value === 'none') {
      setFilterHandle(null);
    } else setFilterHandle(event.target.value);
  };
  const { data, status, refetch } = useQuery(
    ['product', { filter: filterHandle, index: pageCurrently }],
    getCollectionItemFunc,
    {
      enabled: false,
      refetchOnWindowFocus: false
    }
  );

  useEffect(() => {
    refetch();
  }, [updated, pageCurrently, filter]);

  useEffect(() => {
    if (status === 'success') {
      setCryptoOrders(data.data);
      setTotal(Math.ceil(data.totalCount / 10));
    }
  }, [status, data]);

  useEffect(() => {
    collectionApi.getCollection().then((res) => {
      if (res.data.success) {
        setListSpecial(res.data.data);
      }
    });
  }, []);

  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPageCurrently(page - 1);
  };

  return (
    <Box
      sx={{
        px: 3,
        mt: 1
      }}
    >
      <Box width={250} mb={2}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Belong to</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            label="Belong to"
            displayEmpty
            onChange={handleChange}
          >
            <MenuItem value={'none'}>All</MenuItem>
            {listSpecial.map((d) => (
              <MenuItem value={d.id} key={d.id}>
                {d.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

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
        <Box mt={3}>
          {total > 1 && (
            <Pagination
              sx={{ '& ul': { justifyContent: 'flex-end' } }}
              count={total}
              variant="outlined"
              shape="rounded"
              onChange={handleChangePagination}
            />
          )}
        </Box>
      </Card>
    </Box>
  );
};
export default RecentOrdersTable;
