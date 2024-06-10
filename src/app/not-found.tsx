import { FC } from 'react';

interface IAppProps {}

const App: FC<IAppProps> = () => {
  return (
    <div className='not-found__container'>
      <div className='not-found'>
        <h1 className='not-found__title'>404</h1>
      </div>
    </div>
  );
};

export default App;
