import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { SidebarProvider } from '@/context';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
    return (
        <>
            <SidebarProvider>
                <Header />
                <Box sx={{ display: 'flex' }}>
                    <Sidebar />
                    <Box component={'main'} sx={{ flexGrow: 1 }}>
                        <Outlet />
                    </Box>
                </Box>
            </SidebarProvider>
        </>
    );
};

export default UserLayout;
