import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children }: { isAuthenticated: boolean; children: JSX.Element }) => {
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
