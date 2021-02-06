import React, { useEffect, useState } from 'react';
import { database } from '../firebase';
import Queue from './Queue';
import UserList from './UserList';

export default function Player({ id }) {
  const ref = database.ref(`/rooms/${id}`);
  const [roomObj, setRoomObj] = useState({});

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
    database
      .ref(`/rooms/${id}`)
      .once('value', (snap) => setRoomObj(snap.val()));
  }, [id]);

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
    <div>
      <h1>{roomObj.name}</h1>
      <div id="player"></div>
      <Queue />
      <UserList />
    </div>
  );
}
