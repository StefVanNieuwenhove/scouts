import React from 'react';
import { Container } from '..';

const TableLoader = ({ cols, rows }: { cols: number; rows: number }) => {
  return (
    <>
      <Container className='mt-3 overflow-x-auto border rounded-lg'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-slate-600 '>
            <tr>
              {Array.from({ length: cols }, (_, index) => (
                <th
                  key={index}
                  scope='col'
                  className='px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  {/* You can replace this with a more sophisticated loading indicator */}
                  <div className='animate-pulse bg-gray-300 h-2 w-full'></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='bg-gray-100 divide-y divide-gray-200'>
            {Array.from({ length: rows }, (_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: cols }, (_, colIndex) => (
                  <td
                    key={colIndex}
                    className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {/* You can replace this with a more sophisticated loading indicator */}
                    <div className='animate-pulse bg-gray-300 h-2 w-full'></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </>
  );
};

export default TableLoader;
