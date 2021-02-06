import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { database } from '../firebase';
import { getTitle, parseURLtoYoutubeID } from '../utils/helpers';
import { RoomContext } from './Room';
const Container = styled.div`
  width: 300px;
`;

const Item = styled.div`
  background: #532929;
  margin-bottom: 1rem;
  color: white;
  span {
    display: block;
    padding: 1rem;
  }
  img {
    width: 100%;
  }
`;

export default function Queue() {
  const [videoIdList, setVideoIdList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const { id } = useContext(RoomContext);

  function playNextVideo() {
    const [queueKey, nextVideo] = Object.entries(videoIdList)[0];
    const { videoId } = nextVideo;
    window.player.loadVideoById(videoId);

    database.ref(`/rooms/${id}`).update({
      videoId,
    });
    database.ref(`/rooms/${id}/queue/${queueKey}`).remove();
  }

  function addToQueue() {
    setError('');
    const videoId = parseURLtoYoutubeID(inputValue);
    if (videoId !== false) {
      getTitle(videoId).then((res) => {
        database.ref(`/rooms/${id}/queue`).push({
          title: res.items[0].snippet.title,
          videoId,
          thumbnail: `https://img.youtube.com/vi/${videoId}/0.jpg`,
        });
      });
      setInputValue('');
    } else {
      setError('Invalid URL');
    }
  }

  useEffect(() => {
    database.ref(`/rooms/${id}/queue`).on('value', (snap) => {
      setVideoIdList(snap.val());
    });
  }, [id]);

  return (
    <Container>
      <div>{error && error}</div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={addToQueue}>Add to queue</button>
      <button onClick={playNextVideo}>Next</button>
      {videoIdList &&
        Object.entries(videoIdList).map((item, i) => {
          const { title, videoId, thumbnail } = item[1];
          return (
            <Item key={videoId + i}>
              <span>{title}</span>
              <img src={thumbnail} alt="thumbnail" />
            </Item>
          );
        })}
    </Container>
  );
}
