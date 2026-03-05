import PropTypes from 'prop-types';
import { useCallback, useMemo, useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import {
  capitalize,
  Button,
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  Box
} from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';
import { useFilters, useExpanded, useGlobalFilter, useRowSelect, useSortBy, useTable, usePagination } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import Avatar from 'components/@extended/Avatar';
import { HeaderSort, IndeterminateCheckbox, SortingSelect, TablePagination, TableRowSelection } from 'components/third-party/ReactTable';

import { renderFilterTypes, GlobalFilter } from 'utils/react-table';

// Redux imports
import {
  getProductsRequest,
  approveProductRequest,
  rejectProductRequest,
  deleteProductRequest,
  bulkUpdateStatusRequest,
  bulkDeleteProductsRequest,
  clearSelectedProducts,
  clearProductErrors
} from '@/redux/products/actions';

// assets
import { CloseOutlined, PlusOutlined, EyeTwoTone, EditTwoTone, DeleteTwoTone, CheckCircleOutlined } from '@ant-design/icons';
import { roles } from '@/utils/constants';

const productImage = require.context('assets/images/e-commerce', true);

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, renderRowSubComponent, loading }) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const filterTypes = useMemo(() => renderFilterTypes, []);
  const sortBy = { id: 'name', desc: false };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setHiddenColumns,
    allColumns,
    rows,
    page,
    gotoPage,
    setPageSize,
    state: { globalFilter, selectedRowIds, pageIndex, pageSize },
    preGlobalFilteredRows,
    setGlobalFilter,
    setSortBy
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      initialState: { pageIndex: 0, pageSize: 10, hiddenColumns: ['image', 'description'], sortBy: [sortBy] }
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  useMemo(() => {
    if (matchDownSM) {
      setHiddenColumns(['id', 'image', 'description', 'categories', 'offerPrice', 'quantity', 'status']);
    } else {
      setHiddenColumns(['image', 'description']);
    }
  }, [matchDownSM]);

  const history = useNavigate();

  const handleAddProduct = () => {
    history(`/apps/e-commerce/add-new-product`);
  };

  return (
    <>
      <TableRowSelection selected={Object.keys(selectedRowIds).length} />
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 3, pb: 0 }}>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            size="small"
          />
          <Stack direction="row" alignItems="center" spacing={1}>
            <SortingSelect sortBy={sortBy.id} setSortBy={setSortBy} allColumns={allColumns} />
            <Button disabled={true} variant="contained" startIcon={<PlusOutlined />} onClick={handleAddProduct}>
              Add Product
            </Button>
          </Stack>
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
                      onClick={() => {
                        row.toggleRowExpanded();
                      }}
                      sx={{ cursor: 'pointer', bgcolor: row.isExpanded ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
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

// ==============================|| PRODUCT LIST - MAIN ||============================== //

const SelectionCell = ({ row }) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />;
const SelectionHeader = ({ getToggleAllPageRowsSelectedProps }) => (
  <IndeterminateCheckbox indeterminate {...getToggleAllPageRowsSelectedProps()} />
);

SelectionCell.propTypes = {
  row: PropTypes.object
};

SelectionHeader.propTypes = {
  getToggleAllPageRowsSelectedProps: PropTypes.func
};

const ProductCell = ({ row }) => {
  const { values } = row;
  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Avatar
        variant="rounded"
        alt={values.name}
        color="secondary"
        size="sm"
        src={values.image?.thumb?.url || values.image?.full?.url || productImage(`./thumbs/prod-11.png`)}
      />
      <Stack spacing={0} sx={{ minWidth: 0, flex: 1 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {values.name}
        </Typography>
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '200px',
            lineHeight: 1.2
          }}
        >
          {values.description}
        </Typography>
      </Stack>
    </Stack>
  );
};

ProductCell.propTypes = {
  row: PropTypes.object
};

const CategoriesCell = ({ value }) => (
  <Stack direction="row" spacing={0.25}>
    {value?.name && <Typography variant="h6">{capitalize(value.name)}</Typography>}
  </Stack>
);

CategoriesCell.propTypes = {
  value: PropTypes.object
};

const NumberFormatCell = ({ value }) => <NumberFormat value={value} displayType="text" thousandSeparator prefix="$" />;

NumberFormatCell.propTypes = {
  value: PropTypes.number
};

const StatusCell = ({ value }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'publish':
        return 'success';
      case 'pending':
        return 'warning';
      case 'draft':
        return 'error';
      default:
        return 'default';
    }
  };

  return <Chip color={getStatusColor(value)} label={value || 'Unknown'} size="small" variant="light" />;
};

StatusCell.propTypes = {
  value: PropTypes.string
};

