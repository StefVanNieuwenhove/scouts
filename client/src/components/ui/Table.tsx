type TableProps = {
  headers: string[];
  body: React.ReactNode;
};

const Table = ({ headers, body }: TableProps) => {
  return (
    <div className='relative overflow-x-scroll'>
      <table className='w-full h-fit  table-auto border border-teal-700 relative'>
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className='p-1 bg-teal-700 text-white uppercase sticky top-0'>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{body}</tbody>
      </table>
    </div>
  );
};

export default Table;
