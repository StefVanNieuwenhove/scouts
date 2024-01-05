import { useState, useTransition } from 'react';
import { Spinner } from '..';

const Tabs = ({
  links,
  components,
}: {
  links: { name: string; url: string }[];
  components: { name: string; component: JSX.Element }[];
}) => {
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(links[0].url);

  if (isPending) {
    return <Spinner />;
  }

  return (
    <>
      <nav className='w-full h-max bg-teal-700 text-white uppercase py-4 rounded-md'>
        <ul className='flex flex-col gap-2 sm:flex-row  items-center justify-around'>
          {links.map((link) => (
            <li
              key={link.name}
              className={`hover:cursor-pointer text-center overflow-clip  ${
                value === link.url ? 'border-b-2 border-white' : ''
              }`}
              onClick={() => {
                startTransition(() => setValue(link.url));
              }}>
              {link.name}
            </li>
          ))}
        </ul>
      </nav>
      <section className='w-full h-screen'>
        {components.map((component) => (
          <div
            key={component.name}
            className={`${
              value === component.name ? 'block' : 'hidden'
            } w-full h-full`}>
            {component.component}
          </div>
        ))}
      </section>
    </>
  );
};

export default Tabs;
