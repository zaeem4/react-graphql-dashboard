import axios from 'axios';
// import { apiCall } from 'src/utils/axios';

let token = localStorage.getItem('TOKEN');

export const getUserNFTs = async (userWalletAddressDB) => {
  try {
    
    // let userNFTs = responseGetUserNFTs.data.data.getUserNFTs;
    return userNFTs;
  } catch (error) {
    console.log('Error in getUserNFTs: ', error);
    return error;
  }
};

export const getWithdrawValues = async (email) => {
  try {

    // let getWithdrawValuess = responsegetWithdrawValues.data.data.getWithdrawValues;
    return getWithdrawValuess;
  } catch (error) {
    console.log('Error in getAppliedReferrals: ', error);
    return error;
  }
};

export const getUserRewards = async (userEmail) => {
  try {
    // return responseRewardValues;
  } catch (error) {
    console.log('Error in getUserRewards: ', error);
    return error;
  }
};
