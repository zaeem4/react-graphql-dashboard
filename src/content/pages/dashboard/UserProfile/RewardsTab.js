import { useEffect, useState } from 'react';

import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Card } from '@mui/material';

// import { apiCall } from 'src/utils/axios';
import { useLocation } from 'react-router-dom';

function RewardsTab() {
  const location = useLocation();
  const user = location.state.user;
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchRewards();

    return () => {
      setData([]);
    };
  }, []);

  const fetchRewards = async () => {
    try {
      
      // if (response.success) {
      //   let rowsData = [];
      //   if (response.rewards !== undefined && response.rewards.length > 0) {
      //   //   console.log('res', response);
      //     rowsData = response.rewards.map((item) => (
      //       <>
      //         <TableRow hover key={item?.nft?._id}>
      //           <TableCell>{item?.nft?.itemName}</TableCell>
      //         </TableRow>
      //         {/* <TableRow> */}
                

      //           {item?.referral?.history?.map((referral) =>
      //             referral.instantRewards ? (
      //               <TableRow>
      //                   <TableCell>{''}</TableCell>
      //                 <TableCell>{referral?.rewardfrom?.name}</TableCell>
      //                 <TableCell>{new Date(referral?.date).toLocaleDateString()}</TableCell>
      //                 <TableCell>{referral?.instantRewards}</TableCell>
      //                 <TableCell>{"Instant referral reward"}</TableCell>
      //               </TableRow>
      //             ) : (
      //               <></>
      //             )
      //           )}
      //            {item?.weeklyRewardOnNft?.map((wkrn) =>                  
      //              <> <TableRow>
      //                   <TableCell>{''}</TableCell>
      //                   <TableCell>{''}</TableCell>
      //                 <TableCell>{new Date(parseInt(wkrn?.date)).toLocaleDateString()}</TableCell>
      //                 <TableCell>{Math.round(wkrn?.reward)}</TableCell>
      //                 <TableCell>{"Profit participation reward"}</TableCell>
      //               </TableRow>
      //               {Math.round(wkrn?.Referralbonus)!==0 && (<TableRow>
      //                   <TableCell>{''}</TableCell>
      //                   <TableCell>{''}</TableCell>
      //                 <TableCell>{new Date(parseInt(wkrn?.date)).toLocaleDateString()}</TableCell>
      //                 <TableCell>{Math.round(wkrn?.Referralbonus)}</TableCell>
      //                 <TableCell>{"Passive referral reward"}</TableCell>
      //               </TableRow>)}
      //           </>
      //           )}
      //         {/* </TableRow> */}
      //       </>
      //     ));
      //   }
      //   // console.log(response, 'res');
      //   setData(rowsData);
      // }
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
              <TableCell>NFT Name</TableCell>
              <TableCell>Reward From</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>REWARD AMOUNT</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{data}</TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default RewardsTab;
