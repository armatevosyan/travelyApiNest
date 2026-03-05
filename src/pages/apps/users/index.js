import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState, Fragment } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import { Chip, Stack, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography, useMediaQuery } from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';
import { useFilters, useExpanded, useGlobalFilter, useRowSelect, useSortBy, useTable, usePagination } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import { HeaderSort, SortingSelect, TablePagination, TableRowSelection, IndeterminateCheckbox } from 'components/third-party/ReactTable';

import CustomerView from 'sections/apps/customer/CustomerView';

import { GlobalFilter } from 'utils/react-table';

// assets
import { StopOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { dispatch } from '@/redux/store';
import { findAllRequest, deactivateUserRequest, activateUserRequest, clearUserMessages } from '@/redux/users/actions';
import { useSelector } from 'react-redux';

// material-ui
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const avatarImage = require.context('assets/images/users', true);

const defaultParams = {
  page: 1,
  limit: 10
};

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, getHeaderProps, renderRowSubComponent, total, setParams }) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const sortBy = [
    { id: 'createdAt_desc', canSort: true, title: 'Newest First', desc: true },
    { id: 'createdAt_asc', canSort: true, title: 'Oldest First', desc: false }
  ];

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setHiddenColumns,
    visibleColumns,
    page,
    gotoPage,
    setPageSize,
    state: { globalFilter, selectedRowIds, pageIndex, pageSize, expanded },
    preGlobalFilteredRows
  } = useTable(
    {
      columns,
      data,
      // @ts-ignore
      initialState: { pageIndex: 0, pageSize: 10, hiddenColumns: ['avatar', 'email'] }
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  useEffect(() => {
    if (matchDownSM) {
      setHiddenColumns(['age', 'contact', 'visits', 'email', 'status', 'avatar']);
    } else {
      setHiddenColumns(['avatar', 'email']);
    }
    // eslint-disable-next-line
  }, [matchDownSM]);

  return (
    <>
      <TableRowSelection selected={Object.keys(selectedRowIds).length} />
      <Stack spacing={3}>
        <Stack
          direction={matchDownSM ? 'column' : 'row'}
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: 3, pb: 0 }}
        >
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={(value) => {
              setParams({ ...defaultParams, search: value });
            }}
            size="small"
          />
          <Stack direction={matchDownSM ? 'column' : 'row'} alignItems="center" spacing={1}>
            <SortingSelect
              sortBy={sortBy[0].id}
              setSortBy={(value) => {
                setParams({
                  sort: 'createdAt',
                  order: value[0].id === 'createdAt_asc' ? 'asc' : 'desc'
                });
              }}
              allColumns={sortBy}
            />
          </Stack>
        </Stack>

        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup, i) => (
              <TableRow key={i} {...headerGroup.getHeaderGroupProps()} sx={{ '& > th:first-of-type': { width: '58px' } }}>
                {headerGroup.headers.map((column, index) => (
                  <TableCell key={index} {...column.getHeaderProps([{ className: column.className }, getHeaderProps(column)])}>
                    <HeaderSort column={column} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              const rowProps = row.getRowProps();

              return (
                <Fragment key={i}>
                  <TableRow
                    {...row.getRowProps()}
                    onClick={() => {
                      row.toggleRowSelected();
                    }}
                    sx={{ cursor: 'pointer', bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
                  >
                    {row.cells.map((cell, index) => (
                      <TableCell key={index} {...cell.getCellProps([{ className: cell.column.className }])}>
                        {cell.render('Cell')}
                      </TableCell>
                    ))}
                  </TableRow>
                  {row.isExpanded && renderRowSubComponent({ row, rowProps, visibleColumns, expanded })}
                </Fragment>
              );
            })}
            <TableRow sx={{ '&:hover': { bgcolor: 'transparent !important' } }}>
              <TableCell sx={{ p: 2, py: 3 }} colSpan={9}>
                <TablePagination
                  gotoPage={(page) => {
                    gotoPage(page);
                    setParams({
                      page: page + 1 || 1
                    });
                  }}
                  total={total}
                  setPageSize={(pageSize, page) => {
                    setPageSize(pageSize);
                    setParams({
                      limit: pageSize,
                      page: page || 1
                    });
                  }}
                  pageSize={pageSize}
                  pageIndex={pageIndex}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Stack>
    </>
  );
}

ReactTable.propTypes = {
  total: PropTypes.number,
  columns: PropTypes.array,
  data: PropTypes.array,
  getHeaderProps: PropTypes.func,
  renderRowSubComponent: PropTypes.any,
  setParams: PropTypes.func
};

// ==============================|| CUSTOMER - LIST ||============================== //

// Section Cell and Header
const SelectionCell = ({ row }) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />;
const SelectionHeader = ({ getToggleAllPageRowsSelectedProps }) => (
  <IndeterminateCheckbox indeterminate {...getToggleAllPageRowsSelectedProps()} />
);

const CustomCell = ({ row }) => {
  const { values } = row;
  // API returns avatar as profileImage id (e.g. 46); assets only have avatar-1.png, avatar-2.png, etc.
  const avatarIndex = typeof values.avatar === 'number' && values.avatar >= 1 && values.avatar <= 20 ? values.avatar : 1;
  const avatarSrc = avatarImage(`./avatar-${avatarIndex}.png`);
  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Avatar alt={values.name || values.fullName || 'User'} size="sm" src={avatarSrc} />
      <Stack spacing={0}>
        <Typography variant="subtitle1">{values.name ?? values.fullName ?? '—'}</Typography>
        <Typography variant="caption" color="textSecondary">
          {values.email ?? '—'}
        </Typography>
      </Stack>
    </Stack>
  );
};

