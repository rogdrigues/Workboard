import UserLayout from '@/router/layouts/user-layout';
import ProtectedRoute from '@/router/guards/protected-route';
import { Navigate } from 'react-router-dom';

const isAuthenticated = true; //Will replaced with redux store

const userRoutes = [
    {
        path: '/',
        element: (
            <ProtectedRoute isAuthenticated={isAuthenticated}>
                <UserLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: '/',
                element: <Navigate to="/dashboard" replace />,
            },
            {
                path: '/dashboard',
                element: <div>Dashboard</div>
            },
        ],
    },
];

export default userRoutes;