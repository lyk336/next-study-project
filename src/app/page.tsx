import { FC } from 'react';
import { saveFile } from './_saveImage/saveImage';
import { addToDb } from '@/scripts/addUser';

interface IHomeProps {}

const Home: FC<IHomeProps> = () => {
  return (
    <main className='home'>
      Home page
      {/* <form action={saveFile} style={{ border: '1px solid #333', display: 'flex', flexDirection: 'column' }}>
        <label htmlFor='image'>Choose your image</label>
        <input id='image' name='image' type='file' />
        <button className='submit' type='submit'>
          Submit
        </button>
      </form> */}
      {/* <form action={addToDb} style={{ border: '1px solid #333', display: 'flex', flexDirection: 'column' }}>
        <label htmlFor='name'>add name</label>
        <input id='name' name='name' type='text' />
        <button className='submit' type='submit'>
          Submit
        </button>
      </form> */}
    </main>
  );
};

export default Home;
