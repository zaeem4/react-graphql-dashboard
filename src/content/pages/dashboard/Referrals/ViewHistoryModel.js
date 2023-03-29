import PropTypes from 'prop-types';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

const CloseIconDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

function CloseIconDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

CloseIconDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired
};

export default function ViewHistoryModel({ open, handleClose }) {
  return (
    <CloseIconDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open.state}>
      <CloseIconDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Referrals Details
      </CloseIconDialogTitle>
      {open.row.original?.referrals?.length > 0 ? (
        open.row.original?.referrals?.map((referral) => (
          <DialogContent dividers>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <img alt="avatar" height={60} width={60} src={referral.nft?.nftSrc} loading="lazy" style={{ borderRadius: '50%' }} />
              <Typography>
                {referral.nft?.itemName} - {referral.nft?.price}
              </Typography>
            </Box>
            <TableContainer key={referral.token}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Reward from</TableCell>
                    <TableCell>Instant</TableCell>
                    <TableCell>Reward</TableCell>
                    <TableCell>Date/Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {referral.history.map((item) => (
                    <TableRow key={item._id} hover>
                      <TableCell>
                        {item.rewardfrom ? (
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '1rem'
                            }}
                          >
                            <img alt="avatar" height={30} src={item.rewardfrom.profilePicture} loading="lazy" style={{ borderRadius: '50%' }} />
                            <Typography>{item.rewardfrom.email}</Typography>
                          </Box>
                        ) : (
                          ''
                        )}
                      </TableCell>
                      <TableCell>{item.instantRewards?.toFixed(2) ?? ''}</TableCell>
                      <TableCell>{item.reward?.toFixed(2) ?? ''}</TableCell>
                      <TableCell>{item.date ? new Date(item.date).toLocaleDateString() : ''}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
        ))
      ) : (
        <DialogContent dividers>
          <Typography>No referrals againt this user</Typography>
        </DialogContent>
      )}
    </CloseIconDialog>
  );
}
