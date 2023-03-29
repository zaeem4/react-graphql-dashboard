import { useMemo, useEffect, useState } from 'react';

import MaterialReactTable, {
  MRT_ShowHideColumnsButton as ShowHideColumnsButton,
  MRT_FullScreenToggleButton as FullScreenToggleButton,
  MRT_ToggleFiltersButton as ToggleFiltersButton
} from 'material-react-table';

import { convertArrayToCSV } from 'convert-array-to-csv';

import { Box, Typography, Card, InputLabel, MenuItem, FormControl, Select, TextField, IconButton } from '@mui/material';

import DownloadIcon from '@mui/icons-material/Download';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { apiCall } from 'src/utils/axios';
import { generateColFilters } from 'src/utils/table';

function RecentNfts() {
  const unsoldnftsColumns = useMemo(
    () => [
      {
        accessorKey: 'itemName',
        header: 'Name',
        size: 200,
        filterVariant: 'text',
        Cell: ({ cell, row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <img alt="avatar" height={30} src={row.original.nftSrc} loading="lazy" style={{ borderRadius: '50%' }} />
            <Typography>{cell.getValue()}</Typography>
          </Box>
        )
      },
      {
        accessorKey: 'price',
        filterVariant: 'range',
        header: 'Price',
        size: 50
      },
      {
        accessorKey: 'rarity',
        header: 'Rarity',
        size: 50,
        filterVariant: 'text'
      },
      {
        accessorKey: 'type',
        header: 'Type',
        size: 50,
        filterVariant: 'text'
      },
      {
        accessorFn: (row) => row.attributes?.Structure,
        accessorKey: 'attributes.Structure',
        header: 'Structure',
        size: 50,
        filterVariant: 'text'
      }
    ],
    []
  );

  const mintednftsColumns = useMemo(
    () => [
      {
        accessorFn: (row) => new Date(row.date),
        accessorKey: 'date',
        header: 'Minted Date',
        filterFn: 'lessThanOrEqualTo',
        sortingFn: 'datetime',
        filterVariant: 'datetime',
        Cell: ({ cell }) => cell.getValue()?.toLocaleDateString(),
        Header: ({ column }) => <em>{column.columnDef.header}</em>,
        Filter: ({ column }) => (
          <DatePicker
            onChange={(newValue) => {
              column.setFilterValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} helperText={'Filter Mode: Lesss Than'} sx={{ minWidth: '100px' }} variant="standard" />}
            value={column.getFilterValue()}
          />
        )
      },
      {
        accessorFn: (row) => row.nft.itemName,
        accessorKey: 'nft.itemName',
        header: 'NFT Name',
        size: 200,
        filterVariant: 'text',
        Cell: ({ cell, row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <img alt="avatar" height={30} src={row.original.nft?.nftSrc} loading="lazy" style={{ borderRadius: '50%' }} />
            <Typography>{cell.getValue()}</Typography>
          </Box>
        )
      },
      {
        accessorFn: (row) => row.nft.rarity,
        accessorKey: 'nft.rarity',
        header: 'Rarity',
        size: 50,
        filterVariant: 'text'
      },
      {
        accessorFn: (row) => row.nft.type,
        accessorKey: 'nft.type',
        filterVariant: 'text',
        header: 'NFT Type',
        size: 100
      },
      {
        accessorFn: (row) => row.nft.price,
        accessorKey: 'nft.price',
        filterVariant: 'range',
        header: 'NFT Price',
        size: 100
      },
      {
        accessorFn: (row) => row.nft.attributes?.Structure,
        accessorKey: 'nft.attributes.Structure',
        header: 'Structure',
        size: 50,
        filterVariant: 'text'
      },
      {
        accessorFn: (row) => row.user.name,
        accessorKey: 'user.name',
        header: 'Owner',
        size: 200,
        filterVariant: 'text'
      },
      {
        accessorFn: (row) => row.eligible + '',
        accessorKey: 'eligible',
        header: 'Eligible for Profit',
        size: 200,
        filterVariant: 'text'
      },
      {
        accessorFn: (row) => row.user.email,
        accessorKey: 'user.email',
        header: 'User Email',
        size: 250,
        filterVariant: 'text',
        Cell: ({ cell, row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <img alt="avatar" height={40} width={40} src={row.original.user.profilePicture} loading="lazy" style={{ borderRadius: '50%' }} />
            <Typography>{cell.getValue()}</Typography>
          </Box>
        )
      }
    ],
    []
  );

  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5
  });

  const [nftType, setNftType] = useState('unsoldnfts');

  const fetchWithdrawals = async (nftType) => {
    try {
      if (!data.length) {
        setIsLoading(true);
      } else {
        setIsRefetching(true);
      }
      

      setIsError(false);
      setIsLoading(false);
      setIsRefetching(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setPagination({
      pageIndex: 0,
      pageSize: pagination.pageSize
    });
    setData([]);
    setNftType(event.target.value);
    fetchWithdrawals(event.target.value);
  };

  const downloadBlob = (content, filename, contentType) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);

    // Create a link to download it
    let pom = document.createElement('a');
    pom.href = url;
    pom.setAttribute('download', filename);
    pom.click();
  };

  const handleExportData = (data, nftType) => {
    if (nftType === 'mintednfts') {
      data = data.map((row) => {
        return {
          useremail: row.user.email,
          username: row.user.name,
          nftitem: row.nft.itemName,
          nftprice: row.nft.price,
          nfttype: row.nft.type,
          nftcategory: row.nft.category,
          minteddate: new Date(row.date).toLocaleDateString(),
          owned: row.owned,
          eligibleforprofitparticipation: row.eligible
        };
      });
    } else {
      data = data.map((row) => {
        return {
          nftitem: row.itemName,
          nftprice: row.price,
          nfttype: row.type,
          nftcategory: row.category,
          structure: row.attributes?.Structure
        };
      });
    }
    const rows = convertArrayToCSV(data);
    downloadBlob(rows, 'nfts.csv', 'text/csv;charset=utf-8;');
  };

  useEffect(() => {
    fetchWithdrawals(nftType);

    return () => {
      setData([]);
    };
  }, [columnFilters, globalFilter, pagination.pageIndex, pagination.pageSize, sorting]);

  return (
    <Card>
      <Box sx={{ textAlign: 'right', margin: '.5rem' }}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-select-small">Nft Type</InputLabel>
          <Select labelId="demo-select-small" id="demo-select-small" value={nftType} label="Nft Type" onChange={handleChange}>
            <MenuItem value={'unsoldnfts'}>All Nfts</MenuItem>
            <MenuItem value={'mintednfts'}>Minted Nfts</MenuItem>
            <MenuItem value={'unmintednfts'}>Un-Minted Nfts</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <MaterialReactTable
        columns={nftType === 'unsoldnfts' || nftType === 'unmintednfts' ? unsoldnftsColumns : mintednftsColumns}
        data={data}
        enableColumnFilterModes
        enableColumnOrdering
        enableGrouping
        enableStickyHeader
        enableStickyFooter
        enableFullScreenToggle
        enableGlobalFilter={false}
        positionToolbarAlertBanner="bottom"
        initialState={{
          showColumnFilters: false
        }}
        manualFiltering
        manualPagination
        manualSorting
        muiToolbarAlertBannerProps={
          isError
            ? {
                color: 'error',
                children: 'Error loading data'
              }
            : undefined
        }
        onColumnFiltersChange={setColumnFilters}
        onGlobalFilterChange={setGlobalFilter}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        rowCount={rowCount}
        state={{
          columnFilters,
          globalFilter,
          isLoading,
          pagination,
          showAlertBanner: isError,
          showProgressBars: isRefetching,
          sorting
        }}
        renderToolbarInternalActions={({ table }) => (
          <>
            <IconButton onClick={() => handleExportData(data, nftType)}>
              <DownloadIcon />
            </IconButton>
            <ToggleFiltersButton table={table} />
            <ShowHideColumnsButton table={table} />
            <FullScreenToggleButton table={table} />
          </>
        )}
      />
    </Card>
  );
}

export default RecentNfts;
