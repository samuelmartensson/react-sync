import React, { useContext, useEffect, useState } from 'react';
import { database } from '../firebase';
import { RoomContext } from './Room';

export default function UserList() {
  const [userList, setUserList] = useState([]);
  const { id, name, userId } = useContext(RoomContext);

  useEffect(() => {
    database.ref(`/rooms/${id}/users`).on('value', (snap) => {
      setUserList(snap.val());
    });
    database.ref(`/rooms/${id}/users/${userId}`).onDisconnect().remove();
  }, [id, userId]);

  return (
    <div>
      {userList &&
        Object.entries(userList).map((item) => {
          const { name } = item[1];
          return <div key={item[0]}>{name}</div>;
        })}
    </div>
  );
}
