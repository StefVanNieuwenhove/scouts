type MainProps = {
  children: React.ReactNode;
};

const Main = ({ children }: MainProps) => {
  return <main className='ml-20 mr-5'>{children}</main>;
};

export default Main;
