
import { useMemo, useState, useEffect } from 'react';

import { Card } from '@mui/material';
import MaterialReactTable from 'material-react-table';

// import { apiCall } from 'src/utils/axios';

export default function Payments() {

  const [payments, setPayments] = useState();

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    
  };

  const columns = useMemo(() => [
    {
      accessorKey: 'txhash',
      header: 'txhash',
      size: 50,
      filterVariant: 'text'
    },
    {
      accessorKey: 'PaymentWallet',
      header: 'PaymentWallet',
      size: 50,
      filterVariant: 'text'
    },
    {
      accessorFn: (row) => row.NFTs.substr(2, 9),
      accessorKey: 'NFTs',
      header: 'NFTs',
      size: 50,
      filterVariant: 'text'
    },
    {
      accessorFn: (row) => (row.Status ? 'Complete' : 'Incomplete'),
      accessorKey: 'Status',
      header: 'Status',
      size: 50,
      filterVariant: 'text'
    },
    {
      accessorKey: 'User.name',
      header: 'User Name',
      size: 50,
      filterVariant: 'text'
    },
    {
      accessorKey: 'Address',
      header: 'Address',
      size: 50,
      filterVariant: 'text'
    },
    {
      accessorKey: 'ValueReceived',
      header: 'Value Received',
      size: 50,
      filterVariant: 'text'
    }
  ]);
  return (
    <div>
      <Card>
        {payments && (
          <MaterialReactTable
            columns={columns}
            data={payments}
            // enableColumnFilterModes
            // enableColumnOrdering
            // enableGrouping
            // enableStickyHeader
            // enableStickyFooter
            // enableFullScreenToggle
            // enableGlobalFilter={false}
            // positionToolbarAlertBanner="bottom"
            // initialState={{
            //   sorting: [{ id: '_id', desc: true }],
            //   showColumnFilters: false
            // }}
            // manualFiltering
            // manualPagination
            // manualSorting
            // muiToolbarAlertBannerProps={
            //   isError
            //     ? {
            //         color: 'error',
            //         children: 'Error loading data'
            //       }
            //     : undefined
            // }
            // onColumnFiltersChange={setColumnFilters}
            // onGlobalFilterChange={setGlobalFilter}
            // onPaginationChange={setPagination}
            // onSortingChange={setSorting}
            // rowCount={rowCount}
            // state={{
            //   columnFilters,
            //   globalFilter,
            //   isLoading,
            //   pagination,
            //   showAlertBanner: isError,
            //   showProgressBars: isRefetching,
            //   sorting
            // }}
          />
        )}
      </Card>
    </div>
  );
}
