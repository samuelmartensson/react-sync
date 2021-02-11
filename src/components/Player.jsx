import React, { useEffect, useRef, useState } from 'react';
import { database } from '../firebase';
import Queue from './Queue';
import UserList from './UserList';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

export default function Player({ id }) {
  const ref = database.ref(`/rooms/${id}`);
  const [roomName, setRoomName] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [indicatorTime, setIndicatorTime] = useState('');
  const [playerState, setPlayerState] = useState(1);
  const [isControlsHovered, setIsControlsHovered] = useState('fade');
  const toolTipRef = useRef();
  const indicatorRef = useRef();
  const controlsRef = useRef();

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
    ref.once('value', (snap) => {
      const name = snap.val().name;
      document.title = `Synced - ${name}`;

      setRoomName(name);
    });
  }, [ref]);

  useEffect(() => {
    setInterval(() => {
      try {
        const video = document.querySelector('#player');
        let time =
          (window.player.getCurrentTime() / window.player.getDuration()) *
          video.clientWidth;
        let hhmmss = new Date(window.player.getCurrentTime() * 1000)
          .toISOString()
          .substr(14, 5);
        if (!isNaN(time)) {
          setCurrentTime(hhmmss);
          indicatorRef.current.style = `width: ${time}px; top: 50%;`;
        }
      } catch (err) {
        console.log('Video loading...');
      }
    }, 1000);
  }, []);

  function loadVideo() {
    window.player = new window.YT.Player(`player`, {
      // Get video ID from database
      videoId: 'Jzfpyo-q-RM',
      playerVars: {
        controls: 0,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  }

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
  }

  function onPlayPause(player) {
    database.ref(`rooms/${id}/state`).on('value', (snap) => {
      const state = snap.val();
      if (state === 1) {
        player.pauseVideo();
        setPlayerState(1);
      } else if (state === 0) {
        player.playVideo();
        setPlayerState(0);
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
  function getVideoDuration() {
    try {
      let total = window.player.getDuration();
      return `${new Date(total * 1000).toISOString().substr(14, 5)}`;
    } catch {
      console.log('Video not played yet');
    }
  }
  function pxlToSecs(pxl) {
    const video = document.querySelector('#player');

    let videoInSecs = window.player.getDuration();
    let percentOfVideo = pxl / (video.clientWidth * 0.97); // Must be same percentage as progress-bar css-width

    return videoInSecs * percentOfVideo;
  }
  function moveToolTipPosition(e) {
    if (window.player.getDuration) {
      let rect = e.target.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let time = pxlToSecs(x);
      let hhmmss = new Date(time * 1000).toISOString().substr(14, 5);
      if (!isNaN(time)) {
        setIndicatorTime(hhmmss);
        toolTipRef.current.style = `left: ${x}px; display: block;`;
      }
    }
  }

  function playPause() {
    ref.update({
      state: playerState === 1 ? 0 : 1,
    });
  }
  function seek(e) {
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;

    indicatorRef.current.style.width = x + 'px';

    let time = pxlToSecs(x);
    window.player.seekTo(time);
    ref.update({
      timestamp: time,
    });
  }

  useEffect(() => {
    if (isControlsHovered === 'fade') {
      const delay = setTimeout(() => {
        setIsControlsHovered(false);
      }, 3000);

      return () => {
        clearTimeout(delay);
      };
    }
  }, [isControlsHovered]);
  return (
    <MainContainer>
      {/* <h1>{roomName}</h1> */}
      <Flexbox>
        <Wrapper>
          <Iframe
            onClick={playPause}
            onMouseMove={() => setIsControlsHovered('fade')}
          >
            <div id="player"></div>
            <Controls
              onClick={(e) => e.stopPropagation()}
              style={{ opacity: isControlsHovered ? '1' : '0' }}
              ref={controlsRef}
            >
              <ControlsInnerWrap>
                <PlayPauseButton onClick={playPause}>
                  {playerState ? (
                    <FontAwesomeIcon icon={faPlay} />
                  ) : (
                    <FontAwesomeIcon icon={faPause} />
                  )}
                </PlayPauseButton>
                {getVideoDuration() && (
                  <div className="progress-time">{`${currentTime} / ${getVideoDuration()}`}</div>
                )}
                <div
                  onClick={seek}
                  onMouseMove={moveToolTipPosition}
                  onMouseLeave={() =>
                    (toolTipRef.current.style = 'display: none;')
                  }
                  className="progress-bar"
                >
                  <div className="progress-bar-visual">
                    <div
                      ref={indicatorRef}
                      className="progress-indicator"
                    ></div>
                    <TimeToolTip ref={toolTipRef}>{indicatorTime}</TimeToolTip>
                  </div>
                </div>
              </ControlsInnerWrap>
            </Controls>
          </Iframe>
        </Wrapper>
        <Queue />
      </Flexbox>
      <UserList />
    </MainContainer>
  );
}

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
const Controls = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 40px;
  width: 100%;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  opacity: 0;
  transition-duration: 200ms;
`;

const ControlsInnerWrap = styled.div`
  width: 97%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;

  .progress-bar {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 16px;
    margin-top: -16px;
    cursor: pointer;

    &:hover .progress-bar-visual {
      height: 14px;
      margin-top: -14px;
    }

    .progress-bar-visual {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 5px;
      background: #b3a3a3bb;
      transition-duration: 120ms;
    }
  }
  .progress-indicator {
    height: 100%;
    top: 50%;
    transform: translate(0%, -50%);
    position: absolute;
    background: rgb(255, 0, 0);
    transition-duration: 200ms;
    pointer-events: none;
  }
  .progress-time {
    margin-left: 1rem;
  }
`;

const PlayPauseButton = styled.button`
  width: 70px;
  height: 100%;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  svg {
    color: white;
    width: 1.25rem !important;
    height: 1.25rem !important;
  }
`;
const Iframe = styled.div`
  position: relative;
  z-index: 9999;
  padding-bottom: 56.25%; /* 16:9, for an aspect ratio of 1:1 change to this value to 100% */
  box-shadow: 5px 5px 8px #0a0a0a;
  iframe {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
const TimeToolTip = styled.div`
  position: absolute;
  top: -33px;
  color: white;
  pointer-events: none;
  background: rgb(22, 21, 21);
  border-radius: 6px;
  padding: 4px;
  transform: translateX(-50%);
  display: none;
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -5px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid rgb(22, 21, 21);
  }
`;
