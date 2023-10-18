import { Navigate } from 'react-router-dom';

const RedirectRoute = ({ url, replace }: { url: string; replace: boolean }) => {
  return <Navigate to={`/${url}`} replace={replace} />;
};

export default RedirectRoute;
