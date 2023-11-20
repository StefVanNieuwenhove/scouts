import { User } from '../../types';

const SelectRoles = ({
  roles,
  user,
  updateRole,
}: {
  roles: string[];
  user: User;
  updateRole: (id: string, role: string) => Promise<void>;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const role = e.target.value;
    updateRole(user.id, role);
  };

  return (
    <select value={user.role} onChange={(e) => handleChange(e)}>
      {roles.map((role) => (
        <option key={role} value={role}>
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </option>
      ))}
    </select>
  );
};

export default SelectRoles;
