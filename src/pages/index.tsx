import React from 'react';

import { useState, useRef } from 'react';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { signInWithGoogle, signOutFromGoogle } from '@/firebase/auth/login';
import firebaseApp from '@/firebase/config';
import { getAuth } from 'firebase/auth';

const auth = getAuth(firebaseApp);
// const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth as any);

  return (
    <div className='App'>
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
      <section>{<SignIn />}</section>
    </div>
  );
}

function SignIn() {
  const signIn = async () => {
    await signInWithGoogle();
  };

  return (
    <>
      <button className='sign-in' onClick={signIn}>
        Sign in with Google
      </button>
      <p>
        Do not violate the community guidelines or you will be banned for life!
      </p>
    </>
  );
}

function SignOut() {
  const signOut = async () => {
    await signOutFromGoogle();
  };

  return (
    auth.currentUser && (
      <button className='sign-out' onClick={() => signOut()}>
        Sign Out
      </button>
    )
  );
}

function ChatRoom() {
  // const messagesRef = firestore.collection('messages');
  // const query = messagesRef.orderBy('createdAt').limit(25);

  // const [messages] = useCollectionData(query as any, { idField: 'id' } as any);

  // const [formValue, setFormValue] = useState('');

  // const dummy = useRef<HTMLDivElement>(null);

  // const sendMessage = async (e: any) => {
  //   e.preventDefault();

  //   const { uid, photoURL } = auth.currentUser as any;

  //   await messagesRef.add({
  //     text: formValue,
  //     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  //     uid,
  //     photoURL,
  //   });

  //   setFormValue('');
  //   dummy.current?.scrollIntoView({ behavior: 'smooth' });
  // };

  return (
    <>
      Getting there
      {/* <div>
        {messages &&
          messages.map((msg: any) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        <div ref={dummy}></div>
      </div>
      <form onSubmit={sendMessage}>
        <input
          type='text'
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type='submit'>Send</button>
      </form> */}
    </>
  );
}

// function ChatMessage(props: any) {
//   const { text, uid, photoURL } = props.message;

//   const messageClass = uid === auth.currentUser?.uid ? 'sent' : 'received';

//   return (
//     <div className={`message ${messageClass}`}>
//       <img src={photoURL} alt={`user-${uid}`}></img>
//       <p>{text}</p>
//     </div>
//   );
// }

export default App;
