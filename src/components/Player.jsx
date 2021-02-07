import React, { useEffect, useState } from 'react';
import { database } from '../firebase';
import Queue from './Queue';
import UserList from './UserList';
import styled from 'styled-components';

const Iframe = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9, for an aspect ratio of 1:1 change to this value to 100% */
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
const MainContainer = styled.div``;
const Wrapper = styled.div`
  width: 100%;
  @media (min-width: 1200px) {
    width: 80%;
  }
`;
const Flexbox = styled.div`
  padding-bottom: 1rem;
  @media (min-width: 1200px) {
    display: flex;
  }
`;
export default function Player({ id }) {
  const ref = database.ref(`/rooms/${id}`);
  const [roomName, setRoomName] = useState('');

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';

      window.onYouTubeIframeAPIReady = loadVideo;

      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      loadVideo();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    ref.once('value', (snap) => setRoomName(snap.val().name));
  }, [ref]);

  const loadVideo = () => {
    window.player = new window.YT.Player(`player`, {
      // Get video ID from database
      videoId: 'xfdue4jdow0',
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  };

  function onPlayerStateChange(event) {
    if (event.data === window.YT.PlayerState.PAUSED) {
      ref.update({
        state: 1,
        timestamp: event.target.getCurrentTime(),
      });
    }
    if (event.data === window.YT.PlayerState.PLAYING) {
      ref.update({
        state: 0,
      });
    }
    if (event.data === window.YT.PlayerState.BUFFERING) {
      ref.update({
        timestamp: event.target.getCurrentTime(),
      });
    }
  }

  function onPlayPause(player) {
    database.ref(`rooms/${id}/state`).on('value', (snap) => {
      const state = snap.val();
      if (state === 1) {
        player.pauseVideo();
      } else if (state === 0) {
        player.playVideo();
      }
    });
  }
  function onTimestampChange(player) {
    database.ref(`rooms/${id}/timestamp`).on('value', (snap) => {
      player.seekTo(snap.val());
    });
  }
  function onVideoChange(player) {
    database.ref(`rooms/${id}/videoId`).on('value', (snap) => {
      player.loadVideoById(snap.val());
    });
  }

  const onPlayerReady = (event) => {
    onPlayPause(event.target);
    onVideoChange(event.target);
    onTimestampChange(event.target);
  };

  return (
    <MainContainer>
      {/* <h1>{roomName}</h1> */}
      <Flexbox>
        <Wrapper>
          <Iframe>
            <div id="player"></div>
          </Iframe>
        </Wrapper>
        <Queue />
      </Flexbox>
      <UserList />
    </MainContainer>
  );
}
