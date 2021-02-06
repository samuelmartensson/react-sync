import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { database } from '../firebase';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
`;

export default function CreateRoomInput() {
  const [inputValue, setInputValue] = useState('');

  const history = useHistory();
  function createAndRedirect() {
    const id = uuid();
    history.push(`/${id}`);

    const baseRoomParams = {
      state: 2,
      timestamp: 0,
    };

    database.ref(`/rooms/${id}`).set({ name: inputValue, ...baseRoomParams });
  }

  return (
    <Container>
      <span>Enter room name</span>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
      />
      {inputValue.trim().length > 2 && (
        <button onClick={createAndRedirect}>New Room</button>
      )}
      {/* <span>Room already exists with this name!</span> */}
    </Container>
  );
}
