import UserLayout from '@/router/layouts/user-layout';
import ProtectedRoute from '@/router/guards/protected-route';
import { Navigate } from 'react-router-dom';
import ErrorComponent from '@/components/ErrorComponent';
import Dashboard from '@/pages/user/dashboard';

const userRoutes = [
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <UserLayout />
            </ProtectedRoute>
        ),
        errorElement: <ErrorComponent error="Page not found" />,
        children: [
            {
                path: '/',
                element: <Navigate to="/dashboard" replace />,
            },
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
        ],
    },
];

export default userRoutes;