import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context';

const RoleBasedRoute = ({
  route,
  children,
}: {
  route: string;
  children: ReactNode;
}) => {
  const { hasPermission } = useAuth();

  if (!hasPermission(route)) return <Navigate to='/dashboard' replace />;

  return <>{children}</>;
};

export default RoleBasedRoute;
