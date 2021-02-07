import React, { useContext, useEffect, useState } from 'react';
import { database } from '../firebase';
import { RoomContext } from './Room';
import styled from 'styled-components';

export default function UserList() {
  const [userList, setUserList] = useState([]);
  const { id, userId } = useContext(RoomContext);

  const userLength = userList && Object.entries(userList).length;

  useEffect(() => {
    // Removes user from userlist when user disconnects from room
    let count = 0;
    database.ref(`/rooms/${id}/users`).on('value', (snap) => {
      setUserList(snap.val());
      count = snap.numChildren();

      if (snap.numChildren() > 1) {
        database.ref(`/rooms/${id}/users/${userId}`).onDisconnect().set({});
      } else {
        // If the user is the last person in the room delete the room instead
        database.ref(`/rooms/${id}`).onDisconnect().set({});
      }
    });

    // Cleanup if "host" changes, makes sure to reset so data is not stale
    return () => {
      if (count > 1) {
        database.ref(`/rooms/${id}`).onDisconnect().cancel();
      }
      database.ref(`/rooms/${id}/users`).off('value');
    };
  }, [id, userId, userLength]);

  return (
    <Container>
      <h2>Connected users</h2>
      <List>
        {userList &&
          Object.entries(userList).map((item) => {
            const { name } = item[1];
            return <UserCard key={item[0]}>{name}</UserCard>;
          })}
      </List>
    </Container>
  );
}

const Container = styled.div`
  padding: 0.75rem;
  h2 {
    margin: 0;
  }
`;
const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const UserCard = styled.div`
  display: grid;
  place-items: center;
  width: 100px;
  height: 120px;
  overflow: hidden;
  word-break: break-all;
  background: linear-gradient(45deg, #70aee9, #2082df);
  color: white;
  padding: 1rem;
  border-radius: 1rem;

  animation: slideIn 300ms;

  @keyframes slideIn {
    0% {
      opacity: 0;
      transform: translateX(-10px);
    }
  }
`;
