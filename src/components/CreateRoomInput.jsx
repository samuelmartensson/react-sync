import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { database } from '../firebase';
import { GenericButton } from '../utils/genericStyles';

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  h1 {
    margin-bottom: 1rem;
  }
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  input {
    padding: 1rem;
    border-radius: 999px;
    border: none;
    width: 100%;
  }
  .placeholder {
    height: 2rem;
  }
`;
const NewRoomBtn = styled(GenericButton)`
  padding: 1rem 2rem;
  background: #77dd77;
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
      <div>
        <h1>Enter room name</h1>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
        />
        <div className="placeholder">
          {inputValue.trim().length > 2 && (
            <NewRoomBtn onClick={createAndRedirect}>Create room</NewRoomBtn>
          )}
        </div>
        {/* <span>Room already exists with this name!</span> */}
      </div>
    </Container>
  );
}
