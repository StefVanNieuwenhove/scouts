import { Member } from '../../types';
import { getMembers } from '../../api/members';
import { useQuery } from '@tanstack/react-query';
import { Container, TableLoader } from '../../components';

const Overview = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['members'],
    queryFn: () => getMembers(),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (error) {
    console.log(error);
  }

  const calculateAge = (birthday: string) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  return (
    <>
      {isLoading && <TableLoader cols={3} rows={5} />}
      {data && (
        <Container className='mt-3 overflow-x-auto border rounded-lg'>
          <table className='table-auto w-full min-w-xs'>
            <thead>
              <tr className='bg-slate-600 text-white'>
                <th className='border px-4 py-2'>Naam</th>
                <th className='border px-4 py-2'>Leeftijd</th>
                <th className='border px-4 py-2'>Tak</th>
                <th className='border px-4 py-2'>Lidnummer</th>
                <th className='border px-4 py-2'>Rijksregisternummer</th>
              </tr>
            </thead>

            <tbody>
              {data?.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className='border px-4 py-2 text-center uppercase underline font-bold'>
                    Geen Leden gevonden
                  </td>
                </tr>
              )}
              {data.map((member: Member) => (
                <tr key={member.id} className='text-center hover:bg-gray-400'>
                  <td className='border px-4 py-2'>
                    {member.firstname} {member.lastname}
                  </td>
                  <td className='border px-4 flex flex-col'>
                    <span>{calculateAge(member.date_of_birth)}</span>
                    <span className='text-xs'>
                      {new Date(member.date_of_birth).toLocaleDateString(
                        'nl-BE'
                      )}
                    </span>
                  </td>
                  <td className='border px-4 py-2'>{member.group}</td>
                  <td className='border px-4 py-2'>{member.member_id}</td>
                  <td className='border px-4 py-2'>{member.national_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      )}
    </>
  );
};

export default Overview;
