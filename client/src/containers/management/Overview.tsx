import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../api/user';
import { Container, PasswordField, TableLoader } from '../../components';
import { User } from '../../types';

const Overview = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(true),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (error) {
    console.log(error);
  }
  return (
    <>
      {isLoading && <TableLoader cols={3} rows={5} />}
      {data && (
        <Container className='mt-3 overflow-x-auto border rounded-lg'>
          <table className='table-auto w-full min-w-xs'>
            <thead>
              <tr className='bg-slate-600 text-white'>
                <th className='border px-4 py-2'>Naam</th>
                <th className='border px-4 py-2'>Email</th>
                <th className='border px-4 py-2'>Role</th>
                <th className='border px-4 py-2'>Reset password</th>
              </tr>
            </thead>

            <tbody>
              {data.map((user: User) => (
                <tr key={user.id} className='text-center hover:bg-gray-400'>
                  <td className='border px-4 py-2'>{user.name}</td>
                  <td className='border px-4 py-2'>{user.email}</td>
                  <td className='border px-4 py-2'>{user.role}</td>
                  <td className='border px-4 py-2'>
                    <PasswordField value={user?.password as string} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      )}
    </>
  );
};

export default Overview;
