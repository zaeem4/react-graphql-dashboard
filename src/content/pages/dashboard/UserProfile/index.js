import { lazy, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Grid, Tab, Tabs, Container, Card, Box, styled, Stack, Typography } from '@mui/material';

import { getUserNFTs, getUserRewards, getWithdrawValues } from './UserQueries';
// import ReferralTab from './ReferralTab';
// import RewardsTab from './RewardsTab';

const Page = lazy(() => import('src/components/Page'));
const SuspenseLoader = lazy(() => import('src/components/SuspenseLoader'));
const ProfileCover = lazy(() => import('./ProfileCover'));
const RecentActivity = lazy(() => import('./RecentActivity'));
const WithdrawalTab = lazy(() => import('./WithdrawalTab'));
const NftsDetails = lazy(() => import('./NftsDetails'));
const NftsTab = lazy(() => import('./NftsTab'));
const RewardsTab=lazy(()=>import('./RewardsTab'));
const ReferralTab=lazy(()=>import('./ReferralTab'));

const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
      padding: 0 ${theme.spacing(2)};
      position: relative;
      bottom: -1px;

      .MuiTabs-root {
        height: 44px;
        min-height: 44px;
      }

      .MuiTabs-scrollableX {
        overflow-x: auto !important;
      }

      .MuiTabs-indicator {
          min-height: 4px;
          height: 4px;
          box-shadow: none;
          bottom: -4px;
          background: none;
          border: 0;

          &:after {
            position: absolute;
            left: 50%;
            width: 28px;
            content: ' ';
            margin-left: -14px;
            background: ${theme.colors.primary.main};
            border-radius: inherit;
            height: 100%;
          }
      }

      .MuiTab-root {
          &.MuiButtonBase-root {
              height: 44px;
              min-height: 44px;
              background: ${theme.colors.alpha.white[50]};
              border: 1px solid ${theme.colors.alpha.black[10]};
              border-bottom: 0;
              position: relative;
              margin-right: ${theme.spacing(1)};
              font-size: ${theme.typography.pxToRem(14)};
              color: ${theme.colors.alpha.black[80]};
              border-bottom-left-radius: 0;
              border-bottom-right-radius: 0;

              .MuiTouchRipple-root {
                opacity: .1;
              }

              &:after {
                position: absolute;
                left: 0;
                right: 0;
                width: 100%;
                bottom: 0;
                height: 1px;
                content: '';
                background: ${theme.colors.alpha.black[10]};
              }

              &:hover {
                color: ${theme.colors.alpha.black[100]};
              }
          }

          &.Mui-selected {
              color: ${theme.colors.alpha.black[100]};
              background: ${theme.colors.alpha.white[100]};
              border-bottom-color: ${theme.colors.alpha.white[100]};

              &:after {
                height: 0;
              }
          }
      }
  `
);

function UserProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState({});

  const tabs = [
    { value: 'nfts', label: 'Nfts' },
    { value: 'withdrawals', label: 'Withdrawals' },
    { value: 'referral', label: 'Referrals' },
    { value: 'rewards', label: 'Rewards' }
  ];

  const [currentTab, setCurrentTab] = useState(tabs[0].value);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const [userDetails, setUserDetails] = useState({ nfts: null, rewards: null, withdrawals: null });

  const getUserDetails = async ({ user }) => {
    const nfts = await getUserNFTs(user.walletAddressDB);
    const withdrawals = await getWithdrawValues(user.email);
    const rewards = await getUserRewards(user.email);
    setUserDetails({
      nfts,
      withdrawals,
      rewards
    });
    setUser(user);
    setLoading(false);
  };

  useEffect(() => {
    if (location.state?.user) {
      getUserDetails(location.state);
    } else {
      navigate({ pathname: '/dashboard/users' });
    }

    return () => {
      setUser({});
    };
  }, []);

  return (
    <>
      <Page title="User-Profile" isFooter>
        <Container sx={{ mt: 3 }} maxWidth="lg">
          {loading ? (
            <SuspenseLoader />
          ) : (
            <Grid container justifyContent="center" alignItems="stretch" spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack>
                  <ProfileCover user={user} />
                  <NftsDetails user={user} nfts={userDetails.nfts} />
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <RecentActivity userDetails={userDetails} />
              </Grid>

              <Grid item xs={12}>
                <TabsContainerWrapper>
                  <Tabs
                    onChange={handleTabsChange}
                    value={currentTab}
                    variant="scrollable"
                    scrollButtons="auto"
                    textColor="primary"
                    indicatorColor="primary"
                  >
                    {tabs.map((tab) => (
                      <Tab key={tab.value} label={tab.label} value={tab.value} />
                    ))}
                  </Tabs>
                </TabsContainerWrapper>

                <Card variant="outlined">
                  <Grid container direction="row" justifyContent="center" alignItems="stretch">
                    {currentTab === tabs[0].value && (
                      <Grid item xs={12}>
                        <NftsTab nfts={userDetails.nfts} />
                      </Grid>
                    )}
                    {currentTab === tabs[1].value && (
                      <Grid item xs={12}>
                        <WithdrawalTab />
                      </Grid>
                    )}
                    {currentTab === tabs[2].value && (
                      <Grid item xs={12}>
                        <ReferralTab />
                      </Grid>
                    )}
                    {currentTab === tabs[3].value && (
                      <Grid item xs={12}>
                        <Box><RewardsTab />
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          )}
        </Container>
      </Page>
    </>
  );
}

export default UserProfile;
