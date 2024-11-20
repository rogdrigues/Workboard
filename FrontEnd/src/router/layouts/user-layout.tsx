import Sidebar from '@/components/Sidebar';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                <Box component={'main'} sx={{ flexGrow: 1 }}>
                    <Outlet />
                </Box>
            </Box>
        </>
    );
};

export default UserLayout;
