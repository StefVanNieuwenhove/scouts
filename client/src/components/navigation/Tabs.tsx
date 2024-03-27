import { memo, useCallback, useState } from 'react';

type TabsProps = {
  pages: {
    name: string;
    component: JSX.Element;
  }[];
  storageKey: string;
};

const Tabs = memo(({ pages, storageKey }: TabsProps) => {
  const [activePage, setActivePage] = useState(
    localStorage.getItem(storageKey) || ''
  );

  const handleClick = useCallback(
    (name: string) => {
      setActivePage(name);
      localStorage.setItem(storageKey, name);
    },
    [storageKey]
  );

  return (
    <>
      <nav className='w-full h-fit bg-teal-700 text-white flex items-center justify-around py-3 mb-2 rounded-md'>
        {pages.map((page) => (
          <button
            onClick={() => handleClick(page.name)}
            className={`hover:underline uppercase ${
              activePage === page.name && 'underline'
            }`}>
            {page.name}
          </button>
        ))}
      </nav>

      {pages.map((page) => (
        <section>{page.name === activePage && page.component}</section>
      ))}
    </>
  );
});

export default Tabs;
