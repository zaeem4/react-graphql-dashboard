import { useMemo, useEffect, useState } from 'react';

import MaterialReactTable from 'material-react-table';

import { Box, Typography, TextField, Tooltip, Card, IconButton, Button } from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

import { apiCall } from 'src/utils/axios';
import { generateColFilters } from 'src/utils/table';

function RecentWithdrawals() {
  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => row.userId.name,
        accessorKey: 'userId.name',
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
            <img alt="avatar" height={40} width={40} src={row.original.userId.profilePicture} loading="lazy" style={{ borderRadius: '50%' }} />
            <Typography>{cell.getValue()}</Typography>
          </Box>
        )
      },
      {
        accessorFn: (row) => row.userId.email,
        enableClickToCopy: true,
        header: 'Email',
        size: 200,
        filterVariant: 'text',
        accessorKey: 'userId.email'
      },
      {
        accessorKey: 'amount',
        filterVariant: 'range',
        header: 'Amount',
        size: 100,
        Cell: ({ cell, row }) => (
          <Box
            sx={(theme) => ({
              backgroundColor:
                row.original.status === 'pending'
                  ? theme.palette.warning.dark
                  : row.original.status === 'rejected'
                  ? theme.palette.error.dark
                  : theme.palette.success.dark,
              borderRadius: '0.25rem',
              color: '#fff',
              maxWidth: '9ch',
              p: '0.25rem'
            })}
          >
            {cell.getValue()}
          </Box>
        )
      },
      {
        accessorKey: 'coin',
        header: 'Coin',
        size: 100,
        filterVariant: 'text'
      },
      {
        accessorKey: 'network',
        header: 'Network',
        size: 100,
        filterVariant: 'text'
      },
      {
        accessorFn: (row) => new Date(row.date),
        accessorKey: 'date',
        header: 'Request Date',
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
            renderInput={(params) => <TextField {...params} helperText={'Filter Mode: Lesss Than'} sx={{ minWidth: '120px' }} variant="standard" />}
            value={column.getFilterValue()}
          />
        )
      },
      {
        accessorKey: 'address',
        header: 'Wallet Address',
        enableClickToCopy: true,
        size: 250,
        filterVariant: 'text',
        Cell: ({ cell }) => <Typography sx={{ overflowWrap: 'break-word', width: '30ch' }}>{cell.getValue()}</Typography>
      },
      {
        accessorKey: 'status',
        filterVariant: 'select',
        filterSelectOptions: ['pending', 'rejected', 'accepted', 'reused'],
        header: 'Status',
        size: 100,
        Cell: ({ cell, row }) => (
          <Box
            sx={(theme) => ({
              backgroundColor:
                row.original.status === 'pending'
                  ? theme.palette.warning.dark
                  : row.original.status === 'rejected'
                  ? theme.palette.error.dark
                  : theme.palette.success.dark,
              borderRadius: '0.25rem',
              color: '#fff',
              maxWidth: '9ch',
              p: '0.25rem'
            })}
          >
            {cell.getValue()}
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

  const fetchWithdrawals = async () => {
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

  useEffect(() => {
    fetchWithdrawals();

    return () => {
      setData([]);
    };
  }, [columnFilters, globalFilter, pagination.pageIndex, pagination.pageSize, sorting]);

  const updateStatus = async (id, status) => {
    const data = await apiCall('updateWithdrawalStatus', {
      query: `mutation($id: [String]!, $status: String!){
              updateWithdrawalStatus(_ids: $id, status: $status) {
                body
                success
              }
            }`,
      variables: {
        id: id,
        status: status
      }
    });
    if (data.success) {
      fetchWithdrawals();
    }
  };

  const handleAccept = ({ original: row }) => {
    updateStatus([row._id], 'accepted');
  };

  const handleReject = async ({ original: row }) => {
    updateStatus([row._id], 'rejected');
  };

  return (
    <Card>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableColumnFilterModes
        enableColumnOrdering
        enableGrouping
        enableStickyHeader
        enableStickyFooter
        enableRowSelection
        enableGlobalFilter={false}
        enableFullScreenToggle
        positionToolbarAlertBanner="bottom"
        enableRowActions
        positionActionsColumn={'last'}
        initialState={{
          showColumnFilters: false
        }}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            header: 'Change Status'
          }
        }}
        renderRowActions={({ row }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="left" title="Accept">
              <span>
                <IconButton
                  color="success"
                  onClick={() => handleAccept(row)}
                  disabled={['rejected', 'accepted', 'reused'].includes(row.original.status)}
                >
                  <DoneIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip arrow placement="right" title="Reject">
              <span>
                <IconButton
                  color="error"
                  onClick={() => handleReject(row)}
                  disabled={['rejected', 'accepted', 'reused'].includes(row.original.status)}
                >
                  <CloseIcon />
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={({ table }) => {
          const handleAccept = () => {
            const selectedRows = table
              .getSelectedRowModel()
              .flatRows.map(({ original: row }) => {
                if (row.status === 'pending') {
                  return row._id;
                }
                return null;
              })
              .filter((row) => {
                return row != null;
              });
            if (selectedRows.length > 0) {
              updateStatus(selectedRows, 'accepted');
            }
          };

          const handleReject = () => {
            const selectedRows = table
              .getSelectedRowModel()
              .flatRows.map(({ original: row }) => {
                if (row.status === 'pending') {
                  return row._id;
                }
                return null;
              })
              .filter((row) => {
                return row != null;
              });
            if (selectedRows.length > 0) {
              updateStatus(selectedRows, 'rejected');
            }
          };

          return (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button color="error" disabled={table.getSelectedRowModel().flatRows.length === 0} onClick={handleReject} variant="contained">
                Reject
              </Button>
              <Button color="success" disabled={table.getSelectedRowModel().flatRows.length === 0} onClick={handleAccept} variant="contained">
                Accept
              </Button>
            </div>
          );
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
      />
    </Card>
  );
}

export default RecentWithdrawals;
