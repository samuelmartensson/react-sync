import React, { useContext, useEffect, useState } from 'react';
import { database } from '../firebase';
import { RoomContext } from './Room';

export default function UserList() {
  const [userList, setUserList] = useState([]);
  const { id, userId } = useContext(RoomContext);

  const userLength = userList && Object.entries(userList).length;

  useEffect(() => {
    let count = 0;
    database.ref(`/rooms/${id}/users`).on('value', (snap) => {
      setUserList(snap.val());
      count = snap.numChildren();

      if (snap.numChildren() > 1) {
        database.ref(`/rooms/${id}/users/${userId}`).onDisconnect().set({});
      } else {
        database.ref(`/rooms/${id}`).onDisconnect().set({});
      }
    });

    return () => {
      if (count > 1) {
        database.ref(`/rooms/${id}`).onDisconnect().cancel();
      }
      database.ref(`/rooms/${id}/users`).off('value');
    };
  }, [id, userId, userLength]);

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
