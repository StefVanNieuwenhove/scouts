import { memo } from 'react';
import { useAuth } from '../../context/auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Dashboard = memo(() => {
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    if (!isAdmin) navigate('/login');
  }

  return <div>Dashboard</div>;
});

export default Dashboard;
