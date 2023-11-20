import { useEffect, useMemo, useState } from 'react';
import { User } from '../../../types';
import { getUsers, updateRole } from '../../../api/user';
import { SelectRoles } from '../../inputs';

const Roles = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await getUsers()
        .then((data) => setUsers(data))
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);

  const roles = useMemo(() => {
    return [
      'kapoen',
      'wouter',
      'jonggiver',
      'giver',
      'jin',
      'groepsleiding',
      'admin',
    ];
  }, []);

  const handleChange = async (id: string, role: string) => {
    await updateRole(id, role).then(() => {
      const updatedUsers = users.map((user) => {
        if (user.id === id) {
          user.role = role;
        }
        return user;
      });
      setUsers(updatedUsers);
    });
  };

  return (
    <>
      <main className='w-full h-screen'>
        <section className='w-full h-full'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-lime-600'>
                <th className='p-2'>Name</th>
                <th className='p-2'>Email</th>
                <th className='p-2'>Role</th>
              </tr>
            </thead>
            <tbody>
              {users
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((user) => (
                  <tr key={user.id} className='border-b border-lime-600'>
                    <td className='p-2 text-center'>{user.name}</td>
                    <td className='p-2 text-center'>{user.email}</td>
                    <td className='p-2 text-center'>
                      <SelectRoles
                        user={user}
                        roles={roles}
                        updateRole={handleChange}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
};

export default Roles;
