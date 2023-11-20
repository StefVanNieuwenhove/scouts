import React, { useState } from 'react';
import {
  AddAcivity,
  OverviewActivities,
  OverviewMembers,
} from '../../components';

const Kapoen = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTab = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewMembers group='kapoen' />;
      case 'activities':
        return <OverviewActivities group='kapoen' />;
      case 'add-activity':
        return <AddAcivity group='kapoen' />;
      default:
        return <OverviewMembers group='kapoen' />;
    }
  };

  return (
    <>
      <main className='w-full h-screen'>
        <nav className='w-full border-b border-lime-600'>
          <ul className='flex justify-evenly items-center'>
            <li
              className={`${
                activeTab === 'overview'
                  ? 'bg-slate-400 text-white underline'
                  : 'bg-slate-200 '
              } cursor-pointer w-full p-2 text-center`}
              onClick={() => setActiveTab('overview')}>
              Overzicht leden
            </li>
            <li
              className={`${
                activeTab === 'activities'
                  ? 'bg-slate-400 text-white underline'
                  : 'bg-slate-200 '
              } cursor-pointer w-full p-2 text-center`}
              onClick={() => setActiveTab('activities')}>
              Overzicht activiteiten
            </li>
            <li
              className={`${
                activeTab === 'add-activity'
                  ? 'bg-slate-400 text-white underline'
                  : 'bg-slate-200 '
              } cursor-pointer w-full p-2 text-center`}
              onClick={() => setActiveTab('add-activity')}>
              Activiteit toevoegen
            </li>
          </ul>
        </nav>
        <section className='w-full h-full'>{renderTab()}</section>
      </main>
    </>
  );
};

export default Kapoen;
