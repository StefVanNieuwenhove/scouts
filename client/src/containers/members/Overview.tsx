import { Member } from '../../types';
import { getMembers } from '../../api/members';
import { useQuery } from '@tanstack/react-query';
import { Container, TableLoader } from '../../components';
import { useCallback } from 'react';

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

  const calculateAge = useCallback((birthday: string) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }, []);

  const formatNationalNumber = useCallback((nationalNumber: string) => {
    const firstPart = nationalNumber.substring(0, 2);
    const secondPart = nationalNumber.substring(2, 4);
    const thirdPart = nationalNumber.substring(4, 6);
    const fourthPart = nationalNumber.substring(6, 9);
    const fifthPart = nationalNumber.substring(9, 11);

    return `${firstPart}.${secondPart}.${thirdPart}-${fourthPart}.${fifthPart}`;
  }, []);

  return (
    <>
      {isLoading && <TableLoader cols={3} rows={5} />}
      {data && (
        <Container className='mt-3 overflow-x-auto border rounded-lg'>
          <table className='table-auto border-collapse border-slate-600 w-full min-w-xs'>
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
                  <td className='border px-4 py-2'>
                    {calculateAge(member.date_of_birth)}
                  </td>
                  <td className='border px-4 py-2'>{member.group}</td>
                  <td className='border px-4 py-2'>{member.member_id}</td>
                  <td className='border px-4 py-2'>
                    {formatNationalNumber(member.national_number)}
                  </td>
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
