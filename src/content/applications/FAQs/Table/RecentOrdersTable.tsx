import { Box, Card } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { AuthContext } from 'src/App';
import CustomizedAccordions from 'src/components/Common/Accordions/CustomizedAccordions';
import { getFAQFunc } from 'src/function/faq';

const RecentOrdersTable = () => {
  const { updated } = useContext(AuthContext);

  const { data, status, refetch } = useQuery('faq', getFAQFunc, {
    enabled: false,
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    if (status === 'success') {
      setCryptoOrders(data.data);
    }
  }, [status, data]);
  useEffect(() => {
    refetch();
  }, [updated]);
  const [cryptoOrders, setCryptoOrders] = useState<any>([]);

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
            title={d.question}
            key={d.id}
            detail={d.answer}
            id={d.id}
          />
        ))}
      </Card>
    </Box>
  );
};
export default RecentOrdersTable;
