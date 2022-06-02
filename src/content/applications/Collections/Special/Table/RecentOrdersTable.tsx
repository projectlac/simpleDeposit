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
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
import DialogDelete from 'src/components/Common/Dialog/DialogDelete';
import history from 'src/utils/history';

const RecentOrdersTable = () => {
  const [cryptoOrders, setCryptoOrders] = useState<any>([
    {
      id: '1',
      title: 'Childhood Memory 1',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, libero! ',
      url: '/theconllection1',
      image:
        'https://image/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg'
    },
    {
      id: '2',
      title: 'Childhood Memory 2',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, libero! ',
      url: '/theconllection2',
      image:
        'https://image/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg'
    },
    {
      id: '3',
      title: 'Childhood Memory 3',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, libero! ',
      url: '/theconllection3',
      image:
        'https://image/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg'
    },
    {
      id: '4',
      title: 'Childhood Memory 4',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, libero! ',
      url: '/theconllection4',
      image:
        'https://image/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg'
    },
    {
      id: '5',
      title: 'Childhood Memory 5',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, libero! ',
      url: '/theconllection5',
      image:
        'https://image/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg'
    }
  ]);
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  useEffect(() => {
    const tempData = cryptoOrders;
    return history.listen(() => {
      const listId = tempData.map((d) => {
        const { id } = d;
        return { id };
      });
      console.log('after', listId);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, cryptoOrders]);

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
                <TableCell width={'30%'}>Description</TableCell>
                <TableCell width={'10%'}>Url</TableCell>
                <TableCell width={'20%'}>Image</TableCell>
                <TableCell width={'10%'}>Action</TableCell>

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
                    {cryptoOrders.map((item, index) => (
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
                                  {item.title.substring(0, 50) +
                                    `${item.title.length >= 50 ? '...' : ''}`}
                                </Typography>
                              </Link>
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
                                  {item.description.substring(0, 50) +
                                    `${
                                      item.description.length >= 50 ? '...' : ''
                                    }`}
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
                                {item.image}
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
                                <EditIcon />
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