const ActionCell = (row, theme, onApprove, onReject, onEdit, onDelete, userRole) => {
  const collapseIcon = row.isExpanded ? (
    <CloseOutlined style={{ color: theme.palette.error.main }} />
  ) : (
    <EyeTwoTone twoToneColor={theme.palette.secondary.main} />
  );

  return (
    <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
      <Tooltip title={row.isExpanded ? 'Close Details' : 'View Details'}>
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
                onReject(row.values.id);
              }}
            >
              cancel
            </IconButton>
          </Tooltip>
        </>
      )}

      {userRole === roles.SUPER_ADMIN && (
        <>
          <Tooltip title="Coming soon">
            <IconButton
              color="default"
              // onClick={(e) => {
              //   e.stopPropagation();
              //   onEdit(row.values.id);
              // }}
            >
              <EditTwoTone twoToneColor={theme.palette.primary.main} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Coming soon">
            <IconButton
              color="error"
              // onClick={(e) => {
              //   e.stopPropagation();
              //   onDelete(row.values.id);
              // }}
            >
              <DeleteTwoTone twoToneColor={theme.palette.error.main} />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Stack>
  );
};

ActionCell.propTypes = {
  row: PropTypes.object
};

// Enhanced ProductView component for products
const AdminProductView = ({ data }) => {
  const theme = useTheme();

  if (!data) return null;

  return (
    <TableRow sx={{ '&:hover': { bgcolor: `transparent !important` } }}>
      <TableCell colSpan={10} sx={{ p: 2.5 }}>
        <Grid container spacing={2.5} sx={{ pl: { xs: 0, sm: 5, md: 6, lg: 10, xl: 12 } }}>
          <Grid item xs={6} sm={5} md={4} lg={3}>
            <Box sx={{ position: 'relative' }}>
              <img
                src={data.image?.full?.url || data.image?.thumb?.url}
                alt="product"
                style={{
                  background: theme.palette.grey[200],
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
              <Chip
                label={data.status === 'publish' ? 'Published' : data.status === 'pending' ? 'Pending' : 'Draft'}
                color={data.status === 'publish' ? 'success' : data.status === 'pending' ? 'warning' : 'error'}
                variant="light"
                sx={{
                  position: 'absolute',
                  right: 15,
                  top: 15
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={7} md={8} lg={9}>
            <Stack spacing={2} sx={{ px: 2 }}>
              <Typography variant="h5">{data?.name}</Typography>
              <Typography
                color="textSecondary"
                sx={{
                  lineHeight: 1.6,
                  maxHeight: '80px',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  textOverflow: 'ellipsis'
                }}
              >
                {data?.description}
              </Typography>

              {/* Rating */}
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="h6" color="primary">
                  {data.rating || 0}/5
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ({data.ratingCount || 0} reviews)
                </Typography>
              </Stack>

              <Box sx={{ width: '100%', pt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                      <Typography color="textSecondary" variant="subtitle2">
                        Category
                      </Typography>
                      <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
                        {data.category?.name || 'N/A'}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                      <Typography color="textSecondary" variant="subtitle2">
                        Price Range
                      </Typography>
                      <Typography variant="h6">
                        ${data.priceMin || 0} - ${data.priceMax || 0}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                      <Typography color="textSecondary" variant="subtitle2">
                        Contact
                      </Typography>
                      <Typography variant="body2">{data.phone || 'N/A'}</Typography>
                      <Typography variant="body2">{data.email || 'N/A'}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                      <Typography color="textSecondary" variant="subtitle2">
                        Location
                      </Typography>
                      <Typography variant="body2">{data.address || 'N/A'}</Typography>
                      <Typography variant="body2">{data.zipCode || 'N/A'}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                      <Typography color="textSecondary" variant="subtitle2">
                        Author
                      </Typography>
                      <Typography variant="body2">{data.author?.name || 'N/A'}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {data.author?.description || 'N/A'}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                      <Typography color="textSecondary" variant="subtitle2">
                        Details
                      </Typography>
                      <Typography variant="body2">Website: {data.website || 'N/A'}</Typography>
                      <Typography variant="body2">Booking Style: {data.bookingStyle || 'N/A'}</Typography>
                      <Typography variant="body2">Booking Price: {data.bookingPriceDisplay || 'N/A'}</Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  );
};

AdminProductView.propTypes = {
  data: PropTypes.object
};

const Products = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const { products, loading, error, errorMessage, selectedProducts } = useSelector((state) => state.products);

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [bulkActionDialog, setBulkActionDialog] = useState({ open: false, action: '', status: '' });
  const { user } = useSelector((state) => state.auth);

  // Load data on component mount
  useEffect(() => {
    dispatch(getProductsRequest({ userRole: user.role }));
  }, []);

  useEffect(() => {
    if (error && errorMessage) {
      setSnackbar({ open: true, message: errorMessage, severity: 'error' });
      dispatch(clearProductErrors());
    }
  }, [error, errorMessage, dispatch]);

  // Handle product approval
  const handleApprove = (productId) => {
    dispatch(approveProductRequest({ id: productId, userRole: user.role }));
  };

  // Handle product rejection
  const handleReject = (productId) => {
    dispatch(rejectProductRequest({ id: productId, userRole: user.role }));
  };

  // Handle product edit
  const handleEdit = (productId) => {
    navigate(`/apps/e-commerce/edit-product/${productId}`);
  };

  // Handle product deletion
  const handleDelete = (productId) => {
    if (user.role !== roles.SUPER_ADMIN) return;
    dispatch(deleteProductRequest({ id: productId }));
  };

  // Handle bulk actions
  const handleBulkAction = () => {
    if (selectedProducts.length === 0) return;

    if (bulkActionDialog.action === 'status') {
      dispatch(
        bulkUpdateStatusRequest({
          productIds: selectedProducts,
          statusData: { status: bulkActionDialog.status }
        })
      );
    } else if (bulkActionDialog.action === 'delete') {
      dispatch(bulkDeleteProductsRequest({ productIds: selectedProducts }));
    }

    setBulkActionDialog({ open: false, action: '', status: '' });
    dispatch(clearSelectedProducts());
  };

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
        className: 'cell-center'
      },
      {
        Header: 'Product Detail',
        accessor: 'name',
        Cell: ProductCell
      },
      {
        Header: 'Image',
        accessor: 'image',
        disableSortBy: true
      },
      {
        Header: 'Description',
        accessor: 'description'
      },
      {
        Header: 'Category',
        accessor: 'category',
        Cell: CategoriesCell
      },
      {
        Header: 'Price Range',
        accessor: 'priceMin',
        className: 'cell-right',
        Cell: ({ row }) => (
          <Stack direction="row" spacing={1}>
            <NumberFormat value={row?.values?.priceMin} displayType="text" thousandSeparator prefix="$" />
            <Typography>-</Typography>
            <NumberFormat value={row?.values?.priceMax} displayType="text" thousandSeparator prefix="$" />
          </Stack>
        )
      },
      {
        Header: 'Rating',
        accessor: 'rating',
        className: 'cell-center',
        Cell: ({ values }) => values?.rating
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: StatusCell
      },
      {
        Header: 'Actions',
        className: 'cell-center',
        disableSortBy: true,
        Cell: ({ row }) => ActionCell(row, theme, handleApprove, handleReject, handleEdit, handleDelete, user.role)
      }
    ],
    [theme, handleApprove, handleReject, handleEdit, handleDelete, user.role]
  );

  const renderRowSubComponent = useCallback(
    ({ row }) => <AdminProductView data={products.find((p) => p.id === row.values.id)} />,
    [products]
  );

  return (
    <>
      {/* Stats Cards */}
      {/*<Grid container spacing={3} sx={{ mb: 3 }}>*/}
      {/*  <Grid item xs={12} sm={6} md={3}>*/}
      {/*    <MainCard>*/}
      {/*      <Stack direction="row" alignItems="center" justifyContent="space-between">*/}
      {/*        <Stack spacing={0.5}>*/}
      {/*          <Typography variant="h6">Total Products</Typography>*/}
      {/*          <Typography variant="h4">{stats.totalProducts || 0}</Typography>*/}
      {/*        </Stack>*/}
      {/*      </Stack>*/}
      {/*    </MainCard>*/}
      {/*  </Grid>*/}
      {/*  <Grid item xs={12} sm={6} md={3}>*/}
      {/*    <MainCard>*/}
      {/*      <Stack direction="row" alignItems="center" justifyContent="space-between">*/}
      {/*        <Stack spacing={0.5}>*/}
      {/*          <Typography variant="h6">Pending</Typography>*/}
      {/*          <Typography variant="h4" color="warning.main">*/}
      {/*            {stats.pendingProducts || 0}*/}
      {/*          </Typography>*/}
      {/*        </Stack>*/}
      {/*      </Stack>*/}
      {/*    </MainCard>*/}
      {/*  </Grid>*/}
      {/*  <Grid item xs={12} sm={6} md={3}>*/}
      {/*    <MainCard>*/}
      {/*      <Stack direction="row" alignItems="center" justifyContent="space-between">*/}
      {/*        <Stack spacing={0.5}>*/}
      {/*          <Typography variant="h6">Approved</Typography>*/}
      {/*          <Typography variant="h4" color="success.main">*/}
      {/*            {stats.approvedProducts || 0}*/}
      {/*          </Typography>*/}
      {/*        </Stack>*/}
      {/*      </Stack>*/}
      {/*    </MainCard>*/}
      {/*  </Grid>*/}
      {/*  <Grid item xs={12} sm={6} md={3}>*/}
      {/*    <MainCard>*/}
      {/*      <Stack direction="row" alignItems="center" justifyContent="space-between">*/}
      {/*        <Stack spacing={0.5}>*/}
      {/*          <Typography variant="h6">Rejected</Typography>*/}
      {/*          <Typography variant="h4" color="error.main">*/}
      {/*            {stats.rejectedProducts || 0}*/}
      {/*          </Typography>*/}
      {/*        </Stack>*/}
      {/*      </Stack>*/}
      {/*    </MainCard>*/}
      {/*  </Grid>*/}
      {/*</Grid>*/}

      {/* Filters */}
      {/*<MainCard sx={{ mb: 3 }}>*/}
      {/*  <Grid container spacing={2} alignItems="center">*/}
      {/*    <Grid item xs={12} sm={6} md={3}>*/}
      {/*      <FormControl fullWidth size="small">*/}
      {/*        <InputLabel>Status</InputLabel>*/}
      {/*        <Select value={filters.status} onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))} label="Status">*/}
      {/*          <MenuItem value="all">All Status</MenuItem>*/}
      {/*          <MenuItem value="pending">Pending</MenuItem>*/}
      {/*          <MenuItem value="publish">Published</MenuItem>*/}
      {/*          <MenuItem value="draft">Draft</MenuItem>*/}
      {/*        </Select>*/}
      {/*      </FormControl>*/}
      {/*    </Grid>*/}
      {/*    <Grid item xs={12} sm={6} md={3}>*/}
      {/*      <TextField*/}
      {/*        fullWidth*/}
      {/*        size="small"*/}
      {/*        placeholder="Search products..."*/}
      {/*        value={filters.search}*/}
      {/*        onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}*/}
      {/*      />*/}
      {/*    </Grid>*/}
      {/*    <Grid item xs={12} sm={6} md={3}>*/}
      {/*      <Button*/}
      {/*        variant="outlined"*/}
      {/*        startIcon={<FilterOutlined />}*/}
      {/*        onClick={() => setFilters({ status: 'all', search: '', category: 'all' })}*/}
      {/*      >*/}
      {/*        Clear Filters*/}
      {/*      </Button>*/}
      {/*    </Grid>*/}
      {/*    {userRole === 'admin' && selectedProducts.length > 0 && (*/}
      {/*      <Grid item xs={12} sm={6} md={3}>*/}
      {/*        <Stack direction="row" spacing={1}>*/}
      {/*          <Button variant="outlined" onClick={() => setBulkActionDialog({ open: true, action: 'status', status: '' })}>*/}
      {/*            Bulk Status*/}
      {/*          </Button>*/}
      {/*          <Button variant="outlined" color="error" onClick={() => setBulkActionDialog({ open: true, action: 'delete', status: '' })}>*/}
      {/*            Bulk Delete*/}
      {/*          </Button>*/}
      {/*        </Stack>*/}
      {/*      </Grid>*/}
      {/*    )}*/}
      {/*  </Grid>*/}
      {/*</MainCard>*/}

      {/* Products Table */}
      <MainCard content={false}>
        <ScrollX>
          <ReactTable columns={columns} data={products} renderRowSubComponent={renderRowSubComponent} loading={loading} />
        </ScrollX>
      </MainCard>

      {/* Bulk Action Dialog */}
      <Dialog open={bulkActionDialog.open} onClose={() => setBulkActionDialog({ open: false, action: '', status: '' })}>
        <DialogTitle>{bulkActionDialog.action === 'status' ? 'Update Status' : 'Delete Products'}</DialogTitle>
        <DialogContent>
          {bulkActionDialog.action === 'status' ? (
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>New Status</InputLabel>
              <Select
                value={bulkActionDialog.status}
                onChange={(e) => setBulkActionDialog((prev) => ({ ...prev, status: e.target.value }))}
                label="New Status"
              >
                <MenuItem value="publish">Published</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
              </Select>
            </FormControl>
          ) : (
            <Typography>
              Are you sure you want to delete {selectedProducts.length} selected products? This action cannot be undone.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBulkActionDialog({ open: false, action: '', status: '' })}>Cancel</Button>
          <Button onClick={handleBulkAction} variant="contained" color={bulkActionDialog.action === 'delete' ? 'error' : 'primary'}>
            {bulkActionDialog.action === 'status' ? 'Update' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Products;
