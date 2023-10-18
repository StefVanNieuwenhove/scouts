import { useAuth } from '../../context/auth/AuthProvider';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }
  return <div>Dashboard</div>;
};

export default Dashboard;
