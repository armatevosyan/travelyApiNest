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
import AlertCustomerDelete from 'sections/apps/customer/AlertCustomerDelete';

import { GlobalFilter } from 'utils/react-table';

// assets
import { DeleteTwoTone, LoginOutlined } from '@ant-design/icons';
import { dispatch } from '@/redux/store';
import { findAllRequest } from '@/redux/users/actions';
import { useSelector } from 'react-redux';
import { enterAccountRequest } from '@/redux/auth/actions';
import { roles } from '@/utils/constants';

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
  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Avatar alt="Avatar 1" size="sm" src={avatarImage(`./avatar-${!values.avatar ? 1 : values.avatar}.png`)} />
      <Stack spacing={0}>
        <Typography variant="subtitle1">{values.name}</Typography>
        <Typography variant="caption" color="textSecondary">
          {values.email}
        </Typography>
      </Stack>
    </Stack>
  );
};

const NumberFormatCell = ({ value }) => <NumberFormat displayType="text" format="+1 (###) ###-####" mask="_" defaultValue={value} />;

const StatusCell = (deactivatedAt, verifiedAt) => {
  if (deactivatedAt) {
    return <Chip color="error" label="Deactivated" size="small" variant="light" />;
  } else if (!verifiedAt) {
    return <Chip color="info" label="Not verifed" size="small" variant="light" />;
  } else {
    return <Chip color="success" label="Verified" size="small" variant="light" />;
  }
};

const ActionCell = (row, setCustomerDeleteId, handleClose, theme, role) => {
  const onLogin = (e) => {
    e.stopPropagation();
    dispatch(enterAccountRequest(row.values?.id));
  };

  return (
    <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
      {role !== roles.MODERATOR && (
        <Tooltip title="Login">
          <IconButton color="primary" onClick={onLogin}>
            <LoginOutlined />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title="Delete">
        <IconButton
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
            setCustomerDeleteId(row.values.name);
          }}
        >
          <DeleteTwoTone twoToneColor={theme.palette.error.main} />
        </IconButton>
      </Tooltip>
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
  const theme = useTheme();

  const { usersList, usersCount } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [customerDeleteId, setCustomerDeleteId] = useState();
  const [params, setParams] = useState(defaultParams);

  useEffect(() => {
    dispatch(findAllRequest(params));
  }, [params]);

  const handleClose = () => {
    setOpen(!open);
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
        Cell: ({ row }) => StatusCell(row?.original?.deactivatedAt, row?.original?.verifiedAt)
      },
      {
        Header: 'Actions',
        className: 'cell-center',
        disableSortBy: true,
        Cell: ({ row }) => ActionCell(row, setCustomerDeleteId, handleClose, theme, user.role)
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );

  const renderRowSubComponent = useCallback(({ row }) => <CustomerView data={data[row.id]} />, []);

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
      <AlertCustomerDelete title={customerDeleteId} open={open} handleClose={handleClose} />
    </MainCard>
  );
};

export default UsersPage;
