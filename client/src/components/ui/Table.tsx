type TableProps = {
  headers: string[];
  body: React.ReactNode;
};

const Table = ({ headers, body }: TableProps) => {
  return (
    <table className='w-full h-fit overflow-scroll table-auto border border-teal-700 relative'>
      <thead>
        <tr>
          {headers.map((header) => (
            <th
              key={header}
              className='py-1 bg-teal-700 text-white uppercase sticky top-0'>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{body}</tbody>
    </table>
  );
};

export default Table;
