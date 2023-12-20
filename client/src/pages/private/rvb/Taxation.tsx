import { useState } from 'react';
import { links, components } from '../../../config/Taxation';

const Taxation = () => {
  const [value, setValue] = useState(links[0].url);
  return (
    <>
      <h1 className='text-center text-2xl underline uppercase'>
        Fiscale attesten
      </h1>
      <nav className='w-full h-max bg-teal-600 text-white uppercase py-3 rounded-md'>
        <ul className='flex items-center justify-around'>
          {links.map((link) => (
            <li
              key={link.name}
              className={`hover:cursor-pointer  ${
                value === link.url ? 'border-b-2 border-white' : ''
              }`}
              onClick={() => setValue(link.url)}>
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

export default Taxation;
