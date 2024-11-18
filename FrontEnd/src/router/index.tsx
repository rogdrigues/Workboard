import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import guestRoutes from '@/router/routes/guest-routes';
import userRoutes from '@/router/routes/user-routes';
import { GlobalStyles } from '@mui/material';

const isAuthenticated = false;

const router = createBrowserRouter(isAuthenticated ? [...userRoutes] : [...guestRoutes]);

const AppRouter = () => {
    return (
        <>
            <GlobalStyles
                styles={{
                    '*': { margin: 0, padding: 0, boxSizing: 'border-box' },
                    html: { height: '100%' },
                    body: { height: '100%', margin: 0, padding: 0, overflow: 'hidden' },
                }}
            />
            <RouterProvider router={router} />
        </>
    );
};

export default AppRouter;
