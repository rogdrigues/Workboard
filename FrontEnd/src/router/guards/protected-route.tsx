import { useAppSelector } from '@/hooks/redux-hooks';
import ErrorComponent from '@/components/ErrorComponent';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    if (!isAuthenticated) {
        return <ErrorComponent error="You are not authorized to access this page." />;
    }

    return children;
};

export default ProtectedRoute;