const NumberFormatCell = ({ value }) => <NumberFormat displayType="text" format="+1 (###) ###-####" mask="_" defaultValue={value} />;

const StatusCell = (deactivatedAt, verifiedAt, deactivationReason) => {
  if (deactivatedAt) {
    return (
      <Stack spacing={0.5}>
        <Chip color="error" label="Deactivated" size="small" variant="light" />
        {deactivationReason && (
          <Typography variant="caption" color="textSecondary" sx={{ maxWidth: 160 }} noWrap title={deactivationReason}>
            {deactivationReason}
          </Typography>
        )}
      </Stack>
    );
  }
  if (!verifiedAt) {
    return <Chip color="info" label="Not verifed" size="small" variant="light" />;
  }
  return <Chip color="success" label="Verified" size="small" variant="light" />;
};

const ActionCell = (row, onOpenDeactivateModal) => {
  const isDeactivated = !!row.original?.deactivatedAt;

  return (
    <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
      {isDeactivated ? (
        <Tooltip title="Activate user">
          <IconButton
            color="success"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDeactivateModal({ id: row.values.id, name: row.values.name ?? row.original?.fullName, action: 'activate' });
            }}
          >
            <CheckCircleOutlined />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Deactivate user">
          <IconButton
            color="error"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDeactivateModal({ id: row.values.id, name: row.values.name ?? row.original?.fullName, action: 'deactivate' });
            }}
          >
            <StopOutlined />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
};

StatusCell.propTypes = {
  value: PropTypes.number
};

NumberFormatCell.propTypes = {
  value: PropTypes.string
};

CustomCell.propTypes = {
  row: PropTypes.object
};

SelectionCell.propTypes = {
  row: PropTypes.object
};

SelectionHeader.propTypes = {
  getToggleAllPageRowsSelectedProps: PropTypes.func
};

