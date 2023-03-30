import { lazy, useMemo, useEffect, useState } from 'react';

import MaterialReactTable from 'material-react-table';

import { Box, Typography, Card, Tooltip, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';

// import { apiCall } from 'src/utils/axios';
// import { generateColFilters } from 'src/utils/table';

const ViewHistoryModal = lazy(() => import('./ViewHistoryModel'));

function RecentReferrals() {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'User Name',
        size: 200,
        filterVariant: 'text'
      },
      {
        accessorKey: 'email',
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
            <img alt="avatar" height={40} width={40} src={row.original.profilePicture} loading="lazy" style={{ borderRadius: '50%' }} />
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

  const [viewHistoryModalOpen, setViewHistoryModalOpen] = useState({ state: false, row: {} });

  const fetchReferrals = async () => {
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
    fetchReferrals();

    return () => {
      setData([]);
    };
  }, [columnFilters, globalFilter, pagination.pageIndex, pagination.pageSize, sorting]);

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
            header: 'Action'
          }
        }}
        renderRowActions={({ row }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="left" title="View History">
              <span>
                <IconButton onClick={() => setViewHistoryModalOpen({ state: true, row })}>
                  <DashboardIcon />
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        )}
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

      <ViewHistoryModal open={viewHistoryModalOpen} handleClose={() => setViewHistoryModalOpen({ state: false, row: {} })} />
    </Card>
  );
}

export default RecentReferrals;
