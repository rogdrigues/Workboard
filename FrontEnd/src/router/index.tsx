import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import guestRoutes from '@/router/routes/guest-routes';
import userRoutes from '@/router/routes/user-routes';
import { GlobalStyles } from '@mui/material';

const isAuthenticated = false;

const router = createBrowserRouter(isAuthenticated ? [...userRoutes] : [...guestRoutes], {
    future: {
        //@ts-ignore
        v7_startTransition: true,
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true
    },
});


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
