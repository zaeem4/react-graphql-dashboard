// import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

const NftsDetails = ({ user, nfts }) => {
  return (
    <>
      {nfts && (
        <Box py={1} pl={2} mb={3}>
          <Typography gutterBottom variant="h4" py={2}>
            Card Number
          </Typography>
          <Typography variant="subtitle2">{user.cardNumber}</Typography>
          <Typography variant="h4" py={2}>
            Nuggets
          </Typography>
          <Typography variant="subtitle2">{user.nugget}</Typography>
          <Typography variant="h4" py={2}>
            Total NFTs
          </Typography>
          <Typography variant="subtitle2">{nfts.nftsMetadata.length}</Typography>
          <Typography variant="h4" py={2}>
            Points
          </Typography>
          <Typography variant="subtitle2">{user.totalScore}</Typography>
          <Typography gutterBottom variant="h4" py={2}>
            Golden Boosters
          </Typography>
          <Typography variant="subtitle2">{user.goldenTicket}</Typography>
        </Box>
      )}
    </>
  );
};

export default NftsDetails;
