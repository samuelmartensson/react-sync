import React, { useState, createContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import fire, { database, signInWithGoogle } from '../firebase';
import Player from './Player';
import styled from 'styled-components';
import { GenericButton } from '../utils/genericStyles';

export const RoomContext = createContext();

const Room = () => {
  const [name, setName] = useState('');
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState('');
  const [validate, setValidate] = useState(false);
  const url = useParams();
  let history = useHistory();

  useEffect(() => {
    document.title = 'Synced - Joining room';
    // Redirect to homepage if room does not exist
    database.ref(`/rooms/${url.id}/name`).once('value', (snap) => {
      if (!snap.exists()) {
        history.push(`/`);
        document.title = 'Synced - Home';
      }
    });
  }, [history, url.id]);

  useEffect(() => {
    // Auth state
    const unsubscribe = fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function joinRoom() {
    if (name.trim().length > 2 || user) {
      setValidate(true);
      const userRef = database
        .ref(`/rooms/${url.id}/users`)
        .push({ name: user ? user.displayName : name });
      setUserId(userRef.key);
    } else {
      setError('Name must be 3 or more characters');
    }
  }
  function googleSignIn() {
    signInWithGoogle().catch((error) => {
      setError(error.message);
    });
  }
  function signOut() {
    fire.auth().signOut();
  }
  return (
    <Container>
      {!validate ? (
        <InnerWrapper>
          <InnerContainer>
            {!user ? (
              <>
                <GoogleSignInForm>
                  <h2>Use Google to sign in</h2>
                  <GoogleSignInButton onClick={googleSignIn}>
                    Sign in
                  </GoogleSignInButton>
                </GoogleSignInForm>
                <div className="or">or...</div>
                <NameSignInForm>
                  <h3>Identify with a name</h3>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div style={{ color: 'red' }}>{error && error}</div>
                </NameSignInForm>
              </>
            ) : (
              <LoggedInAs>
                <img src={user.photoURL} alt="profile" />
                <div>{user.displayName}</div>
                <SignOutButton onClick={signOut}>Sign out</SignOutButton>
              </LoggedInAs>
            )}

            <JoinRoomButton onClick={joinRoom}>Join</JoinRoomButton>
          </InnerContainer>
        </InnerWrapper>
      ) : (
        <RoomContext.Provider value={{ id: url.id, userId }}>
          <Player id={url.id} />
        </RoomContext.Provider>
      )}
    </Container>
  );
};

export default Room;

const Container = styled.div``;
const FlexCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  width: 100%;
`;
const InnerWrapper = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
`;
const GoogleSignInForm = styled(FlexCenter)``;
const NameSignInForm = styled(FlexCenter)`
  h3 {
    margin-bottom: 0.5rem;
  }
  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid lightgray;
    border-radius: 999px;
  }
`;

const GoogleSignInButton = styled(GenericButton)`
  background: #4285f4;
`;
const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 1rem;
  border-radius: 0.25rem;
  color: rgb(41, 38, 38);
  min-width: 300px;
  min-height: 300px;

  .or {
    margin-top: 1rem;
  }
`;
const JoinRoomButton = styled(GenericButton)`
  background: #77dd77;
  font-size: 16px;
  width: 100%;
  align-self: center;
`;
const LoggedInAs = styled(FlexCenter)``;
const SignOutButton = styled(GenericButton)`
  padding: 1rem 2rem;
  font-size: 16px;
  background: gray;
`;
