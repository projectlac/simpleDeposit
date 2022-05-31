import { Box, Card } from '@mui/material';
import { useState } from 'react';
import CustomizedAccordions from 'src/components/Common/Accordions/CustomizedAccordions';

const RecentOrdersTable = () => {
  const [cryptoOrders, setCryptoOrders] = useState<any>([
    {
      id: '1',
      title: 'Art1',
      detail: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`
    },
    {
      id: '2',
      title: 'Art2',
      detail: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`
    },
    {
      id: '3',
      title: 'Art3',
      detail: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`
    },
    {
      id: '4',
      title: 'Art4',
      detail: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`
    },
    {
      id: '5',
      title: 'Art5',
      detail: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`
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
        {cryptoOrders.map((d, i) => (
          <CustomizedAccordions
            num={i + 1}
            title={d.title}
            key={d.id}
            detail={d.detail}
            id={d.id}
          />
        ))}
      </Card>
    </Box>
  );
};
export default RecentOrdersTable;
