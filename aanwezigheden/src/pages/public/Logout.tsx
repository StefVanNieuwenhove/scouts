import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  return (
    <>
      <main className='w-full h-screen flex flex-col items-center justify-center'>
        <h1 className='text-4xl'>You are succesfully logged out</h1>
        <button
          onClick={() => navigate('/login')}
          className='bg-lime-500 py-3 px-10 mt-5 rounded-md hover:pointer hover:underline'>
          Login in
        </button>
      </main>
    </>
  );
};

export default Logout;
