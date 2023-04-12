import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebaseApp from '@/firebase/config';
import ChatRoom from '../components/ChatRoom';
import Login from '../components/Login';
import Logout from '@/components/Logout';

const auth = getAuth(firebaseApp);

const App = () => {
  const [user] = useAuthState(auth as any);

  return (
    <div className='App'>
      <header>
        <h1>⚛️🔥💬</h1>
        <Logout auth={auth} />
      </header>
      <section>{user ? <ChatRoom auth={auth} /> : <Login />}</section>
    </div>
  );
};

export default App;
