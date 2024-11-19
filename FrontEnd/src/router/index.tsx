import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useAppSelector } from '@/hooks/redux-hooks';
import guestRoutes from '@/router/routes/guest-routes';
import userRoutes from '@/router/routes/user-routes';
import { GlobalStyles } from '@mui/material';

const AppRouter = () => {
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    const router = useMemo(() => {
        return createBrowserRouter(isAuthenticated ? [...userRoutes] : [...guestRoutes], {
            future: {
                v7_relativeSplatPath: true,
                v7_fetcherPersist: true,
                v7_normalizeFormMethod: true,
                v7_partialHydration: true,
                v7_skipActionErrorRevalidation: true,
            },
        });
    }, [isAuthenticated]);

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
