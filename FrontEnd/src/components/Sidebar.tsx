import React from 'react';
import { Drawer, List, ListItemIcon, ListItemText, Typography, Divider, ListItemButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { NavLink, useLocation } from 'react-router-dom';
import { useSidebar } from '@/context';
import { useAppSelector } from '@/hooks/redux-hooks';

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
                icon: <WorkIcon />,
                path: '/settings',
                tag: ['manage_settings'],
                description: 'Only Admins can manage system settings.',
            },
        ],
    },
    {
        section: 'Document',
        items: [
        ],
    },
];



const Sidebar = () => {
    const location = useLocation();
    const { isSidebarOpen } = useSidebar();
    //@ts-ignore
    const userPermissions = useAppSelector(state => state.auth?.user?.role?.permissions || []);

    const hasPermission = (tags: string[]) => {
        return tags.some(tag => userPermissions.includes(tag));
    };

    return (
        <Drawer
            sx={{
                width: isSidebarOpen ? drawerWidth : miniDrawerWidth,
                flexShrink: 0,
                transition: 'width 0.3s ease',
                '& .MuiDrawer-paper': {
                    transition: 'width 0.3s ease',
                    overflowY: 'auto',
                    width: isSidebarOpen ? drawerWidth : miniDrawerWidth,
                    boxSizing: 'border-box',
                    marginTop: '65px',
                    height: 'calc(100% - 65px)',
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <List>
                {menuItems.map((section) => (
                    <React.Fragment key={section.section}>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                paddingLeft: isSidebarOpen ? 2 : 0,
                                paddingTop: 1,
                                paddingBottom: 1,
                                color: '#6c757d',
                                fontWeight: 'bold',
                                display: isSidebarOpen ? 'block' : 'none',
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
                                        display: isSidebarOpen ? 'block' : 'none',
                                        transition: 'display 0.3s ease',
                                    }}
                                />
                            </ListItemButton>

                        ))}
                        <Divider sx={{ marginY: 1 }} />
                    </React.Fragment>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
