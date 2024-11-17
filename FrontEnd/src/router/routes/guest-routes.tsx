import GuestLayout from '@/router/layouts/guest-layout';
import Login from '@/pages/guest/login';

const guestRoutes = [
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />,
            },
        ],
    },
];

export default guestRoutes;
