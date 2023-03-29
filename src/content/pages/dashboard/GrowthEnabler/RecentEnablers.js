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

function RecentEnablers() {
  const eligibleUsersColumns = useMemo(
    () => [
    //   {
    //     accessorKey: 'user._id',
    //     header: '_id',
    //     size: 200,
    //     filterVariant: 'text',       
    //   },
      {
        accessorKey: 'user.name',
        filterVariant: 'text',
        header: 'Name',
        size: 200,
        Cell: ({ cell, row }) => (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <img alt="" height={40} width={40} src={row.original.user.profilePicture} loading="lazy" style={{ borderRadius: '50%' }} />
              <Typography>{cell.getValue()}</Typography>
            </Box>
          )
      },
      {
        accessorKey: 'user.email',
        header: 'Email',
        size: 200,
        filterVariant: 'text'
      },
      {
        accessorKey: 'referralAmount',
        header: 'Total Referral Amount',
        size: 200,
        filterVariant: 'range'
      },

    ],
    []
  );

  const claimedUserColumns = useMemo(
    () => [
        // {
        //     accessorKey: '_id',
        //     header: '_id',
        //     size: 200,
        //     filterVariant: 'text',       
        //   },
        {
            accessorFn: (row) => row.user!==undefined && row.user.name!==undefined?row.user.name:"",
            accessorKey: 'user.name',
            filterVariant: 'text',
            header: 'Name',
            size: 200,
            Cell: ({ cell, row }) => (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}
                >
                  <img alt="" height={40} width={40} src={row.original?.user?.profilePicture} loading="lazy" style={{ borderRadius: '50%' }} />
                  <Typography>{cell.getValue()}</Typography>
                </Box>
              )
          },
          {
            accessorFn: (row) => row.user!==undefined && row.user.email!==undefined?row.user.email:"",
            accessorKey: 'user.email',
            header: 'Email',
            size: 200,
            filterVariant: 'text'
          },     
          {
            accessorKey: 'no_of_earned_coins',
            header: 'Coin Earned',
            size: 200,
            filterVariant: 'range'
          },
          {
            // accessorFn: (row) => row.address!==undefined?,
            accessorKey: 'address',
            header: 'Address Details',
            size: 500,
            filterVariant: 'text',
            enableColumnFilter:false,
            Cell: ({ cell, row }) => (
                <Box
                  sx={{
                    // display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}
                >                  
                <Typography>Address1:&nbsp;{cell.getValue().address1}</Typography>
                <Typography>Address2:&nbsp;{cell.getValue().address2}</Typography>
                <Typography>City:&nbsp;{cell.getValue().city}</Typography>
                <Typography>State:&nbsp;{cell.getValue().state}</Typography>
                <Typography>Country:&nbsp;{cell.getValue().country}</Typography>
                </Box>
              )
          
          },
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

  const [searchType, setSearchType] = useState('eligible');

  const fetchGrowthEnablers = async (searchType) => {
    return null;
  };
  const claimedCoinsUsersQuery=async()=>{

   return null;
  }
  const eligibleUsersQuery=async()=>{
   return null;
  }
  const handleChange = (event) => {
    setPagination({
      pageIndex: 0,
      pageSize: pagination.pageSize
    });
    setData([]);
    setSearchType(event.target.value);
    fetchGrowthEnablers(event.target.value);
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

  
  useEffect(() => {
    fetchGrowthEnablers(searchType);

    return () => {
      setData([]);
    };
  }, [columnFilters, globalFilter, pagination.pageIndex, pagination.pageSize, sorting]);

  return (
    <Card>
      <Box sx={{ textAlign: 'right', margin: '.5rem' }}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-select-small">Results Type</InputLabel>
          <Select labelId="demo-select-small" id="demo-select-small" value={searchType} label="Nft Type" onChange={handleChange}>
            <MenuItem value={'eligible'}>Eligible Users</MenuItem>
            <MenuItem value={'claimed'}>Coins Claimed</MenuItem>
            
          </Select>
        </FormControl>
      </Box>

      <MaterialReactTable
        columns={searchType === 'eligible' ? eligibleUsersColumns : claimedUserColumns}
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
            {/* <IconButton onClick={() => handleExportData(data, nftType)}>
              <DownloadIcon />
            </IconButton> */}
            <ToggleFiltersButton table={table} />
            <ShowHideColumnsButton table={table} />
            <FullScreenToggleButton table={table} />
          </>
        )}
      />
    </Card>
  );
}

export default RecentEnablers;
