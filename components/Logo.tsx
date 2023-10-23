// components/Logo.tsx

import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  blok?: any;
  logo_text?: string;
}

const Logo: React.FC<LogoProps> = ({ blok, logo_text }) => {
  console.log(blok, 'asd');
  return (
    <Link href='/' className='text-xl font-bold uppercase'>
      <span className='sr-only'>{logo_text}</span>
      {blok?.filename ? (
        <Image src={blok.filename} alt={blok.alt} width={89} height={25} />
      ) : (
        <>{logo_text}</>
      )}
    </Link>
  );
};

export default Logo;
