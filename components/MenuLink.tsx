import Link from 'next/link';

const MenuLink = ({ blok }: any) => {
  return (
    <Link
      className='block border-b border-transparent py-1 text-base font-medium hover:border-black'
      href={blok.link.cached_url}
    >
      {blok.name}
    </Link>
  );
};
export default MenuLink;
