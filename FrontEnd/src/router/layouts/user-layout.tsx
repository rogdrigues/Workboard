import { resetFormat } from '@/styles';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
    return (
        <Box sx={resetFormat}>
            <Outlet />
        </Box>
    );
};

export default UserLayout;
