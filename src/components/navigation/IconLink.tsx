import { PropsWithChildren } from 'react';
import { Button, ButtonProps } from '../ui/button';
import Link from 'next/link';
import { Role } from '@prisma/client';
import { getUser, hasAccess } from '@/lib/auth';
import { Protect } from '@clerk/nextjs';

type IconLinkProps = PropsWithChildren & {
  href: string;
  variant?: ButtonProps['variant'];
  role?: Role[];
};

const IconLink = ({
  children,
  href,
  variant = 'default',
  role = ['ADMIN', 'GROEPSLEIDING'],
}: IconLinkProps) => {
  const hasAcces = async () => {
    const user = await getUser();
    const roles = user?.publicMetadata?.roles as Role[];
    console.log(roles.some((role) => roles.includes(role)));
    return roles.some((role) => roles.includes(role));
  };

  return (
    <>
      <Protect
        condition={() => hasAccess(role, [Role.ADMIN, Role.GROEPSLEIDING])}>
        <Button asChild size={'icon'} variant={variant} disabled={!hasAcces}>
          <Link href={href}>{children}</Link>
        </Button>
      </Protect>
    </>
  );
};

export default IconLink;
