import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditIcon from '@mui/icons-material/Edit';
import MenuIcon from '@mui/icons-material/Menu';
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
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useMutation, useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import DialogDelete from 'src/components/Common/Dialog/DialogDelete';
import {
  getCategoriesFunc,
  orderCategoriesFunc
} from 'src/function/categories';
import history from 'src/utils/history';
import _ from 'lodash';
import { AuthContext } from 'src/App';
const RecentOrdersTable = () => {
  const { handleOpenToast, updated, handleChangeMessageToast } =
    useContext(AuthContext);

  const { data, status, refetch } = useQuery('banner', getCategoriesFunc, {
    enabled: false,
    refetchOnWindowFocus: false
  });

  const [cryptoOrders, setCryptoOrders] = useState<any>([
    { title: '', id: '', url: '', imageUrl: '' }
  ]);
  const [compareData, setCompareData] = useState<any>([
    { title: '', id: '', url: '', imageUrl: '' }
  ]);
  useEffect(() => {
    if (status === 'success') {
      setCryptoOrders(data.data);
      setCompareData(data.data);
    }
  }, [status, data]);

  const { mutate } = useMutation(orderCategoriesFunc, {
    onSuccess: () => {
      handleChangeMessageToast('Update category order successfully!');
      handleOpenToast();
    },
    onError: () => {
      handleChangeMessageToast('Something went wrong!!');
      handleOpenToast();
    }
  });

  useEffect(() => {
    const tempData = cryptoOrders;
    return history.listen(() => {
      const param = tempData.map((d, i) => {
        const { id } = d;
        return { id, orderNum: i };
      });
      if (!_.isEqual(compareData, cryptoOrders)) {
        mutate(param);
      }

      // console.log('after', param);
    });
  }, [history, cryptoOrders]);
  useEffect(() => {
    refetch();
  }, [updated]);
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      cryptoOrders,
      result.source.index,
      result.destination.index
    );

    setCryptoOrders(items);
  };

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

                <TableCell width={'20%'}>Title</TableCell>
                <TableCell width={'20%'}>Url</TableCell>
                <TableCell width={'40%'}>Icon Image</TableCell>
                <TableCell width={'10%'}>Acition</TableCell>
                <TableCell width={'5%'}></TableCell>
              </TableRow>
            </TableHead>

            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <TableBody
                    {...provided.droppableProps}
                    ref={provided.innerRef}
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
                    {cryptoOrders &&
                      cryptoOrders.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <TableRow
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TableCell width={'5%'}>
                                <Typography color="#2b7fbb">
                                  {index + 1}
                                </Typography>
                              </TableCell>

                              <TableCell width={'20%'}>
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
                                    {item.title}
                                  </Typography>
                                </Link>
                              </TableCell>
                              <TableCell width={'20%'}>
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
                              <TableCell width={'40%'}>
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

                              <TableCell width={'10%'}>
                                <Typography
                                  variant="body1"
                                  fontWeight="bold"
                                  color="text.primary"
                                  gutterBottom
                                  noWrap
                                  sx={{ display: 'flex' }}
                                >
                                  <Link to={`edit/${item.id}`}>
                                    <EditIcon sx={{ color: '#2b7fbb' }} />
                                  </Link>

                                  <DialogDelete
                                    id={item.id}
                                    title={'Categories'}
                                  />
                                </Typography>
                              </TableCell>
                              <TableCell width={'5%'}>
                                <Typography
                                  variant="body1"
                                  fontWeight="bold"
                                  color="text.primary"
                                  gutterBottom
                                  noWrap
                                >
                                  <MenuIcon />
                                </Typography>
                              </TableCell>
                            </TableRow>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </TableBody>
                )}
              </Droppable>
            </DragDropContext>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};
export default RecentOrdersTable;
