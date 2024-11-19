import { useState, MouseEvent } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Badge,
    Avatar,
    Typography,
    Menu,
    MenuItem,
    MenuList,
    ListItemIcon,
    ListItemText,
    Divider,
    Box,
    Paper,
} from '@mui/material';
import {
    Notifications as NotificationsIcon,
    LightMode as LightModeIcon,
    Language as LanguageIcon,
    AccountBox as AccountBoxIcon,
    FilterFrames as FilterFramesIcon,
    Logout as LogoutIcon,
    PanoramaFishEye as PanoramaFishEyeIcon,
    RadioButtonChecked as RadioButtonCheckedIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/redux/slices/authSlice';
import { useSidebar } from '@/context';

const Header = () => {
    const { isSidebarOpen, toggleSidebar } = useSidebar();
    const user = useSelector((state: any) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        dispatch(logout());
        navigate('/login');
    };

    const getInitials = (fullName: string | undefined) => {
        if (!fullName) return '';
        const names = fullName.split(' ');
        const initials = names.map(name => name[0]).join('').toUpperCase();
        return initials;
    };

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            sx={{
                mt: '10px',
                '& .MuiPaper-root': {
                    minWidth: '200px',
                },
            }}
        >
            <Paper>
                <MenuList>
                    <MenuItem onClick={() => handleMenuClose()}>
                        <ListItemIcon>
                            <AccountBoxIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Profile</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                        <ListItemIcon>
                            <FilterFramesIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Branch</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </MenuItem>
                </MenuList>
            </Paper>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                sx={{ backgroundColor: '#fff', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '5rem' }}>
                        <img
                            src="/vercel.svg"
                            alt="Project Estimate Logo"
                            style={{ width: '120px', height: '60px' }}
                        />
                        <Box
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                alignItems: 'center',
                            }}
                        >
                            <IconButton
                                onClick={toggleSidebar}
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{ borderRadius: '50%' }}
                            >
                                {isSidebarOpen ? (
                                    <PanoramaFishEyeIcon sx={{ color: '#000' }} />
                                ) : (
                                    <RadioButtonCheckedIcon sx={{ color: '#000' }} />
                                )}
                            </IconButton>
                            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                        </Box>
                    </Box>

                    {/* Notifications, Theme, Language */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Box
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                alignItems: 'center',
                                gap: '16px',
                            }}
                        >
                            <IconButton color="inherit" sx={{ backgroundColor: '#ffebee', borderRadius: '50%' }}>
                                <Badge color="secondary">
                                    <NotificationsIcon sx={{ color: '#f44336' }} />
                                </Badge>
                            </IconButton>
                            <IconButton color="inherit" sx={{ backgroundColor: '#f3e5f5', borderRadius: '50%' }}>
                                <LightModeIcon sx={{ color: '#9c27b0' }} />
                            </IconButton>
                            <IconButton color="inherit" sx={{ backgroundColor: '#f3e5f5', borderRadius: '50%' }}>
                                <LanguageIcon sx={{ color: '#9c27b0' }} />
                            </IconButton>
                        </Box>
                        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
                        {/* Avatar và Menu */}
                        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleProfileMenuOpen}>
                            <Avatar
                                alt={user?.username}
                                src={user?.profile?.avatar || undefined}
                            >
                                {!user?.profile?.avatar && getInitials(user?.username)}
                            </Avatar>
                            <Box sx={{ textAlign: 'left', ml: 1 }}>
                                <Typography
                                    variant="body1"
                                    sx={{ color: '#000', fontWeight: 'bold', transition: 'color 0.3s ease' }}
                                >
                                    {user?.username}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#6E6B7B', transition: 'color 0.3s ease' }}>
                                    {user?.role?.roleName}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </Box>
    );
};

export default Header;
