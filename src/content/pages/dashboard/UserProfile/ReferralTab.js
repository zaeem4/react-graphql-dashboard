import { useEffect, useState } from 'react';

import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Card } from '@mui/material';

import { apiCall } from 'src/utils/axios';
import { useLocation } from 'react-router-dom';

function ReferralTab() {
  const location = useLocation();
  const user = location.state.user;
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchReferrals();

    return () => {
      setData([]);
    };
  }, []);

  const fetchReferrals = async () => {
    try {
      const response = await apiCall('getReferralsForUser', {
        query: `query getReferralsForUser($email: String!) {
            getReferralsForUser(email: $email) {
                success   
                referrals {
                  actualId
                  nftsbought
                  user
                }
            }
          }`,
        variables: {
          email: user.email
        }
      });
      if (response.success) {
        let rowsData = [];
        if (response.referrals !== undefined && response.referrals.length > 0) {          
          rowsData = response.referrals.map((item) => (
            <TableRow hover key={item.actualId}>
              <TableCell>{item.actualId}</TableCell>
              <TableCell>{item.user ? item.user : ''}</TableCell>
              <TableCell>
                {item.nftsbought?.map((nft) => (
                  <TableRow>
                    <TableCell>{nft}</TableCell>
                  </TableRow>
                ))}
              </TableCell>
            </TableRow>
          ));
        }
        setData(rowsData);
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
              <TableCell>Referral ID</TableCell>
              <TableCell>User</TableCell>
              <TableCell>NFTs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{data}</TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default ReferralTab;
