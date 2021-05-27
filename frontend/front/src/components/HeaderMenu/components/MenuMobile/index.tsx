import React from 'react'

export default function index() {
    return (
        <div>
            123
        </div>
    )
}

// import React, { FunctionComponent } from 'react';
// import { Menu, MenuItem, IconButton, Badge } from '@material-ui/core';
// import MailIcon from '@material-ui/icons/Mail';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import AccountCircle from '@material-ui/icons/AccountCircle';

// type MenuProps = {
//   mobileMenuId: string;
//   mobileMoreAnchorEl: any;
//   handleMobileMenuClose: any;
//   handleProfileMenuOpen: any;
// };

// const MenuMobile: FunctionComponent<MenuProps> = ({
//   mobileMenuId,
//   mobileMoreAnchorEl,
//   handleMobileMenuClose,
//   handleProfileMenuOpen,
// }) => {
//   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
//   return (
//     <Menu
//       anchorEl={mobileMoreAnchorEl}
//       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       id={mobileMenuId}
//       keepMounted
//       transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//       open={isMobileMenuOpen}
//       onClose={handleMobileMenuClose}
//     >
//       <MenuItem>
//         <IconButton aria-label='show 4 new mails' color='inherit'>
//           <Badge badgeContent={4} color='secondary'>
//             <MailIcon />
//           </Badge>
//         </IconButton>
//         <p>Messages</p>
//       </MenuItem>
//       <MenuItem>
//         <IconButton aria-label='show 11 new notifications' color='inherit'>
//           <Badge badgeContent={11} color='secondary'>
//             <NotificationsIcon />
//           </Badge>
//         </IconButton>
//         <p>Notifications</p>
//       </MenuItem>
//       <MenuItem onClick={handleProfileMenuOpen}>
//         <IconButton
//           aria-label='account of current user'
//           aria-controls='primary-search-account-menu'
//           aria-haspopup='true'
//           color='inherit'
//         >
//           <AccountCircle />
//         </IconButton>
//         <p>User</p>
//       </MenuItem>
//     </Menu>
//   );
// };

// export default MenuMobile;
