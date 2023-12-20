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
    return newDate.toLocaleDateString('nl-BE');
  };

  console.log(data);
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
      {data && (
        <div className='w-full mt-3 overflow-x-auto border rounded-lg'>
          <table className='table-auto w-full min-w-xs'>
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
                  <tr
                    key={camp.id}
                    className='text-center hover:bg-gray-400 xs:fixed'>
                    <td className='border px-4 py-2'>
                      {camp.name.replace('_', ' ')}
                    </td>
                    <td className='border px-4 py-2'>
                      {formatDate(camp.start_date)} -{' '}
                      {formatDate(camp.end_date)}
                    </td>
                    <td className='border px-4 py-2'>
                      {camp.total_days ? camp.total_days : 0}
                    </td>
                    <td className='border px-4 py-2'>{camp.cost_per_day}</td>
                    <td className='border px-4 py-2'>
                      {camp.cost_per_day *
                        (camp.total_days ? camp.total_days : 0)}
                    </td>
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
