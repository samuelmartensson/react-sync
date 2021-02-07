import React, { useState, createContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { database } from '../firebase';
import Player from './Player';

export const RoomContext = createContext();

const Room = () => {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState('');
  const [validate, setValidate] = useState(false);
  const url = useParams();
  let history = useHistory();

  useEffect(() => {
    // Redirect to homepage if room does not exist
    database.ref(`/rooms/${url.id}/name`).once('value', (snap) => {
      if (!snap.exists()) {
        history.push('/');
      }
    });
  }, [history, url.id]);

  function joinRoom() {
    if (name.trim().length > 2) {
      setValidate(true);
      const userRef = database.ref(`/rooms/${url.id}/users`).push({ name });
      setUserId(userRef.key);
    } else {
      setError('Name must be 3 or more characters');
    }
  }

  return (
    <>
      {!validate ? (
        <>
          <h2>Enter your name</h2>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <button onClick={joinRoom}>Join</button>
          <div>{error && error}</div>
        </>
      ) : (
        <RoomContext.Provider value={{ id: url.id, userId }}>
          <Player id={url.id} />
        </RoomContext.Provider>
      )}
    </>
  );
};

export default Room;
