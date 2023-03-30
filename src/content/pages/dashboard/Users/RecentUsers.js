import { useMemo, useEffect, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import { useNavigate } from 'react-router-dom';

import { Box, Typography, Card, Tooltip, IconButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';

// import { apiCall } from 'src/utils/axios';
// import { generateColFilters } from 'src/utils/table';

function RecentUsers() {
  const navigate = useNavigate();

  const handleUser = ({ original }) => {
    navigate('/dashboard/users/user-profile', {
      state: {
        user: original
      }
    });
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        filterVariant: 'text',
        size: 100,
        Cell: ({ cell, row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <img alt="" height={40} width={40} src={row.original.profilePicture} loading="lazy" style={{ borderRadius: '50%' }} />
            <Typography>{cell.getValue()}</Typography>
          </Box>
        )
      },
      {
        accessorKey: 'email',
        header: 'Email',
        filterVariant: 'text',
        size: 100
      },
      {
        accessorFn: (row) => row.ReferredBy,
        accessorKey: 'ref.users.name',
        header: 'Referred By',
        filterVariant: 'text',
        size: 100
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
        enableFullScreenToggle
        positionToolbarAlertBanner="bottom"
        enableGlobalFilter={false}
        enableRowActions
        positionActionsColumn={'last'}
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
        displayColumnDefOptions={{
          'mrt-row-actions': {
            header: 'Action'
          }
        }}
        renderRowActions={({ row }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="left" title="View Details">
              <span>
                <IconButton onClick={() => handleUser(row)}>
                  <DashboardIcon />
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        )}
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

export default RecentUsers;