const UsersPage = () => {
  const { usersList, usersCount, success, successMessage, error, errorMessage } = useSelector((state) => state.users);

  const [params, setParams] = useState(defaultParams);
  const [confirmModal, setConfirmModal] = useState({ open: false, id: null, name: '', action: null, reason: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    dispatch(findAllRequest(params));
  }, [params]);

  useEffect(() => {
    if (success && successMessage) {
      setSnackbar({ open: true, message: successMessage, severity: 'success' });
      dispatch(clearUserMessages());
      dispatch(findAllRequest(params));
    }
  }, [success, successMessage, dispatch, params]);

  useEffect(() => {
    if (error && errorMessage) {
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
      dispatch(clearUserMessages());
    }
  }, [error, errorMessage, dispatch]);

  const handleOpenConfirm = useCallback((payload) => {
    setConfirmModal({ open: true, id: payload.id, name: payload.name ?? 'this user', action: payload.action, reason: '' });
  }, []);

  const handleCloseConfirm = useCallback(() => {
    setConfirmModal({ open: false, id: null, name: '', action: null, reason: '' });
  }, []);

  const handleConfirmAction = useCallback(() => {
    if (confirmModal.action === 'deactivate' && confirmModal.id) {
      dispatch(deactivateUserRequest({ id: confirmModal.id, reason: confirmModal.reason || undefined }));
    } else if (confirmModal.action === 'activate' && confirmModal.id) {
      dispatch(activateUserRequest({ id: confirmModal.id }));
    }
    handleCloseConfirm();
  }, [confirmModal.id, confirmModal.action, confirmModal.reason, handleCloseConfirm]);

  const columns = useMemo(
    () => [
      {
        title: 'Row Selection',
        Header: SelectionHeader,
        accessor: 'selection',
        Cell: SelectionCell,
        disableSortBy: true
      },
      {
        Header: '#',
        accessor: 'id',
        className: 'cell-center',
        disableSortBy: true
      },
      {
        Header: 'User Name',
        accessor: 'name',
        Cell: CustomCell,
        disableSortBy: true
      },
      {
        Header: 'Avatar',
        accessor: 'avatar',
        disableSortBy: true
      },
      {
        Header: 'Email',
        accessor: 'email',
        disableSortBy: true
      },
      {
        Header: 'Phone',
        accessor: 'phone',
        disableSortBy: true
      },
      {
        Header: 'Role',
        accessor: 'role',
        disableSortBy: true,
        Cell: ({ row }) => row?.original?.role?.name
      },
      {
        Header: 'Status',
        accessor: 'status',
        disableSortBy: true,
        Cell: ({ row }) =>
          StatusCell(row?.original?.deactivatedAt, row?.original?.verifiedAt, row?.original?.deactivationReason)
      },
      {
        Header: 'Actions',
        className: 'cell-center',
        disableSortBy: true,
        Cell: ({ row }) => ActionCell(row, handleOpenConfirm)
      }
    ],
    [handleOpenConfirm]
  );

  const renderRowSubComponent = useCallback(
    ({ row }) => <CustomerView data={usersList.find((u) => u.id === row.values.id)} />,
    [usersList]
  );

  return (
    <MainCard content={false}>
      <ScrollX>
        <ReactTable
          data={usersList}
          total={usersCount}
          columns={columns}
          setParams={(data) => setParams((prev) => ({ ...prev, ...data }))}
          getHeaderProps={(column) => column.getSortByToggleProps()}
          renderRowSubComponent={renderRowSubComponent}
        />
      </ScrollX>
      <Dialog open={confirmModal.open} onClose={handleCloseConfirm} maxWidth="sm" fullWidth>
        <DialogTitle>
          {confirmModal.action === 'deactivate' ? 'Deactivate user' : 'Activate user'}
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            {confirmModal.action === 'deactivate'
              ? `Deactivate "${confirmModal.name}"? The user will not be able to sign in until reactivated.`
              : `Activate "${confirmModal.name}"? The user will be able to sign in again.`}
          </Typography>
          {confirmModal.action === 'deactivate' && (
            <TextField
              fullWidth
              multiline
              minRows={2}
              maxRows={4}
              placeholder="Reason for deactivation (optional)"
              value={confirmModal.reason}
              onChange={(e) => setConfirmModal((prev) => ({ ...prev, reason: e.target.value }))}
              inputProps={{ maxLength: 1000 }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm}>Cancel</Button>
          <Button
            onClick={handleConfirmAction}
            color={confirmModal.action === 'deactivate' ? 'error' : 'primary'}
            variant="contained"
          >
            {confirmModal.action === 'deactivate' ? 'Deactivate' : 'Activate'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </MainCard>
  );
};

export default UsersPage;
