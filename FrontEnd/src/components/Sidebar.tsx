import React, { useState, MouseEvent } from 'react';
import {
    Drawer,
    List,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
    ListItemButton,
    Box,
    IconButton,
    Avatar,
} from '@mui/material';
import {
    PanoramaFishEye as PanoramaFishEyeIcon,
    RadioButtonChecked as RadioButtonCheckedIcon,
    Dashboard as DashboardIcon,
    Business as BusinessIcon,
    People as PeopleIcon,
    Assignment as AssignmentIcon,
    FilterFrames as FilterFramesIcon,
} from '@mui/icons-material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { profileMenuStyle } from '@/styles';

const drawerWidth = 260;
const miniDrawerWidth = 70;

const menuItems = [
    {
        section: 'Dashboard',
        items: [
            {
                name: 'Dashboard',
                icon: <DashboardIcon />,
                path: '/dashboard',
                tag: ['view_dashboard', 'view_bubble_dashboard'],
                description: 'Accessible by Admin, Manager, and Reviewer.',
            },
        ],
    },
    {
        section: 'Management',
        items: [
            {
                name: 'Tasks',
                icon: <AssignmentIcon />,
                path: '/tasks',
                tag: ['view_assigned_tasks', 'view_tasks', 'manage_tasks', 'edit_task', 'delete_task'],
                description: 'Manage tasks or view tasks assigned to you.',
            },
            {
                name: 'Bubbles',
                icon: <BusinessIcon />,
                path: '/bubbles',
                tag: ['view_bubble_data', 'create_bubble', 'manage_bubble'],
                description: 'Manage or view your Bubbles.',
            },
            {
                name: 'Users',
                icon: <PeopleIcon />,
                path: '/users',
                tag: ['view_users', 'manage_users'],
                description: 'Accessible by Admin to manage users.',
            },
        ],
    },
    {
        section: 'Component',
        items: [
            {
                name: 'System Settings',
                icon: <FilterFramesIcon />,
                path: '/settings',
                tag: ['manage_settings'],
                description: 'Only Admins can manage system settings.',
            },
        ],
    },
];

const Sidebar = () => {
    const location = useLocation();
    const [isPinned, setIsPinned] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        if (!isPinned) {
            setIsHovered(true);
        }
    };

    const handleMouseLeave = () => {
        if (!isPinned) {
            setIsHovered(false);
        }
    };

    const handleTogglePin = () => {
        setIsPinned(prev => !prev);
    };

    const userPermissions = useAppSelector((state) => state.auth?.user?.role?.permissions || []);

    const hasPermission = (tags: string[]) => {
        return tags.some((tag) => userPermissions.includes(tag));
    };

    const getInitials = (fullName: string | undefined) => {
        if (!fullName) return '';
        const names = fullName.split(' ');
        const initials = names.map(name => name[0]).join('').toUpperCase();
        return initials;
    };

    return (
        <Drawer
            id="sidebar"
            sx={{
                width: isPinned ? drawerWidth : (isHovered ? drawerWidth : miniDrawerWidth),
                flexShrink: 0,
                transition: 'width 0.3s ease',
                display: 'flex',
                flexDirection: 'column', // Ensures the layout is column-oriented
                '& .MuiDrawer-paper': {
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    width: isPinned ? drawerWidth : (isHovered ? drawerWidth : miniDrawerWidth),
                    transition: 'width 0.3s ease',
                    boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5rem', justifyContent: "space-around", whiteSpace: "nowrap" }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#000' }}>
                    {isPinned ? "Workboard" : (isHovered ? "Workboard" : <span style={{ paddingLeft: "0.75rem" }}>WEB</span>)}
                </Typography>
                <Box
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        alignItems: 'center',
                    }}
                >
                    <IconButton
                        onClick={handleTogglePin}
                        edge="start"
                        color="inherit"
                        aria-label="pin sidebar"
                        sx={{ borderRadius: '50%' }}
                    >
                        {!isPinned ? <PanoramaFishEyeIcon sx={{ color: '#000' }} /> : <RadioButtonCheckedIcon sx={{ color: '#000' }} />}
                    </IconButton>
                </Box>
            </Box>

            {/* This Box acts as the scrollable area */}
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                <List>
                    {menuItems.map((section) => (
                        <React.Fragment key={section.section}>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    paddingLeft: isPinned ? 2 : (isHovered ? 2 : 1),
                                    paddingTop: 1,
                                    paddingBottom: 1,
                                    color: '#6c757d',
                                    fontWeight: 'bold',
                                    display: isPinned ? 'block' : (isHovered ? 'block' : 'none'),
                                }}
                            >
                                {section.section}
                            </Typography>

                            {section.items.map((item) => (
                                <ListItemButton
                                    component={NavLink}
                                    to={hasPermission(item.tag) ? item.path : '#'}
                                    key={item.name}
                                    selected={location.pathname.startsWith(item.path)}
                                    disabled={!hasPermission(item.tag)}
                                    sx={{
                                        borderRadius: '8px',
                                        marginX: 1,
                                        paddingRight: 2,
                                        '&.Mui-selected': {
                                            backgroundColor: 'rgba(115, 103, 240, 0.15)',
                                            color: '#000',
                                            '& .MuiListItemIcon-root': {
                                                color: '#7367F0',
                                            },
                                        },
                                        '&:hover': {
                                            backgroundColor: hasPermission(item.tag) ? 'rgba(115, 103, 240, 0.08)' : 'inherit',
                                            transition: 'background-color 0.3s ease',
                                        },
                                        '&.Mui-disabled': {
                                            opacity: 0.5,
                                        },
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                                    <ListItemText
                                        primary={item.name}
                                        sx={{
                                            color: 'black',
                                            display: isPinned ? 'block' : (isHovered ? 'block' : 'none'),
                                            transition: 'display 0.3s ease',
                                        }}
                                    />
                                </ListItemButton>
                            ))}
                            <Divider sx={{ marginY: 1 }} />
                        </React.Fragment>
                    ))}
                </List>
            </Box>

            {/* Fixed user info at the bottom of the sidebar */}
            <div style={{ padding: '6px', backgroundColor: "#dfeaeb9e", borderRadius: "4px" }}>
                <Box sx={profileMenuStyle}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {/* You can replace with user image if available */}
                        {getInitials('Quac')}
                    </Avatar>
                    <Box sx={{ textAlign: 'left', ml: 1 }}>
                        <Typography variant="body1" sx={{ color: '#000', fontWeight: 'bold', transition: 'color 0.3s ease' }}>
                            {isPinned ? 'Quac' : isHovered ? 'Quac' : ''}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#6E6B7B', transition: 'color 0.3s ease' }}>
                            {isPinned ? 'Admin' : isHovered ? 'Admin' : ''}
                        </Typography>
                    </Box>
                </Box>
            </div>
        </Drawer>

    );
};

export default Sidebar;