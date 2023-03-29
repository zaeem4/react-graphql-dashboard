import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Card } from '@mui/material';

function NftsTab({ nfts }) {
  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>NFTs</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Tile Size</TableCell>
              <TableCell>Rarity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nfts?.nftsMetadata.map((item) => (
              <TableRow hover key={item._id}>
                <TableCell>{item._id}</TableCell>
                <TableCell>
                  <img alt="avatar" height={30} src={item.nftSrc} loading="lazy" style={{ borderRadius: '50%' }} />
                  {item.itemName}
                </TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.tileSize}</TableCell>
                <TableCell>{item.rarity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default NftsTab;
