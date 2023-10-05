import Link from 'next/link';

const MenuLink = ({ blok }:any) => {
  return <Link className='block py-1 text-base border-transparent border-b text-dark font-semibold hover:border-black' href={blok.link.cached_url}>{blok.name}</Link>;
};
export default MenuLink;
