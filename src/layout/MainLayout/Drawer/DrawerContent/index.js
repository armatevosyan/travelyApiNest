// import { useSelector } from 'react-redux';

// material-ui
// import { useMediaQuery, useTheme } from '@mui/material';

// project import
// import NavCard from './NavCard';
import Navigation from './Navigation';
import SimpleBar from 'components/third-party/SimpleBar';
import { Tooltip } from '@mui/material';
import IconButton from '@/components/@extended/IconButton';
import { LogoutOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { adminRoles, roles } from '@/utils/constants';

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => {
  const [accounts, setAccounts] = useState([]);
  // const theme = useTheme();
  // const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  // const menu = useSelector((state) => state.menu);
  // const { drawerOpen } = menu;

  useEffect(() => {
    if (!accounts.length) {
      for (let role of adminRoles) {
        const token = localStorage.getItem(`${role}-token`);
        const userData = localStorage.getItem(`${role}-user-data`);
        if (token) {
          setAccounts((prev) => [
            ...prev,
            {
              title: role[0].toUpperCase() + role.replace('-', ' ').slice(1),
              role,
              userData,
              token
            }
          ]);
        }
      }
    }
  }, [accounts.length]);

  const onLogout = (account) => {
    localStorage.setItem('accessToken', account.token);
    localStorage.setItem('userData', account.userData);
    switch (account.role) {
      case roles.SUPER_ADMIN:
        localStorage.removeItem(`${roles.SUPER_ADMIN}-token`);
        localStorage.removeItem(`${roles.SUPER_ADMIN}-user-data`);
        localStorage.removeItem(`${roles.ADMIN}-token`);
        localStorage.removeItem(`${roles.ADMIN}-user-data`);
        window.location.reload();
        return;
      case roles.ADMIN:
        localStorage.removeItem(`${roles.ADMIN}-token`);
        localStorage.removeItem(`${roles.ADMIN}-user-data`);
        window.location.reload();
    }
  };

  return (
    <SimpleBar
      sx={{
        '& .simplebar-content': {
          display: 'flex',
          flexDirection: 'column'
        }
      }}
    >
      <Navigation />

      {accounts.length ? (
        <div style={{ marginBottom: 28 }}>
          {accounts.map((i, index) => (
            <div key={index} style={{ marginLeft: 28 }}>
              {i?.title}
              <Tooltip title="Go to">
                <IconButton color="primary" onClick={() => onLogout(i)}>
                  <LogoutOutlined />
                </IconButton>
              </Tooltip>
            </div>
          ))}
        </div>
      ) : null}
      {/*{drawerOpen && !matchDownMD && <NavCard />}*/}
    </SimpleBar>
  );
};

export default DrawerContent;
