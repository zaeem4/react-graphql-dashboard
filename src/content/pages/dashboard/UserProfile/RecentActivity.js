import { Box, Typography, Card, CardHeader, Divider, Avatar, styled, Grid } from '@mui/material';

import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import GiftIcon from 'src/assest/Icons/gift.png';
import { InsertInvitationTwoTone } from '@mui/icons-material';

const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(7)};
      height: ${theme.spacing(7)};
`
);

function RecentActivity({ userDetails }) {
  console.log(userDetails, '...');
  return (
    <>
      {userDetails && (
        <Card>
          <CardHeader title="Details" />
          <Divider />
          {userDetails.nfts && (
            <>
              <Box px={2} py={3} display="flex" alignItems="flex-start">
                <AvatarPrimary>
                  <FavoriteTwoToneIcon />
                </AvatarPrimary>
                <Box pl={2} flex={1}>
                  <Typography variant="h4">NFT</Typography>

                  <Box pt={1} display="flex">
                    <Box pr={6}>
                      <Typography gutterBottom variant="body2">
                        Total NFTs
                      </Typography>
                      <Typography variant="h3">{userDetails.nfts.nftsMetadata.length}</Typography>
                    </Box>
                    <Box>
                      <Typography gutterBottom variant="body2">
                        NFTs Value
                      </Typography>{' '}
                      <Typography variant="h3">{userDetails.nfts.totalNFTValue}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Divider />
            </>
          )}

          {userDetails.withdrawals && (
            <>
              <Box px={2} py={3} display="flex" alignItems="flex-start">
                <AvatarPrimary>
                  <Box src={GiftIcon} component="img" />
                </AvatarPrimary>
                <Box pl={2} flex={1}>
                  <Typography variant="h4">Rewards</Typography>
                  <Grid container>
                    {/* <Box display="flex"> */}
                    <Grid item md={6} pt={1}>
                      <Typography gutterBottom variant="body2">
                        Profit Participation
                      </Typography>
                      <Typography variant="h3">{userDetails.rewards.RewardsReceived}</Typography>
                    </Grid>
                    {/* <Grid item md={6} pt={1}>
                      <Typography gutterBottom variant="body2">
                        Total Rewards
                      </Typography>
                      <Typography variant="h3">{userDetails.rewards.TotalAmount && Number(userDetails.rewards.TotalAmount.toFixed(0))}</Typography>
                    </Grid> */}
                    {/* </Box>
          <Box pt={1} display="flex"> */}
                    {/* <Grid item md={6}>
                      <Typography gutterBottom variant="body2">
                        Instant Rewards
                      </Typography>
                      <Typography variant="h3">{userDetails.rewards.ActiveReferralsRewards}</Typography>
                    </Grid>
                    <Grid item md={6}>
                      <Typography gutterBottom variant="body2">
                        Passive Rewards
                      </Typography>
                      <Typography variant="h3">{userDetails.rewards.PassiveReferralRewards}</Typography>
                    </Grid> */}
                    {/* </Box> */}
                  </Grid>
                </Box>
              </Box>
              <Divider />
            </>
          )}
          {userDetails.rewards && (
            <>
              <Box px={2} py={3} display="flex" alignItems="flex-start">
                <AvatarPrimary>
                  <InsertInvitationTwoTone />
                </AvatarPrimary>
                <Box pl={2} flex={1}>
                  <Typography variant="h4">Referrals</Typography>

                  <Box pt={1} display="flex">
                    <Box pr={6}>
                      <Typography gutterBottom variant="body2">
                        Total Refferals
                      </Typography>
                      <Typography variant="h3">
                        {userDetails.rewards.ReferralsCount && Number(userDetails.rewards.ReferralsCount.toFixed(0))}
                      </Typography>
                    </Box>
                    <Box pr={6}>
                      <Typography gutterBottom variant="body2">
                        Instant Referral Rewards
                      </Typography>
                      <Typography variant="h3">{userDetails.rewards.ActiveReferralsRewards}</Typography>
                    </Box>

                    <Box pr={6}>
                      <Typography gutterBottom variant="body2">
                        Passive Referral Rewards
                      </Typography>
                      <Typography variant="h3">{userDetails.rewards.PassiveReferralRewards}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Divider />
            </>
          )}
          {userDetails.rewards && (
            <Box px={2} py={3} display="flex" alignItems="flex-start">
              <AvatarPrimary>
                <StarTwoToneIcon />
              </AvatarPrimary>
              <Box pl={2} flex={1}>
                <Typography variant="h4">Withdrawal</Typography>

                <Box pt={1} display="flex">
                  <Box pr={6}>
                    <Typography gutterBottom variant="body2">
                      Withdrawable Amount
                    </Typography>
                    <Typography variant="h3">
                      {userDetails.rewards.TotalWithdrawableAmount && Number(userDetails.rewards.TotalWithdrawableAmount.toFixed(0))}
                    </Typography>
                  </Box>
                  <Box pr={6}>
                    <Typography gutterBottom variant="body2">
                      Withdrawn Amount
                    </Typography>
                    <Typography variant="h3">
                      {userDetails.rewards.WithdrawnAmount && Number(userDetails.rewards.WithdrawnAmount.toFixed(0))}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography gutterBottom variant="body2">
                      Total Amount
                    </Typography>
                    <Typography variant="h3">{userDetails.rewards.TotalAmount && Number(userDetails.rewards.TotalAmount.toFixed(0))}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Card>
      )}
    </>
  );
}

export default RecentActivity;
