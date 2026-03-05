import PropTypes from 'prop-types';
import { useCallback, useMemo, useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { alpha, useTheme } from '@mui/material/styles';
import {
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useMediaQuery,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert,
  Snackbar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material';

import { useExpanded, useGlobalFilter, useSortBy, useTable, usePagination } from 'react-table';

import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { HeaderSort, TablePagination } from 'components/third-party/ReactTable';
import { GlobalFilter } from 'utils/react-table';

import { getPlacesRequest, approvePlaceRequest, rejectPlaceRequest, clearPlaceErrors, clearPlaceMessages } from '@/redux/places/actions';

import { EyeTwoTone, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const STATUS_COLORS = {
  pending: 'warning',
  approved: 'success',
  rejected: 'error'
};

function ReactTable({ columns, data, renderRowSubComponent, loading }) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const sortBy = { id: 'name', desc: false };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setHiddenColumns,
    rows,
    page,
    gotoPage,
    setPageSize,
    state: { globalFilter, pageIndex, pageSize },
    preGlobalFilteredRows,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10, sortBy: [sortBy] }
    },
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination
  );

  useMemo(() => {
    if (matchDownSM) {
      setHiddenColumns(['id', 'address', 'category']);
    } else {
      setHiddenColumns([]);
    }
  }, [matchDownSM, setHiddenColumns]);

  return (
    <>
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 3, pb: 0 }}>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            size="small"
          />
        </Stack>

        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup, i) => (
              <TableRow key={i} {...headerGroup.getHeaderGroupProps()} sx={{ '& > th:first-of-type': { width: '58px' } }}>
                {headerGroup.headers.map((column, index) => (
                  <TableCell key={index} {...column.getHeaderProps([{ className: column.className }])}>
                    <HeaderSort column={column} sort />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Typography>Loading...</Typography>
                </TableCell>
              </TableRow>
            ) : (
              page.map((row, i) => {
                prepareRow(row);
                return (
                  <Fragment key={i}>
                    <TableRow
                      {...row.getRowProps()}
                      onClick={() => row.toggleRowExpanded()}
                      sx={{
                        cursor: 'pointer',
                        bgcolor: row.isExpanded ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit'
                      }}
                    >
                      {row.cells.map((cell, index) => (
                        <TableCell key={index} {...cell.getCellProps([{ className: cell.column.className }])}>
                          {cell.render('Cell')}
                        </TableCell>
                      ))}
                    </TableRow>
                    {row.isExpanded && renderRowSubComponent({ row })}
                  </Fragment>
                );
              })
            )}
          </TableBody>
        </Table>
        <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageSize={pageSize} pageIndex={pageIndex} />
      </Stack>
    </>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  renderRowSubComponent: PropTypes.any,
  loading: PropTypes.bool
};

const StatusCell = ({ value }) => (
  <Chip
    color={STATUS_COLORS[value] || 'default'}
    label={value ? value.charAt(0).toUpperCase() + value.slice(1) : '—'}
    size="small"
    variant="light"
  />
);

StatusCell.propTypes = { value: PropTypes.string };

const ActionCell = (row, theme, onApprove, onReject) => {
  const collapseIcon = row.isExpanded ? (
    <CloseCircleOutlined style={{ color: theme.palette.error.main }} />
  ) : (
    <EyeTwoTone twoToneColor={theme.palette.secondary.main} />
  );

  return (
    <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
      <Tooltip title={row.isExpanded ? 'Close details' : 'View details'}>
        <IconButton
          color="secondary"
          onClick={(e) => {
            e.stopPropagation();
            row.toggleRowExpanded();
          }}
        >
          {collapseIcon}
        </IconButton>
      </Tooltip>
      {row.values.status === 'pending' && (
        <>
          <Tooltip title="Approve">
            <IconButton
              color="success"
              onClick={(e) => {
                e.stopPropagation();
                onApprove(row.values.id);
              }}
            >
              <CheckCircleOutlined />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reject">
            <IconButton
              color="error"
              onClick={(e) => {
                e.stopPropagation();
                onReject({ id: row.values.id, name: row.values.name });
              }}
            >
              <CloseCircleOutlined />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Stack>
  );
};

ActionCell.propTypes = {
  row: PropTypes.object,
  theme: PropTypes.object,
  onApprove: PropTypes.func,
  onReject: PropTypes.func
};

const PlaceDetailView = ({ data }) => {
  if (!data) return null;

  const locationParts = [data.address, data.city?.name, data.country?.name].filter(Boolean);
  const locationStr = locationParts.length ? locationParts.join(', ') : '—';

  return (
    <TableRow sx={{ '&:hover': { bgcolor: 'transparent !important' } }}>
      <TableCell colSpan={7} sx={{ p: 2.5 }}>
        <Grid container spacing={2.5} sx={{ pl: { xs: 0, sm: 5, md: 6 } }}>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography color="textSecondary" variant="subtitle2">
                Description
              </Typography>
              <Typography variant="body2" sx={{ maxHeight: 80, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {data.description || '—'}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography color="textSecondary" variant="subtitle2">
                Location
              </Typography>
              <Typography variant="body2">{locationStr}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={0.5}>
              <Typography color="textSecondary" variant="subtitle2">
                Category
              </Typography>
              <Typography variant="body2">{data.category?.name || '—'}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={0.5}>
              <Typography color="textSecondary" variant="subtitle2">
                Rating
              </Typography>
              <Typography variant="body2">
                {data.averageRating ?? 0}/5 ({data.reviewCount ?? 0} reviews)
              </Typography>
            </Stack>
          </Grid>
          {data.rejectionReason && (
            <Grid item xs={12}>
              <Typography color="error" variant="caption">
                Rejection reason: {data.rejectionReason}
              </Typography>
            </Grid>
          )}
        </Grid>
      </TableCell>
    </TableRow>
  );
};

PlaceDetailView.propTypes = { data: PropTypes.object };

const Places = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { places, loading, error, errorMessage, success, successMessage } = useSelector((state) => state.places);

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [rejectModal, setRejectModal] = useState({ open: false, placeId: null, placeName: '', reason: '' });
  const [filters, setFilters] = useState({
    status: '',
    search: '',
    page: 0,
    limit: 10
  });

  useEffect(() => {
    dispatch(getPlacesRequest({ filters: { page: 0, limit: 10 } }));
  }, [dispatch]);

  useEffect(() => {
    if (error && errorMessage) {
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
      dispatch(clearPlaceErrors());
    }
  }, [error, errorMessage, dispatch]);

  useEffect(() => {
    if (success && successMessage) {
      setSnackbar({ open: true, message: successMessage, severity: 'success' });
      dispatch(clearPlaceMessages());
    }
  }, [success, successMessage, dispatch]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleApprove = (id) => {
    dispatch(approvePlaceRequest({ id }));
  };

  const handleReject = useCallback((place) => {
    setRejectModal({ open: true, placeId: place.id, placeName: place.name || 'this place', reason: '' });
  }, []);

  const handleRejectModalClose = useCallback(() => {
    setRejectModal({ open: false, placeId: null, placeName: '', reason: '' });
  }, []);

  const handleRejectConfirm = useCallback(() => {
    if (rejectModal.placeId == null) return;
    dispatch(rejectPlaceRequest({ id: rejectModal.placeId, reason: rejectModal.reason || undefined }));
    handleRejectModalClose();
  }, [dispatch, rejectModal.placeId, rejectModal.reason, handleRejectModalClose]);

  const handleStatusFilterChange = (e) => {
    const status = e.target.value || '';
    setFilters((prev) => ({ ...prev, status, page: 0 }));
    dispatch(
      getPlacesRequest({
        filters: { status: status || undefined, page: 0, limit: 10 }
      })
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: '#',
        accessor: 'id',
        className: 'cell-center'
      },
      {
        Header: 'Name',
        accessor: 'name',
        Cell: ({ row }) => (
          <Typography variant="subtitle1" fontWeight={600}>
            {row.values.name}
          </Typography>
        )
      },
      {
        Header: 'Category',
        accessor: 'category',
        Cell: ({ value }) => (value?.name ? value.name : '—')
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: StatusCell
      },
      {
        Header: 'Location',
        accessor: 'city',
        Cell: ({ row }) => {
          const city = row.original?.city?.name;
          const country = row.original?.country?.name;
          return (
            <Typography variant="body2" color="textSecondary">
              {[city, country].filter(Boolean).join(', ') || '—'}
            </Typography>
          );
        }
      },
      {
        Header: 'Actions',
        className: 'cell-center',
        disableSortBy: true,
        Cell: ({ row }) => ActionCell(row, theme, handleApprove, handleReject)
      }
    ],
    [theme, handleApprove, handleReject]
  );

  const renderRowSubComponent = useCallback(({ row }) => <PlaceDetailView data={places.find((p) => p.id === row.values.id)} />, [places]);

  return (
    <>
      <MainCard sx={{ mb: 2 }}>
        <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select value={filters.status} onChange={handleStatusFilterChange} label="Status">
                <MenuItem value="">All</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </MainCard>

      <MainCard content={false}>
        <ScrollX>
          <ReactTable columns={columns} data={places} renderRowSubComponent={renderRowSubComponent} loading={loading} />
        </ScrollX>
      </MainCard>

      <Dialog open={rejectModal.open} onClose={handleRejectModalClose} maxWidth="sm" fullWidth>
        <DialogTitle>Reject place</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Reject &quot;{rejectModal.placeName}&quot;. Optionally add a message for the submitter.
          </Typography>
          <TextField
            autoFocus
            fullWidth
            multiline
            minRows={3}
            maxRows={6}
            placeholder="Rejection reason (optional)"
            value={rejectModal.reason}
            onChange={(e) => setRejectModal((prev) => ({ ...prev, reason: e.target.value }))}
            inputProps={{ maxLength: 1000 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRejectModalClose}>Cancel</Button>
          <Button onClick={handleRejectConfirm} color="error" variant="contained">
            Reject
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar((s) => ({ ...s, open: false }))}>
        <Alert onClose={() => setSnackbar((s) => ({ ...s, open: false }))} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Places;
