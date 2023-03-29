import { useEffect, useState } from 'react';

import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Card } from '@mui/material';

import { apiCall } from 'src/utils/axios';
import { useLocation } from 'react-router-dom';

function WithdrawalTab() {
  const location = useLocation();
  const user = location.state.user;
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchWithdrawals();

    return () => {
      setData([]);
    };
  }, []);

  const fetchWithdrawals = async () => {
    try {
      const response = await apiCall('getUserWithdrawals', {
        query: `query GetUserWithdrawals($email: String!) {
            getUserWithdrawals(email: $email) {
              success
              withdrawals {
                _id
                date
                coin
                network
                address
                amount
                status
              }
            }
          }`,
        variables: {
          email: user.email
        }
      });
      if (response.success) {
        setData(response.withdrawals);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Withdrawal ID</TableCell>
              <TableCell>Date/Time</TableCell>
              <TableCell>Coin</TableCell>
              <TableCell>Network</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow hover key={item._id}>
                <TableCell>{item._id}</TableCell>
                <TableCell>{item.date ? new Date(item.date).toLocaleDateString() : ''}</TableCell>
                <TableCell>{item.coin}</TableCell>
                <TableCell>{item.network}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default WithdrawalTab;
