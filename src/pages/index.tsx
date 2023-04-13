import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebaseApp, { db } from '@/firebase/config';
import ChatRoom from '../components/ChatRoom';
import Login from '../components/Login';
import Logout from '@/components/Logout';
import { getUser } from '@/firebase/collections/users';
import { useEffect } from 'react';
import { collection, query, where } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import UserSettings from '@/components/UserSettings';

const auth = getAuth(firebaseApp);

const App = () => {
  const [user] = useAuthState(auth as any);

  const usersCollection = collection(db, 'users');

  let usersQuery;

  if (user) {
    usersQuery = query(usersCollection, where('uid', '==', user?.uid));
  }

  const [registeredUser] = useCollectionData(usersQuery || usersCollection, {
    idField: 'id',
  } as any);

  console.log('registeredUser', registeredUser);

  const isUserRegistered = () => {
    return user && registeredUser && registeredUser[0];
  };

  //TODO: be able to update user settings

  return (
    <div className='App'>
      <header>
        <h1>⚛️🔥💬</h1>
        <Logout auth={auth} />
      </header>
      <section>
        {isUserRegistered() ? (
          <ChatRoom auth={auth} />
        ) : user ? (
          <UserSettings auth={auth} />
        ) : (
          <Login />
        )}
      </section>
    </div>
  );
};

export default App;
