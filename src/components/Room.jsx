import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../firebase';
import { parseURLtoYoutubeID } from '../utils/helpers';

const Room = () => {
  const [roomObj, setRoomObj] = useState({});
  const [inputValue, setInputValue] = useState('');
  const url = useParams();
  const ref = database.ref(`/rooms/${url.id}`);

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
      .ref(`/rooms/${url.id}`)
      .once('value', (snap) => setRoomObj(snap.val()));
  }, [url.id]);

  function onPlayPause(player) {
    database.ref(`rooms/${url.id}/state`).on('value', (snap) => {
      const state = snap.val();
      if (state === 1) {
        player.pauseVideo();
      } else if (state === 0) {
        player.playVideo();
      }
    });
  }
  function onTimestampChange(player) {
    database.ref(`rooms/${url.id}/timestamp`).on('value', (snap) => {
      player.seekTo(snap.val());
    });
  }
  function onVideoChange(player) {
    database.ref(`rooms/${url.id}/videoId`).on('value', (snap) => {
      player.loadVideoById(snap.val());
    });
  }
  function onVideoCue() {
    const id = parseURLtoYoutubeID(inputValue);
    window.player.loadVideoById(id);
    ref.update({
      videoId: id,
    });
  }

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

  const onPlayerReady = (event) => {
    onPlayPause(event.target);
    onVideoChange(event.target);
    onTimestampChange(event.target);
  };

  return (
    <div>
      <h1>{roomObj.name}</h1>
      <div id="player"></div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={onVideoCue}>test</button>
    </div>
  );
};

export default Room;
