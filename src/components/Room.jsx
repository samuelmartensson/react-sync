import React, { useState, createContext } from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../firebase';
import Player from './Player';

export const RoomContext = createContext();

const Room = () => {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState('');
  const [validate, setValidate] = useState(false);
  const url = useParams();

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
    <div>
      {!validate ? (
        <>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <button onClick={joinRoom}>Join</button>
          <div>{error && error}</div>
        </>
      ) : (
        <RoomContext.Provider value={{ id: url.id, name, userId }}>
          <Player name={name} id={url.id} />
        </RoomContext.Provider>
      )}
    </div>
  );
};

export default Room;
