import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Leiding } from '@prisma/client';
import { Mail, PawPrint, Phone, PhoneCall, Users } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';

type LeidingCardProps = {
  leiding: Leiding;
};

const LeidingCard = ({ leiding }: LeidingCardProps) => {
  return (
    <>
      <Card>
        <CardHeader className='flex items-center gap-2'>
          {/* img of the leiding */}
          <Image
            src={'/img/default-profile.jpg'}
            alt='default'
            width={150}
            height={150}
          />
          <CardTitle>{leiding.name}</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className='py-2'>
          <p className='flex items-center gap-2'>
            <span>
              <Mail className='h-4 w-4' />
            </span>{' '}
            {leiding.email}
          </p>
          <p className='flex items-center gap-2'>
            <span>
              <Phone className='h-4 w-4' />
            </span>{' '}
            {leiding.phone}
          </p>
          <p className='flex items-center gap-2'>
            <span>
              <Users className='h-4 w-4' />
            </span>{' '}
            {leiding.tak.toLowerCase()}
          </p>
          <p className='flex items-center gap-2'>
            <span>
              <PawPrint className='h-4 w-4' />
            </span>{' '}
            {leiding.totem}
          </p>
        </CardContent>
        <Separator />
        <CardFooter className='flex justify-end gap-2 py-2'>
          <Button variant={'outline'} size={'icon'}>
            <a href={`tel:${leiding.phone}`}>
              <PhoneCall className='h-4 w-4' />
            </a>
          </Button>
          <Button variant={'outline'} size={'icon'}>
            <a href={`mailto:${leiding.email}`}>
              <Mail className='h-4 w-4' />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default LeidingCard;
