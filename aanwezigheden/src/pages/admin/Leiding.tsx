import { useState } from 'react';
import { Roles, CreateLeiding } from '../../components';

const Leiding = () => {
  const [activeTab, setActiveTab] = useState('create');

  const renderTab = () => {
    switch (activeTab) {
      case 'create':
        return <CreateLeiding />;
      case 'role':
        return <Roles />;
      default:
        return <CreateLeiding />;
    }
  };
  return (
    <main className='w-full h-screen'>
      <nav className='w-full border-b border-lime-600'>
        <ul className='flex justify-evenly items-center'>
          <li
            className={`${
              activeTab === 'create'
                ? 'bg-slate-400 text-white underline'
                : 'bg-slate-200 '
            } cursor-pointer w-full p-2 text-center`}
            onClick={() => setActiveTab('create')}>
            Create leiding
          </li>
          <li
            className={`${
              activeTab === 'role'
                ? 'bg-slate-400 text-white underline'
                : 'bg-slate-200 '
            } cursor-pointer w-full p-2 text-center`}
            onClick={() => setActiveTab('role')}>
            Assign/update roles
          </li>
        </ul>
      </nav>
      <section className='w-full h-full'>{renderTab()}</section>
    </main>
  );
};

export default Leiding;
