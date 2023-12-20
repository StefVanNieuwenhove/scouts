import { useQuery } from '@tanstack/react-query';
import { getCamps } from '../../api/camp';
import { Camp } from '../../types';

const CampInfo = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['campInfo'],
    queryFn: () => getCamps(),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const formatDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };

  const calculateDays = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
      {data && (
        <div className='w-full h-full mt-3'>
          <table className='table-auto w-full'>
            <thead>
              <tr className='bg-slate-600 text-white '>
                <th className='border px-4 py-2'>Naam</th>
                <th className='border px-4 py-2'>Periode</th>
                <th className='border px-4 py-2'>Aantal dagen</th>
                <th className='border px-4 py-2'>Dagtarief</th>
                <th className='border px-4 py-2'>Totale bedrag</th>
              </tr>
            </thead>
            <tbody>
              {data.map((camp: Camp) => (
                <>
                  <tr className='text-center hover:bg-gray-400'>
                    <td className='border px-4 py-2'>
                      {camp.name.replace('_', ' ')}
                    </td>
                    <td className='border px-4 py-2'>
                      {formatDate(camp.start_date)} -{formatDate(camp.end_date)}
                    </td>
                    <td className='border px-4 py-2'>
                      {calculateDays(camp.start_date, camp.end_date)}
                    </td>
                    <td className='border px-4 py-2'>{camp.cost_per_day}</td>
                    <td className='border px-4 py-2'>{camp.price}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default CampInfo;
