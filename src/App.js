import React from 'react';
import { Route } from 'react-router-dom';
import CreateRoomInput from './components/CreateRoomInput';
import Room from './components/Room';

function App() {
  return (
    <>
      <Route path="/:id" render={(props) => <Room {...props} />} />
      <Route exact path="/">
        <CreateRoomInput />
      </Route>
    </>
  );
}

export default App;
