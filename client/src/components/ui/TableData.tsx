type TableDataProps = {
  children: React.ReactNode;
};

const TableData = ({ children }: TableDataProps) => {
  return <td className='py-1'>{children}</td>;
};

export default TableData;
