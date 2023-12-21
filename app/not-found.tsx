'use client';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();

  const onHomeClick = () => {
    router.push('/');
  };

  return (
    <main className='flex flex-grow items-center justify-center'>
      <div className='text-center'>
        <h1 className='mb-5 text-5xl font-extrabold uppercase'>
          Page not found
        </h1>
        <p className='mb-10 text-lg'>{`The page you are looking for doesn't exist.`}</p>

        <div className=''>
          <button
            className='items-center border-[3px] px-8 py-1 text-center text-lg font-bold hover:bg-black hover:text-white'
            onClick={onHomeClick}
          >
            Home
          </button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
