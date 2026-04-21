import './App.css';
import Button from './components/Button';
import UserProfile from './components/UserProfile';
import type { UserProfileProps } from './components/UserProfile';

const user = {
  username: 'Guybrush',
  img: 'https://tse1.mm.bing.net/th/id/OIP.RsW3Z2PMxGQwMa2LZzvOngHaFZ?cb=12&pid=Api',
  info: 'Info Text',
  status: true,
};

function App() {
  function clickHandler() {
    console.log('clicked');
  }

  return (
    <>
      <UserProfile
        username={user.username}
        img={user.img}
        status={user.status}
      />
      <Button
        type="button"
        onClick={() => {
          console.log('Hallo Henrique');
        }}
        className="bg-emerald-600 text-lg"
      >
        Click me <span>👍</span>
      </Button>
      <Button
        username={user.username}
        onClick={() => {
          console.log('Hallo Sascha');
        }}
        type="button"
        style={{
          backgroundColor: 'green',
          width: 70,
        }}
      >
        Click me <span>👍</span>
      </Button>
    </>
  );
}

export default App;
