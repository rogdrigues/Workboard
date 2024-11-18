import GuestLayout from '@/router/layouts/guest-layout';
import Login from '@/pages/guest/login';
import { Navigate } from 'react-router-dom';

const guestRoutes = [
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/login" replace />,
            },
            {
                path: '/login',
                element: <Login />,
            },
        ],
    },
];

export default guestRoutes;
