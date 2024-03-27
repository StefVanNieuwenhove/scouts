type TableRowProps = {
  children: React.ReactNode;
};

const TableRow = ({ children }: TableRowProps) => {
  return (
    <tr className='text-center even:bg-gray-200 odd:bg-white hover:bg-teal-600 border-b border-teal-700'>
      {children}
    </tr>
  );
};

export default TableRow;
