import axios from 'axios';
import { apiCall } from 'src/utils/axios';

let token = localStorage.getItem('TOKEN');

export const getUserNFTs = async (userWalletAddressDB) => {
  try {
    const responseGetUserNFTs = await axios({
      url: process.env.REACT_APP_SERVER_URL,
      headers: { bearer: token },
      method: 'post',
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': '*',
      data: {
        query: `
            query {
              getUserNFTs(userWalletAddressDB: "${userWalletAddressDB}") {
                nftsMetadata {
                  _id
                  itemName
                  price
                  owner
                  referalAmount
                  series
                  nftSrc
                  favourites
                  description
                  creator
                  about
                  rank
                  category
                  type
                  tileSize
                  zone
                  rarity
                }
                totalNFTValue
                iron
                ironReward
                bronze
                bronzeReward
                silver
                silverReward
                gold
                goldReward
              }
            }
          `
      }
    });
    let userNFTs = responseGetUserNFTs.data.data.getUserNFTs;
    return userNFTs;
  } catch (error) {
    console.log('Error in getUserNFTs: ', error);
    return error;
  }
};

export const getWithdrawValues = async (email) => {
  try {
    const responsegetWithdrawValues = await axios({
      url: process.env.REACT_APP_SERVER_URL,
      headers: { bearer: token },
      method: 'post',
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': '*',
      data: {
        query: `
              query {
                getWithdrawValues( email: "${email}"){
                  ReferralRewardEarned
                  TotalWithDrawAbleAmount
                  TotalAmount
                  RewardsEarned
                }
              }
            `
      }
    });

    let getWithdrawValuess = responsegetWithdrawValues.data.data.getWithdrawValues;
    return getWithdrawValuess;
  } catch (error) {
    console.log('Error in getAppliedReferrals: ', error);
    return error;
  }
};

export const getUserRewards = async (userEmail) => {
  try {
    const responseRewardValues = await apiCall('getUserRewards', {
      query: `
        query($email: String!) {
          getUserRewards(email: $email) {
            WithdrawnAmount
            RewardsReceived
            TotalWithdrawableAmount
            ActiveReferralsRewards
            PassiveReferralRewards
            ReferralsCount
            TotalAmount
          }
        }
        `,
      variables: {
        email: userEmail
      }
    });
    return responseRewardValues;
  } catch (error) {
    console.log('Error in getUserRewards: ', error);
    return error;
  }
};
